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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setMember({
          ...DEMO_MEMBER,
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || DEMO_MEMBER.name,
          email: firebaseUser.email || DEMO_MEMBER.email,
          photo: firebaseUser.photoURL || undefined,
        });
      } else {
        setMember(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!auth) {
      setMember(DEMO_MEMBER);
      return;
    }
    await signInWithPopup(auth, googleProvider);
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!auth) {
      setMember({ ...DEMO_MEMBER, email });
      return;
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (email: string, password: string) => {
    if (!auth) {
      setMember({ ...DEMO_MEMBER, email });
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password);
  };

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
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
