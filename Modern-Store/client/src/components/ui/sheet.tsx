import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

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
  right: "right-0 top-0 h-full w-80 border-l",
  left: "left-0 top-0 h-full w-80 border-r",
  top: "top-0 left-0 w-full h-1/3 border-b",
  bottom: "bottom-0 left-0 w-full h-1/3 border-t",
} as const;

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  side?: keyof typeof positions;
}

export const SheetContent = React.forwardRef<
  HTMLDivElement,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />

    <Dialog.Content
      ref={ref}
      className={cn(
        "fixed z-50 bg-white p-6 shadow-lg flex flex-col",
        positions[side],
        className
      )}
      {...props}
    >
      {children}

      <SheetClose className="absolute right-4 top-4 opacity-70 hover:opacity-100 transition">
        <X className="w-4 h-4" />
      </SheetClose>
    </Dialog.Content>
  </SheetPortal>
));

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
