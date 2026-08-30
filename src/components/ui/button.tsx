import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Buttons im Shadcn-Schema, Optik wie gedruckte Eintrittskarten:
 * kraeftige Flaechen, harte Kanten mit grossem Radius, spuerbarer
 * Druckpunkt beim Klick.
 */
const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans font-semibold tracking-tight transition-[transform,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        rot: "bg-rot text-creme shadow-[0_6px_0_0_var(--color-rot-3)] hover:-translate-y-0.5 hover:shadow-[0_9px_0_0_var(--color-rot-3)] active:shadow-[0_3px_0_0_var(--color-rot-3)]",
        gold: "bg-gold-2 text-tinte shadow-[0_6px_0_0_var(--color-gold)] hover:-translate-y-0.5 hover:shadow-[0_9px_0_0_var(--color-gold)] active:shadow-[0_3px_0_0_var(--color-gold)]",
        tinte:
          "bg-tinte text-creme hover:bg-pflaume",
        outline:
          "border-2 border-tinte/25 bg-transparent text-tinte hover:border-tinte hover:bg-tinte hover:text-creme",
        outlineHell:
          "border-2 border-creme/40 bg-transparent text-creme hover:border-creme hover:bg-creme hover:text-tinte",
        ghost: "bg-transparent text-tinte/70 hover:bg-tinte/5 hover:text-tinte",
      },
      size: {
        sm: "h-9 px-4 text-[0.8125rem]",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "rot", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
