export interface ResetPasswordRequest {
  token: string;
  userId: string;
  newPassword: string;
}
