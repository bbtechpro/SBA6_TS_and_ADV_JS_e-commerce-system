import type { DjProductAPI } from '../services/types.js';
export declare class Product {
    id: number;
    title: string;
    category: string;
    price: number;
    discountPercentage: number;
    constructor(data: DjProductAPI);
    displayDetails(): void;
}
//# sourceMappingURL=Product.d.ts.map