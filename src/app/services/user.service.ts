import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  save(User: any): Observable<any> {
    let url = environment.api + '/users';
    let params = JSON.stringify(User);
    let header = new HttpHeaders({
      'Content-type': 'application/json',
    });
    let options = { headers: header };
    return this.http.post(url, params, options).pipe(
      map((res: any) => {
        return res.data;
      }),
      catchError((err, caught) => {
        throw err;
      })
    );
  }
}
