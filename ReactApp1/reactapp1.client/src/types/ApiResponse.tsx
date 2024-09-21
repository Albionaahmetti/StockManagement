export interface ApiResponse<T> {
    statusCode: number;
    result: T[];
}