import type { DjProductAPI } from '../services/types.js';
import { calculateDiscount, calculateTax } from '../utils/calculators.js';

export class Product {
    id: number;
    title: string;
    category: string;
    price: number;
    discountPercentage: number;

    constructor(data: DjProductAPI) {
        this.id = data.id;
        this.title = data.title;
        this.price = data.price;
        this.category = data.category;
        this.discountPercentage = data.discountPercentage || 0;
    }

    displayDetails(): void {
        const discountAmount = calculateDiscount(this.price, this.discountPercentage);
        const priceAfterDiscount = this.price - discountAmount;
        const taxAmount = calculateTax(priceAfterDiscount, this.category);
        const finalTotal = priceAfterDiscount + taxAmount;

        console.log(`--- ${this.title} ---`);
        console.log(`Original: $${this.price.toFixed(2)}`);
        console.log(`Subtotal (after -${this.discountPercentage}%): $${priceAfterDiscount.toFixed(2)}`);
        console.log(`Tax (${this.category}): $${taxAmount.toFixed(2)}`);
        console.log(`Total: $${finalTotal.toFixed(2)}\n`);
    }
}


