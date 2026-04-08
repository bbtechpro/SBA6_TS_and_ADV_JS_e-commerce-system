Overview
In this assessment, you will apply the skills you’ve developed throughout the TypeScript and Advanced JavaScript module to build a functional, real-world application. This project will test your understanding of TypeScript features, object-oriented programming (OOP) principles, asynchronous operations, error handling, and API interaction. You will have 5.5 hours to complete this assessment.

You will create an E-commerce Product Management System using TypeScript. The final deliverable will include a GitHub repository with your project and a written reflection on your approach and the challenges you faced.

Based on your API research, plan the structure of your project. You will need to create API requests, handle errors, and display product information.
Before you begin coding, create a project plan and outline the steps you’ll take to implement the API interactions and display product data.

Project Plan:

- fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(console.log); // to see the fields and structure of the API

- Define a Product class that includes the appropriate properties based on data provided in the API response.
class Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    dicountPercentage: number;
}

- Include methods displayDetails() and getPriceWithDiscount(), and implement them appropriately based on the provided data.
Use interface to define the contract for the raw data coming from the API:
// Shape of the data as it arrives from the API
interface DjProductAPI {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage?: number; // Optional from API
}

class Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    dicountPercentage: number;

    constructor(data: DjProductAPI) {
        this.id = data.id;
        this.name = data.title;
        this.price = data.price;
        this.category = data.category;
        this.discountPercentage = data.discountPercentage || 0; // Default to 0
    }

    /**
     * Calculates the final price after applying the discount percentage.
     */
    getPriceWithDiscount(): number {
        const discountAmount = (this.price * this.discountPercentage) / 100;
        const finalPrice = this.price - discountAmount;
        return Number(finalPrice.toFixed(2));
    }

    /**
     * Displays formatted details of the product to the console.
     */
    displayDetails(): void {
        const discountedPrice = this.getPriceWithDiscount();
        console.log(`--- Product Details ---`);
        console.log(`Title: ${this.title}`);
        console.log(`Category: ${this.category}`);
        console.log(`Original Price: $${this.price}`);
        console.log(`Discount: ${this.discountPercentage}%`);
        console.log(`Final Price: $${discountedPrice}`);
    }
}

- Discount Calculator Module (discountCalculator.ts):
Create a calculateDiscount() function to handle discount calculations for products.
This function should return the dollar amount that a product is discounted by. For example, if a product costs $100 and has a 10% discount, the function should return $10.
export const calculateDiscount = (price: number, discountPercentage: number = 0): number => {
  if (price < 0 || discountPercentage < 0) return 0;
  
  const discountAmount = (price * discountPercentage) / 100;
  
  // Returns the amount rounded to 2 decimal places for currency accuracy
  return Math.round(discountAmount * 100) / 100;
};
  // Update Product class to use this dicountCalculator utility
import { calculateDiscount } from './discountCalculator';

// Inside your Product class...
getPriceWithDiscount(): number {
    const discountAmount = calculateDiscount(this.price, this.discountPercentage);
    return this.price - discountAmount;
}

- Create a calculateTax() function to handle tax calculations for products.
This function should return the dollar amount that a product is taxed at. For example, if a product costs $100 and is taxed at 10%, the function should return $10.
Note that the product data returned from the API does not include a taxPercentage field like it includes a discountPercentage field. Apply a default standard tax rate of 4.75% to each product; however, products with a category of “groceries” should only be taxed at 3%.
// taxCalculator.ts

/**
 * Calculates the tax amount for a product based on its category.
 * @param price - The price of the product (usually after discounts).
 * @param category - The product category to determine the specific rate.
 * @returns The calculated tax amount in dollars.
 */
export const calculateTax = (price: number, category: string): number => {
  if (price < 0) return 0;

  // Groceries get a reduced rate of 3%, all other categories get 4.75%
  const taxRate = category.toLowerCase() === 'groceries' ? 3 : 4.75;
  
  const taxAmount = (price * taxRate) / 100;

  // Returns the amount rounded to 2 decimal places
  return Math.round(taxAmount * 100) / 100;
};
Updated displayDetails() implementaion:
displayDetails(): void {
    const discountAmount = calculateDiscount(this.price, this.discountPercentage);
    const priceAfterDiscount = this.price - discountAmount;
    const taxAmount = calculateTax(priceAfterDiscount, this.category);
    const finalTotal = priceAfterDiscount + taxAmount;

    console.log(`--- ${this.title} ---`);
    console.log(`Subtotal: $${priceAfterDiscount.toFixed(2)}`);
    console.log(`Tax (${this.category}): $${taxAmount.toFixed(2)}`);
    console.log(`Total: $${finalTotal.toFixed(2)}`);
}

- API Service (apiService.ts):
Create API requests using async/await and Promises.
Implement functions to fetch product data and handle errors using try/catch.
Error Handling Utility:
// types.ts
export interface DjProductAPI {
    id: number;
    name: string;
    price: number;
    category: string;
    discountPercentage?: number;
}

// apiService.ts
import { DjProductAPI } from './types'; 

const API_URL = 'https://dummyjson.com/products';

/**
 * Fetches product data from the API and returns an array of products.
 * Includes error handling for network issues and non-200 responses.
 */
export const fetchProducts = async (): Promise<DjProductAPI[]> => {
  try {
    const response = await fetch(API_URL);

    // Check if the response status is within the 200-299 range
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data: DjProductAPI[] = await response.json();
    return data;

  } catch (error) {
    // Pass the error to a dedicated logger or re-throw for the UI to handle
    handleApiError(error);
    return []; // Return empty array to prevent app crashes
  }
};

/**
 * Specialized Error Handling Utility
 * Centralizes how the application reports failures.
 */
const handleApiError = (error: unknown): void => {
  if (error instanceof Error) {
    console.error(`[API Service Error]: ${error.message}`);
  } else {
    console.error('[API Service Error]: An unknown error occurred while fetching data.');
  }
};
const loadStore = async () => {
  const rawProducts = await fetchProducts();
  
  // Transform raw API objects into instances of your Product class
  const productInstances = rawProducts.map(item => new Product(item));
  
  // Now call methods
  productInstances.forEach(p => p.displayDetails());
};

- Error Handler Module (errorHandler.ts):
Implement a custom error class and functions to handle different types of errors gracefully.
// errorHandler.ts

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Mark as an expected error (e.g., API down) vs. a code crash
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
/**
 * Centralized function to process errors from across the app.
 */
export const handleError = (error: unknown): void => {
  if (error instanceof AppError) {
    // These are errors we defined (like 404 or 500)
    console.error(`[Status ${error.statusCode}]: ${error.message}`);
  } else if (error instanceof Error) {
    // These are standard JS errors (syntax, null pointers)
    console.error(`[System Error]: ${error.message}`);
  } else {
    // Fallback for weird edge cases
    console.error('[Unknown Error]:', error);
  }
};




Ensure you have thoroughly read through the requirements for the project below before you begin planning it.

Implementation
Develop Product Class:

Product Base Class (Product.ts):
Define a Product class that includes the appropriate properties based on data provided in the API response.
Include methods displayDetails() and getPriceWithDiscount(), and implement them appropriately based on the provided data.
Implement Utilities:

Discount Calculator Module (discountCalculator.ts):
Create a calculateDiscount() function to handle discount calculations for products.
This function should return the dollar amount that a product is discounted by. For example, if a product costs $100 and has a 10% discount, the function should return $10.
Tax Calculator Module (taxCalculator.ts):
Create a calculateTax() function to handle tax calculations for products.
This function should return the dollar amount that a product is taxed at. For example, if a product costs $100 and is taxed at 10%, the function should return $10.
Note that the product data returned from the API does not include a taxPercentage field like it includes a discountPercentage field. Apply a default standard tax rate of 4.75% to each product; however, products with a category of “groceries” should only be taxed at 3%.
Handle Asynchronous Operations:

API Service (apiService.ts):
Create API requests using async/await and Promises.
Implement functions to fetch product data and handle errors using try/catch.
Error Handling Utility:

Error Handler Module (errorHandler.ts):
Implement a custom error class and functions to handle different types of errors gracefully.
Create the Main Application:

Main Entry File (index.ts):
Import the product classes, tax calculator, and API service.
Create instances of Product by fetching product data from the API.
Use asynchronous functions to fetch product data and display it.
Demonstrate error handling and OOP principles in action.
