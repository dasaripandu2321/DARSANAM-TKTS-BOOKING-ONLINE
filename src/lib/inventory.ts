import { services } from "./temple-data";

const INVENTORY_KEY = "temple-inventory-v1";

export interface InventoryState {
  [serviceId: string]: number; // Remaining inventory
}

export const getInventory = (): InventoryState => {
  try {
    const stored = localStorage.getItem(INVENTORY_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load inventory", error);
  }
  
  // Initialize with default inventory
  const initial: InventoryState = {};
  services.forEach(service => {
    if (service.inventory !== undefined) {
      initial[service.id] = service.inventory;
    }
  });
  return initial;
};

export const saveInventory = (inventory: InventoryState) => {
  try {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
  } catch (error) {
    console.error("Failed to save inventory", error);
  }
};

export const updateInventory = (serviceId: string, quantity: number): boolean => {
  const inventory = getInventory();
  const current = inventory[serviceId] ?? 0;
  
  if (current < quantity) {
    return false; // Not enough inventory
  }
  
  inventory[serviceId] = current - quantity;
  saveInventory(inventory);
  return true;
};

export const restoreInventory = (serviceId: string, quantity: number) => {
  const inventory = getInventory();
  const service = services.find(s => s.id === serviceId);
  const maxInventory = service?.inventory ?? 0;
  
  inventory[serviceId] = Math.min((inventory[serviceId] ?? 0) + quantity, maxInventory);
  saveInventory(inventory);
};

export const resetInventory = () => {
  const initial: InventoryState = {};
  services.forEach(service => {
    if (service.inventory !== undefined) {
      initial[service.id] = service.inventory;
    }
  });
  saveInventory(initial);
};

export const getAvailableInventory = (serviceId: string): number => {
  const inventory = getInventory();
  return inventory[serviceId] ?? 0;
};
