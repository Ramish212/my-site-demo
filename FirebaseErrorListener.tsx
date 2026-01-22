"use client";

import { useEffect } from "react";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export function FirebaseErrorListener() {
  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      // In a real app, you might use a toast notification library
      // and a more robust logging service.
      console.error(error);
      // This will be caught by the Next.js error overlay in development.
      throw error;
    };

    errorEmitter.on("permission-error", handleError);

    return () => {
      errorEmitter.removeListener("permission-error", handleError);
    };
  }, []);

  return null;
}
