import { Product } from './models/Product.js';
const API_URL = 'https://dummyjson.com/products';
const fetchProducts = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        // FIX: Cast the JSON response to our interface
        const data = (await response.json());
        // Now TypeScript knows 'data.products' exists and is an array
        return data.products;
    }
    catch (error) {
        console.error("[API Error]:", error instanceof Error ? error.message : error);
        return [];
    }
};
const loadStore = async () => {
    console.log("Loading store...\n");
    const rawData = await fetchProducts();
    // Create class instances to use displayDetails()
    const products = rawData.map(item => new Product(item));
    products.forEach(p => p.displayDetails());
};
loadStore();
//# sourceMappingURL=index.js.map