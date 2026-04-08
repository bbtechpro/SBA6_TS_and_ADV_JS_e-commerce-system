export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Mark as an expected error (e.g., API down) vs. a code crash
    this.isOperational = true;
  // Only call captureStackTrace if it exists
  
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    } else {
      // Fallback for non-V8 environments
      this.constructor = (new Error()).stack;
    }
  }
}
//     Error.captureStackTrace(this, this.constructor);
//   }
// }
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

