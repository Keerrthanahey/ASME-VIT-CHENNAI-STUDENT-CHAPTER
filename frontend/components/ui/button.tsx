"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-asme-blue to-asme-cyan text-white shadow-lg shadow-asme-blue/25 hover:shadow-xl hover:shadow-asme-blue/40 hover:-translate-y-0.5",
        secondary:
          "bg-white/10 text-foreground backdrop-blur-md border border-white/10 hover:bg-white/15 hover:border-white/20",
        outline:
          "border border-asme-blue/50 bg-transparent text-asme-blue hover:bg-asme-blue/10 hover:border-asme-blue",
        ghost: "hover:bg-white/10 hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        glow: "relative overflow-hidden bg-gradient-to-r from-asme-blue via-asme-cyan to-asme-blue bg-[length:200%_100%] text-white animate-gradient-x shadow-[0_0_30px_rgba(0,102,204,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]",
        magnetic:
          "bg-gradient-to-br from-asme-blue to-asme-navy text-white shadow-lg hover:shadow-2xl hover:-translate-y-1",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-13 rounded-2xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Loading...
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
