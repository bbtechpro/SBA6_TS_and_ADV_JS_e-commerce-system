export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const handleError = (error: unknown): void => {
  if (error instanceof AppError) {
    console.error(`[Status ${error.statusCode}]: ${error.message}`);
  } else if (error instanceof Error) {
    console.error(`[System Error]: ${error.message}`);
  } else {
    console.error('[Unknown Error]:', error);
  }
};
