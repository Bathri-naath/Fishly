// CartItem interface
export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: string; // This will still refer to product weight
    count: number; // New property to track the number of items
    servings: string;
  }
  