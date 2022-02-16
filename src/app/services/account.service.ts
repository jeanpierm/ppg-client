import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from "../../environments/environment";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService{
    private _token: any;
   private _user: any;

    constructor(
        private http: HttpClient
    ){
        this._token = localStorage.getItem('token');
        this._user = localStorage.getItem('currentUser');
    }


    getAccount():Observable<User>{
        this._token = localStorage.getItem('token');
        let url = environment.api + '/account';
		let header = new HttpHeaders({ 
            'Content-type': 'application/json',
            'Authorization': `Bearer ${this._token}`
        });
        let options = {headers: header}
        return this.http.get(url,options).pipe(
            map((res: any) => {
              return  res.data;
            }),
            catchError((err, caught) => {
              throw err;
            })
        );
    }
}