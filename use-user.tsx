"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuth, useFirestore } from "@/firebase/provider";
import { errorEmitter } from "../error-emitter";
import { FirestorePermissionError } from "../errors";

export const useUser = () => {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || !firestore) {
      // Firebase might not be initialized yet
      if (!loading) setLoading(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      async (userAuth) => {
        if (userAuth) {
          // User is signed in
          const userRef = doc(firestore, `users/${userAuth.uid}`);
          const userData = {
            uid: userAuth.uid,
            email: userAuth.email,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          };
          // Update the user's profile in Firestore
          setDoc(userRef, userData, { merge: true }).catch((serverError) => {
             const permissionError = new FirestorePermissionError({
                path: userRef.path,
                operation: 'update',
                requestResourceData: userData,
              });
              errorEmitter.emit('permission-error', permissionError);
          });
          setUser(userAuth);
        } else {
          // User is signed out
          setUser(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Auth state error:", error);
        setUser(null);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth, firestore, loading]);

  return { user, loading };
};
