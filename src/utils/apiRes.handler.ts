export class ApiRes<T = unknown> {
    statusCode: number;
    data: T | null;
    message: string;
    success: boolean;

    constructor(statusCode: number, data: T | null = null, message = "success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 300;
    }
};