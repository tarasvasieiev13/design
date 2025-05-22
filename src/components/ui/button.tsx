
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-all duration-300 hover:shadow-md relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80 hover:scale-105 active:scale-95 hover:rotate-[0.5deg] shadow-lg",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105 active:scale-95 hover:rotate-[0.5deg] shadow-lg",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95 hover:rotate-[0.5deg] shadow",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 active:scale-95 hover:rotate-[0.5deg] shadow-lg",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground hover:scale-105 active:scale-95",
        link: "text-primary underline-offset-4 hover:underline hover:scale-105 font-semibold",
        shimmer: "border-2 border-primary/30 bg-background shadow-xl shadow-primary/10 before:absolute before:inset-0 before:-z-10 before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-primary/20 before:to-transparent hover:scale-105 active:scale-95 hover:rotate-[0.5deg] dark:border-white/10 dark:shadow-primary/15",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
