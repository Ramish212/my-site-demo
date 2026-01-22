"use client";

import { ReactNode, useMemo } from "react";
import { initializeFirebase } from ".";
import { FirebaseProvider } from "./provider";

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const firebaseInstances = useMemo(() => initializeFirebase(), []);

  return (
    <FirebaseProvider value={firebaseInstances}>{children}</FirebaseProvider>
  );
}
