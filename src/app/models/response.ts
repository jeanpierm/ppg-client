export class ApiResponse {
  constructor(
    public statusCode: string,
    public message: string,
    public data: any,
    public pagination: any
  ) {
    //
  }
}
