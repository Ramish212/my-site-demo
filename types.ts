import type { LucideIcon } from "lucide-react";
import { Timestamp } from "firebase/firestore";

export type Expense = {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  createdAt: Timestamp;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
};
