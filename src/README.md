Overview
In this assessment, you will apply the skills you’ve developed throughout the TypeScript and Advanced JavaScript module to build a functional, real-world application. This project will test your understanding of TypeScript features, object-oriented programming (OOP) principles, asynchronous operations, error handling, and API interaction. You will have 5.5 hours to complete this assessment.

You will create an E-commerce Product Management System using TypeScript. The final deliverable will include a GitHub repository with your project and a written reflection on your approach and the challenges you faced.

Based on your API research, plan the structure of your project. You will need to create API requests, handle errors, and display product information.
Before you begin coding, create a project plan and outline the steps you’ll take to implement the API interactions and display product data.
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
