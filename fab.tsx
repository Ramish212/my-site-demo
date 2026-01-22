"use client";

import Link from "next/link";
import { Plus, StickyNote, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { JuicyButton } from "./juicy-button";

export default function Fab() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-12 left-1/2 z-40 h-20 w-20 -translate-x-1/2 transform rounded-full bg-primary shadow-2xl ring-4 ring-white transition-transform hover:scale-110 active:scale-100"
          aria-label="Add new item"
        >
          <Plus className="h-10 w-10 text-primary-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl border-2 p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold">
            What's New?
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <JuicyButton asChild>
            <Link href="/expenses/new">
              <Wallet className="mr-3 h-6 w-6" />
              Add Expense
            </Link>
          </JuicyButton>
          <JuicyButton asChild>
            <Link href="/notes/new">
              <StickyNote className="mr-3 h-6 w-6" />
              Add Note
            </Link>
          </JuicyButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
