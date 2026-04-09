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
import { calculateDiscount, calculateTax } from '../utils/calculators.js';
export class Product {
    id;
    title;
    category;
    price;
    discountPercentage;
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.price = data.price;
        this.category = data.category;
        this.discountPercentage = data.discountPercentage || 0;
    }
    displayDetails() {
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
//# sourceMappingURL=Product.js.map