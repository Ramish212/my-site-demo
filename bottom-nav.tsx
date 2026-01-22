"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { StickyNote, Wallet2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Wallet", icon: Wallet2 },
  { href: "/notes", label: "Notes", icon: StickyNote },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-30 w-full h-24 bg-white border-t-2 border-border/50">
      <div className="grid h-full grid-cols-2 mx-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-5 transition-colors hover:bg-primary/10 group"
            >
              <item.icon
                className={cn(
                  "w-8 h-8 mb-1 text-gray-400 transition-colors group-hover:text-primary",
                  isActive && "text-primary"
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={cn(
                  "text-sm text-gray-500 transition-colors group-hover:text-primary",
                  isActive && "text-primary font-bold"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
