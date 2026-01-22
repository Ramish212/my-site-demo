"use client";

import { useState, useEffect } from "react";
import {
  doc,
  onSnapshot,
  DocumentData,
  FirestoreError,
} from "firebase/firestore";
import { useFirestore } from "@/firebase/provider";
import { errorEmitter } from "../error-emitter";
import { FirestorePermissionError } from "../errors";

export const useDoc = <T,>(path: string) => {
  const firestore = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!firestore || !path) {
        setLoading(false);
        return;
    };

    setLoading(true);
    const docRef = doc(firestore, path);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() } as unknown as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err: FirestoreError) => {
        const permissionError = new FirestorePermissionError({
          path: path,
          operation: 'get',
        });
        errorEmitter.emit("permission-error", permissionError);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, path]);

  return { data, loading, error };
};
