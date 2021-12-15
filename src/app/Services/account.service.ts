import { Injectable } from '@angular/core';
import { Account } from '../Interfaces/Account';
import {Response} from '../Interfaces/Response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headerOption = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `Bearer ${localStorage.getItem('key')}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private request: HttpClient) { }

  loginAccount(account: Account):Observable<Response>{
    return this.request.post<Response>('http://localhost:5000/account/login', account);
  }


  getRole():Observable<{}>{
    return this.request.get<{}>(`http://localhost:5000/account/getRole`, headerOption);
  }


  getAllInfo():Observable<{}>{
    return this.request.get<{}>(`http://localhost:5000/account/info`,headerOption);
  }


  getAllUsers():Observable<{}>{
    return this.request.get<{}>(`http://localhost:5000/account/getAllUsers`);
  }


  changePassword(oldPass: string, newPass: string):Observable<any>{
    return this.request.put<any>('http://localhost:5000/account/change', {oldPassword: oldPass, newPassword: newPass}, headerOption)
  }

  getInfor():Observable<any>{
    return this.request.get<any>('http://localhost:5000/account/getInfor', headerOption);
  }
}
