import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ApiResponse,
  PaginatedApiResponse,
} from '../../core/models/api-response.model';
import { PaginatedApiQuery } from '../../core/models/paginated-api-query.interface';
import { CreateUserRequest } from '../interfaces/create-user-request.interface';
import { GetUsersParams } from '../interfaces/get-users-params.interface';
import { UpdateUserRequest } from '../interfaces/update-user-request.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  static readonly USERS_URL: string = environment.ppgApi.users;

  users: User[] = [];
  fetchLoading: boolean = true;
  resultsLength = 0;

  constructor(private http: HttpClient) {}

  loadUsers(params: PaginatedApiQuery & GetUsersParams): void {
    if (!this.fetchLoading) {
      this.fetchLoading = true;
    }

    this.getUsers(params).subscribe((res) => {
      this.users = res.data;
      this.resultsLength = res.totalItems;
      this.fetchLoading = false;
    });
  }

  getUsers({
    size,
    page,
    search,
    status,
  }: PaginatedApiQuery & GetUsersParams): Observable<any> {
    const url = new URL(`${UsersService.USERS_URL}`);
    if (size) url.searchParams.set('size', size.toString());
    if (page) url.searchParams.set('page', page.toString());
    if (search) url.searchParams.set('search', search);
    if (status) url.searchParams.set('status', status);

    return this.http.get<PaginatedApiResponse<User>>(url.toString());
  }

  saveUser(user: CreateUserRequest) {
    const url = `${UsersService.USERS_URL}`;
    return this.http.post<ApiResponse>(url, user);
  }

  updateUser(id: string, user: UpdateUserRequest) {
    const url = `${UsersService.USERS_URL}/${id}`;
    return this.http.patch<ApiResponse>(url, user);
  }

  inactive(userId: string) {
    const url = `${UsersService.USERS_URL}/${userId}`;
    return this.http.delete<ApiResponse>(url);
  }

  active(userId: string) {
    const url = `${UsersService.USERS_URL}/${userId}`;
    return this.http.post<ApiResponse>(url, null);
  }
}
