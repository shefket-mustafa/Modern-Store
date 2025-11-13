import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import {motion} from "framer-motion";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;
export const SheetPortal = Dialog.Portal;

export const SheetOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 bg-black/60 backdrop-blur-sm z-40",
      className
    )}
    {...props}
  />
));

SheetOverlay.displayName = "SheetOverlay";

const positions = {
  right:  "inset-0 flex",          // full screen container
  left:   "inset-0 flex",
  top:    "inset-0 flex",
  bottom: "inset-0 flex",
} as const;

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  side?: keyof typeof positions;
}

export const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => {
    const slide = {
      initial: { x: side === "right" ? 80 : side === "left" ? -80 : 0, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: side === "right" ? 80 : side === "left" ? -80 : 0, opacity: 0 },
      transition: { type: "spring", stiffness: 260, damping: 25 } as const,
    };

    // panelWidth can be tuned; keeps Content full-screen for focus trap,
    // while the inner panel actually slides.
    const panelBase =
      side === "right"
        ? "ml-auto border-l"
        : side === "left"
        ? "mr-auto border-r"
        : "mx-auto border-b";

    return (
      <SheetPortal>
        <SheetOverlay />

        <Dialog.Content
          ref={ref}
          className={cn(
            "fixed z-50 p-0 outline-none",
            positions[side],
          )}
          {...props}
        >
          <motion.div
            initial={slide.initial}
            animate={slide.animate}
            exit={slide.exit}
            transition={slide.transition}
            className={cn(
              "bg-white shadow-lg flex flex-col h-full w-full max-w-sm sm:w-lg p-6",
              panelBase,
              className
            )}
          >
            {children}

            <SheetClose className="absolute right-4 top-4 opacity-70 hover:opacity-100 transition">
              <X className="w-4 h-4" />
            </SheetClose>
          </motion.div>
        </Dialog.Content>
      </SheetPortal>
    );
  }
);
SheetContent.displayName = "SheetContent";


SheetContent.displayName = "SheetContent";

export const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5", className)} {...props} />
);

export const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));

SheetTitle.displayName = "SheetTitle";
