export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode: number);
}
export declare const handleError: (error: unknown) => void;
//# sourceMappingURL=errorHandler.d.ts.map