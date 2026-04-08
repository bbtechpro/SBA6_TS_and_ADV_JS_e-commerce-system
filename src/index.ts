
import { Product } from './models/Product.js';
import { DjProductAPI } from './types.js';

const API_URL = 'https://dummyjson.com/products';

const fetchProducts = async (): Promise<DjProductAPI[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        
        const data = await response.json();
        // DummyJSON returns an object with a 'products' array
        return data.products; 
    } catch (error) {
        console.error("[API Error]:", error instanceof Error ? error.message : error);
        return [];
    }
};

const loadStore = async () => {
    console.log("Loading store...\n");
    const rawData = await fetchProducts();
    const products = rawData.map(item => new Product(item));
    
    products.forEach(p => p.displayDetails());
};

loadStore();
