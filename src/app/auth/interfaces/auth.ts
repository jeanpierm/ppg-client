export interface LoginResponse {
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterResponse extends LoginResponse {}
export interface RefreshResponse extends LoginResponse {}

export interface RegisterRequest {
  email: string;
  name: string;
  surname: string;
  password: string;
}
