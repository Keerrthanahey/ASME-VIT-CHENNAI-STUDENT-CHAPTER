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
  member: Member | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_MEMBER: Member = {
  id: "demo-1",
  uid: "demo-uid",
  name: "Demo Member",
  email: "demo@vitstudent.ac.in",
  rollNumber: "21ME0123",
  department: "Mechanical Engineering",
  year: 3,
  role: "member",
  joinedAt: "2024-08-01",
  volunteerHours: 24,
  attendance: 85,
  achievements: ["Workshop Certificate", "Event Volunteer"],
  registeredEvents: ["1", "2"],
  bookmarks: ["p1"],
  certificates: [
    {
      id: "cert-1",
      name: "SolidWorks Certification",
      url: "/certificates/solidworks.pdf",
      issuedAt: "2025-09-20",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*                              Allowed Domains                               */
/* -------------------------------------------------------------------------- */

const ALLOWED_DOMAINS = ["vitstudent.ac.in", "vit.ac.in"];

function isAllowedEmail(email?: string | null): boolean {
  if (!email) return false;

  const normalizedEmail = email.trim().toLowerCase();

  return ALLOWED_DOMAINS.some((domain) =>
    normalizedEmail.endsWith(`@${domain}`)
  );
}

function validateVitEmail(email?: string | null) {
  if (!isAllowedEmail(email)) {
    throw new Error(
      "Only VIT email addresses (@vitstudent.ac.in or @vit.ac.in) are allowed."
    );
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        if (!isAllowedEmail(firebaseUser.email)) {
          await firebaseSignOut(auth);

          setUser(null);
          setMember(null);
          setLoading(false);
          return;
        }

        setUser(firebaseUser);

        setMember({
          ...DEMO_MEMBER,
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || DEMO_MEMBER.name,
          email: firebaseUser.email || DEMO_MEMBER.email,
          photo: firebaseUser.photoURL || undefined,
        });
      } else {
        setUser(null);
        setMember(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                              Google Sign In                               */
  /* -------------------------------------------------------------------------- */

  const signInWithGoogle = async () => {
    if (!auth) {
      setMember(DEMO_MEMBER);
      return;
    }

    const result = await signInWithPopup(auth, googleProvider);

    validateVitEmail(result.user.email);

    if (!isAllowedEmail(result.user.email)) {
      await firebaseSignOut(auth);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Email Sign In                               */
  /* -------------------------------------------------------------------------- */

  const signInWithEmail = async (
    email: string,
    password: string
  ) => {
    if (!auth) {
      setMember({ ...DEMO_MEMBER, email });
      return;
    }

    validateVitEmail(email);

    await signInWithEmailAndPassword(auth, email, password);
  };

  /* -------------------------------------------------------------------------- */
  /*                               Email Sign Up                               */
  /* -------------------------------------------------------------------------- */

  const signUpWithEmail = async (
    email: string,
    password: string
  ) => {
    if (!auth) {
      setMember({ ...DEMO_MEMBER, email });
      return;
    }

    validateVitEmail(email);

    await createUserWithEmailAndPassword(auth, email, password);
  };

  /* -------------------------------------------------------------------------- */
  /*                                  Sign Out                                 */
  /* -------------------------------------------------------------------------- */

  const signOut = async () => {
    if (!auth) {
      setMember(null);
      return;
    }

    await firebaseSignOut(auth);
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
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}