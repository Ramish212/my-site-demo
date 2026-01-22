'use client';
import {
  addDoc,
  collection,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import { errorEmitter } from './error-emitter';
import { FirestorePermissionError } from './errors';
import type { Note, Expense } from '@/lib/types';

export function addNote(
  firestore: Firestore,
  note: Omit<Note, 'id' | 'createdAt'>
) {
  const collectionRef = collection(firestore, 'notes');
  const noteData = {
    ...note,
    createdAt: serverTimestamp(),
  };

  return addDoc(collectionRef, noteData).catch((serverError) => {
    const permissionError = new FirestorePermissionError({
      path: collectionRef.path,
      operation: 'create',
      requestResourceData: noteData,
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  });
}

export function addExpense(
  firestore: Firestore,
  expense: Omit<Expense, 'id' | 'createdAt'>
) {
  const collectionRef = collection(firestore, `expenses`);
  const expenseData = {
    ...expense,
    createdAt: serverTimestamp(),
  };
  return addDoc(collectionRef, expenseData).catch((serverError) => {
    const permissionError = new FirestorePermissionError({
      path: collectionRef.path,
      operation: 'create',
      requestResourceData: expenseData,
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  });
}
