How you implemented TypeScript features and OOP principles.
- 1. TypeScript Features
Interfaces and Type Safety: I used interface ApiResponse and DjProductAPI to define the shape of external data. This ensured that the rest of the app knows exactly which properties (like id or price) are available, preventing "undefined" errors.
Type Casting and Assertions: In index.ts, I used an ApiResponse. This tells the TypeScript compiler to treat the generic JSON response as my specific interface, enabling autocomplete and type checking on data.products.

2. OOP Principles
Encapsulation: The Product class bundles data (id, title, price) and behavior (displayDetails) together. The internal logic of how a product is displayed is hidden within the class.
Abstraction: My loadStore function doesn't need to know how tax or discounts are calculated. It simply calls p.displayDetails(), hiding the complexity of the calculation logic.
Inheritance: In errorHandler.ts, my AppError class extends Error. This allows you to inherit the standard behavior of an Error while adding custom properties like statusCode and isOperational.
Data Transformation (Modeling): I used the Data Mapper pattern by taking "raw" data from the API and converting it into "rich" class instances (new Product(item)). This separates the data format of the API from the logic of your application.
Single Responsibility Principle: To separate concerns effectively: calculators.ts handles math, apiservice.ts handles networking, and Product.ts handles the data model.

The challenges you encountered and how you overcame them.
- The biggest challenge I encountered was with the import and export of modules. I had to edit the package.json file to add "type": "module" in the place of "type": "common.js" and specify the extension .js on the imported modules. After Googling other red squiggly line errors, I also had to add a couple of options in the tsconfig.json file to fix them , "esModuleInterop": true, "allowImportingTsExtensions": false. 

How you handled asynchronous operations and error management.
- Async/Await with Promises: My functions are typed as Promise<DjProductAPI[]>, explicitly defining what an asynchronous operation will eventually return.
Optional Properties: By using discountPercentage?: number, I handled cases where the API might not provide a discount value.
Type Guarding: In my error handlers, I used error instanceof Error. This is a type guard that allows TypeScript to safely access the message property inside the catch block.