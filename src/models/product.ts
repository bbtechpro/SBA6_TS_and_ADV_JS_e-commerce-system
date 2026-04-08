// // Use interface to define the contract for the raw data coming from the API:
// // Shape of the data as it arrives from the API
// import { calculateDiscount } from '../utils/discountCalculator.js';
// interface DjProductAPI {
//     id: number;
//     title: string;
//     description: string;
//     category: string;
//     price: number;
//     discountPercentage?: number; // Optional from API
// }

// class Product {
//     id: number;
//     title: string;
//     description: string;
//     category: string;
//     price: number;
//     discountPercentage: number;

//     constructor(data: DjProductAPI) {
//         this.id = data.id;
//         this.title = data.title;
//         this.price = data.price;
//         this.category = data.category;
//         this.description = data.description;
//         this.discountPercentage = data.discountPercentage || 0; // Default to 0
//     }

//     /**
//      * Calculates the final price after applying the discount percentage.
//      */
//     getPriceWithDiscount(): number {
//         // const discountAmount = (this.price * this.discountPercentage) / 100;
//         // const finalPrice = this.price - discountAmount;
//         // return Number(finalPrice.toFixed(2));
//         const discountAmount = calculateDiscount(this.price, this.discountPercentage);
//         return this.price - discountAmount;
//     }

//     /**
//      * Displays formatted details of the product to the console.
//      */
//     displayDetails(): void {
//         const discountedPrice = this.getPriceWithDiscount();
//         console.log(`--- Product Details ---`);
//         console.log(`Title: ${this.title}`);
//         console.log(`Category: ${this.category}`);
//         console.log(`Original Price: $${this.price}`);
//         console.log(`Discount: ${this.discountPercentage}%`);
//         console.log(`Final Price: $${discountedPrice}`);
//     }

// }

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


