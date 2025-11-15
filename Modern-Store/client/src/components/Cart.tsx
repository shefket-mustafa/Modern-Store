import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import type { CartItem } from "../types";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: string, size: string) => void;
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
}

const formatCurrency = (num: number) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(num);

const FREE_SHIPPING_THRESHOLD = 100;

export const Cart = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
}: CartProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent
        side="right"
        className="sm:max-w-lg w-full p-0 flex flex-col"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="p-6">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between mt-5">
              <span>Shopping Cart</span>
              <span className="text-sm font-normal text-muted-foreground">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </SheetTitle>
          </SheetHeader>

          {/* Free shipping progress */}
          <div className="mt-4 rounded-xl border bg-muted/30 p-3">
            {subtotal >= FREE_SHIPPING_THRESHOLD ? (
              <p className="text-sm font-medium">🎉 You’ve unlocked free shipping!</p>
            ) : (
              <p className="text-sm">
                You’re <span className="font-semibold">{formatCurrency(remaining)}</span> away from free shipping
              </p>
            )}
            <div className="mt-2 h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary transition-[width]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Items list */}
        <div className="flex-1 min-h-0">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center p-8 text-center">
              <div className="space-y-2">
                <p className="text-lg font-semibold">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">Add some items to get started.</p>
                <Button className="mt-2" onClick={onClose}>Continue shopping</Button>
              </div>
            </div>
          ) : (
            <ScrollArea className="h-full px-6">
              <ul className="space-y-4 pb-6">
                <AnimatePresence initial={false}>
                  {items.map((item) => {
                    const id = `${item.product._id}-${item.size}`;
                    const lineTotal = item.product.price * item.quantity;

                    return (
                      <motion.li
                        key={id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="grid grid-cols-[80px,1fr,auto] gap-4 rounded-xl border bg-card p-3"
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="h-20 w-20 rounded-lg object-cover"
                          loading="lazy"
                        />

                        <div className="flex min-w-0 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h4 className="truncate font-semibold">{item.product.name}</h4>
                              <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                            </div>
                            <span className="whitespace-nowrap text-sm font-medium">
                              {formatCurrency(item.product.price)}
                            </span>
                          </div>

                          {/* Quantity controls */}
                          <div className="mt-3 flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 cursor-pointer"
                              aria-label={`Decrease ${item.product.name}`}
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product._id,
                                  item.size,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              −
                            </Button>
                            <span className="w-10 text-center text-sm tabular-nums">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 cursor-pointer"
                              aria-label={`Increase ${item.product.name}`}
                              onClick={() =>
                                onUpdateQuantity(item.product._id, item.size, item.quantity + 1)
                              }
                            >
                              +
                            </Button>
                          </div>
                        </div>

                        {/* Right controls */}
                        <div className="flex  items-end justify-between">
                          {/* trash button  */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer hover:scale-150n transition"
                            aria-label={`Remove ${item.product.name}`}
                            onClick={() => onRemoveItem(item.product._id, item.size)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Line total</p>
                            <p className="text-sm font-semibold">{formatCurrency(lineTotal)}</p>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            </ScrollArea>
          )}
        </div>

        <Separator />

        {/* Sticky footer */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Taxes & shipping calculated at checkout</span>
          </div>

          <Button className="w-full mt-2" size="lg" disabled={items.length === 0}>
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
