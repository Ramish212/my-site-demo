"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { JuicyButton } from "@/components/juicy-button";
import { useState } from "react";
import { useFirestore } from "@/firebase";
import { addNote } from "@/firebase/mutations";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function NewNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) {
      toast({
        title: "Error",
        description: "Could not connect to database.",
        variant: "destructive"
      });
      return;
    };

    const noteData = {
      title,
      content,
    };
    
    addNote(firestore, noteData)
      .then(() => {
        toast({
          title: "Success!",
          description: "Your note has been saved."
        });
        router.push("/notes");
      })
      .catch((error) => {
        console.error("Error adding note: ", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Could not save note.",
        });
      });
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <header className="relative mb-8 flex items-center justify-center">
        <Button variant="ghost" size="icon" asChild className="absolute left-0">
          <Link href="/notes">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">New Note</h1>
      </header>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Your note title" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea id="content" placeholder="Jot down your thoughts..." rows={10} value={content} onChange={e => setContent(e.target.value)} required />
        </div>

        <JuicyButton type="submit">Save Note</JuicyButton>
      </form>
    </div>
  );
}
