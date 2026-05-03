import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Service } from "@/lib/temple-data";

interface Props {
  service: Service;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  availableInventory?: number;
  disabled?: boolean;
}

export const ServiceCard = ({ service, quantity, onAdd, onRemove, availableInventory, disabled = false }: Props) => {
  const isOutOfStock = availableInventory !== undefined && availableInventory <= 0;
  const isLowStock = availableInventory !== undefined && availableInventory > 0 && availableInventory <= 10;
  const canAddMore = availableInventory === undefined || quantity < availableInventory;
  const isDisabled = disabled || isOutOfStock;
  
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-temple">
      <div className="absolute inset-x-0 top-0 h-1 bg-temple-gradient" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-maroon">{service.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
          {service.duration && (
            <p className="mt-2 text-xs uppercase tracking-wider text-gold">⏱ {service.duration}</p>
          )}
          {availableInventory !== undefined && (
            <p className={`mt-1 text-xs font-medium ${isOutOfStock ? "text-destructive" : isLowStock ? "text-orange-600" : "text-muted-foreground"}`}>
              {isOutOfStock ? "⚠ Out of Stock" : `${availableInventory} available`}
            </p>
          )}
        </div>
        <div className="text-right">
          <div className="font-display text-2xl font-bold text-saffron">
            {service.price === 0 ? "FREE" : `₹${service.price}`}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        {quantity === 0 ? (
          <Button 
            onClick={onAdd} 
            disabled={isDisabled}
            className="w-full bg-temple-gradient text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            <Plus className="mr-1 h-4 w-4" /> {isOutOfStock ? "Out of Stock" : disabled ? "Sign in to book" : "Add to booking"}
          </Button>
        ) : (
          <div className="flex w-full items-center justify-between rounded-lg bg-muted px-2 py-1">
            <Button size="icon" variant="ghost" onClick={onRemove} className="h-8 w-8" disabled={disabled}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-display text-lg font-bold text-maroon">{quantity}</span>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={onAdd} 
              disabled={!canAddMore || disabled}
              className="h-8 w-8 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
