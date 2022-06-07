export class ApiResponse<T = void> {
  constructor(
    public statusCode: string,
    public message: string,
    public data: T
  ) {}
}
