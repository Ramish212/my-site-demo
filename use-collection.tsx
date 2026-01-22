"use client";

import { useState, useEffect } from "react";
import {
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
  limit,
  startAfter,
  Query,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
} from "firebase/firestore";
import { useFirestore } from "@/firebase/provider";
import { errorEmitter } from "../error-emitter";
import { FirestorePermissionError } from "../errors";

interface UseCollectionOptions {
  sort?: { by: string; direction?: "asc" | "desc" };
  filter?: { field: string; op: any; value: any };
  limit?: number;
  startAfterDoc?: any;
}

export const useCollection = <T,>(
  path: string,
  options: UseCollectionOptions = {}
) => {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!firestore || !path) return;
    setLoading(true);

    let q: Query<DocumentData> = collection(firestore, path);

    if (options.filter) {
      q = query(
        q,
        where(options.filter.field, options.filter.op, options.filter.value)
      );
    }

    if (options.sort) {
      q = query(q, orderBy(options.sort.by, options.sort.direction));
    }

    if (options.limit) {
      q = query(q, limit(options.limit));
    }

    if (options.startAfterDoc) {
      q = query(q, startAfter(options.startAfterDoc));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as unknown as T)
        );
        setData(docs);
        setLoading(false);
      },
      (err: FirestoreError) => {
        const permissionError = new FirestorePermissionError({
          path: path,
          operation: 'list',
        });
        errorEmitter.emit("permission-error", permissionError);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, path, JSON.stringify(options)]);

  return { data, loading, error };
};
