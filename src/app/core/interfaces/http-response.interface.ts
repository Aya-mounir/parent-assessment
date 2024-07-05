export interface IHttpResponse<T> {
    data?: T,
    errorMessage: string,
    success: boolean,
    statusCode: number,
    content:T
}
