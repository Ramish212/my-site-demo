"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

interface JuicyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const JuicyButton = React.forwardRef<HTMLButtonElement, JuicyButtonProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "relative flex items-center justify-center w-full rounded-2xl border-b-[4px] border-accent bg-primary px-8 py-4 text-lg font-bold uppercase tracking-wider text-primary-foreground transition-all duration-150 ease-in-out hover:brightness-105 active:translate-y-1 active:border-b-[2px] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
JuicyButton.displayName = "JuicyButton";

export { JuicyButton };
