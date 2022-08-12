import { CreateUserRequest } from './create-user-request.interface';

export interface UpdateUserRequest extends Partial<CreateUserRequest> {}
