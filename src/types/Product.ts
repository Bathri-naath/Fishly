import { ReactNode } from "react";

// types/Product.ts
export interface Product {
    [x: string]: ReactNode;
    id: number; // Ensure the type matches your product structure
    name: string;
    price: number;
    image: string;
    quantity: string;
    pieces: string;
    servings: string;
  }
  