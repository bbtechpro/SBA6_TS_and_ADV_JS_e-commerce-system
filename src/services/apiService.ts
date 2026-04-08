/**
 * Fetches product data from the API and returns an array of products.
 * Includes error handling for network issues and non-200 responses.
 */
import type{ DjProductAPI } from './types.js'; 
const API_URL = 'https://dummyjson.com/products';

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

// error handling example
// if (Response.status === 404) {
//   throw new AppError("Product not found", 404);
// } else if (Response.status >= 500) {
//   throw new AppError("Server is currently down", 500);
// }
