"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";

import { auth, googleProvider } from "@/firebase/config";
import type { Member } from "@/types";

interface AuthContextType {
  user: User | null;
  member: Member |null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* -------------------------------------------------------------------------- */
/*                          Allowed Email Domains                             */
/* -------------------------------------------------------------------------- */

const ALLOWED_DOMAINS = [
  "vitstudent.ac.in",
  "vit.ac.in",
];

function isAllowedEmail(email?: string | null) {
  if (!email) return false;

  const normalized = email.trim().toLowerCase();

  return ALLOWED_DOMAINS.some((domain) =>
    normalized.endsWith(`@${domain}`)
  );
}

function validateVitEmail(email?: string | null) {
  if (!isAllowedEmail(email)) {
    throw new Error(
      "Only VIT email addresses (@vitstudent.ac.in or @vit.ac.in) are allowed."
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                            Backend Profile API                             */
/* -------------------------------------------------------------------------- */

async function fetchMemberProfile(firebaseUser: User): Promise<Member | null> {
  try {
    const token = await firebaseUser.getIdToken();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch member profile:", error);
    return null;
  }
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (!firebaseUser) {
        setUser(null);
        setMember(null);
        setLoading(false);
        return;
      }

      if (!isAllowedEmail(firebaseUser.email)) {
        await firebaseSignOut(auth);

        setUser(null);
        setMember(null);
        setLoading(false);

        alert(
          "Only VIT email addresses are allowed to access this application."
        );

        return;
      }

      setUser(firebaseUser);

      const profile = await fetchMemberProfile(firebaseUser);

      if (profile) {
        setMember(profile);
      } else {
        /*
         * Temporary fallback until backend profile endpoint is completed.
         */

        setMember({
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          name: firebaseUser.displayName ?? "",
          email: firebaseUser.email ?? "",
          photo: firebaseUser.photoURL ?? undefined,

          rollNumber: "",
          department: "",
          year: 0,
          role: "member",

          joinedAt: "",
          volunteerHours: 0,
          attendance: 0,

          achievements: [],
          registeredEvents: [],
          bookmarks: [],
          certificates: [],
        });
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                           Google Authentication                            */
  /* -------------------------------------------------------------------------- */

  const signInWithGoogle = async () => {
    if (!auth) return;

    const result = await signInWithPopup(auth, googleProvider);

    validateVitEmail(result.user.email);

    if (!isAllowedEmail(result.user.email)) {
      await firebaseSignOut(auth);

      throw new Error(
        "Only VIT email addresses are allowed."
      );
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                              Email Sign In                                 */
  /* -------------------------------------------------------------------------- */

  const signInWithEmail = async (
    email: string,
    password: string
  ) => {
    if (!auth) return;

    validateVitEmail(email);

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                              Email Sign Up                                 */
  /* -------------------------------------------------------------------------- */

  const signUpWithEmail = async (
    email: string,
    password: string
  ) => {
    if (!auth) return;

    validateVitEmail(email);

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                                  Sign Out                                  */
  /* -------------------------------------------------------------------------- */

  const signOut = async () => {
    if (!auth) return;

    await firebaseSignOut(auth);

    setUser(null);
    setMember(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        member,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}