export class AppError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
export const handleError = (error) => {
    if (error instanceof AppError) {
        console.error(`[Status ${error.statusCode}]: ${error.message}`);
    }
    else if (error instanceof Error) {
        console.error(`[System Error]: ${error.message}`);
    }
    else {
        console.error('[Unknown Error]:', error);
    }
};
//# sourceMappingURL=errorHandler.js.map