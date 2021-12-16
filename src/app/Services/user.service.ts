import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../Interfaces/Account';
import { User } from '../Interfaces/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private request: HttpClient) { }

  registerAccount(user: User, account: Account):Observable<any>{
    var infor = {firstName: user.firstName, middleName: user.middleName, lastName: user.lastName, phone: user.phone, bDate: user.bDate, username: account.username, password: account.password, role: false, avatar: user.avatar, email: user.email}
    return this.request.post<any>(`http://localhost:5000/user/insert`, infor)
  }


  registerAccountGoogle(id: string, fullName: string, email: string, imageUrl: string):Observable<any>{
    return this.request.post<any>(`http://localhost:5000/user/register-google`, {id, fullName, email, imageUrl})
  }

  loginAccountGoogle(email: string):Observable<any>{
    return this.request.post<any>(`http://localhost:5000/user/login-google`, {email})
  }
}
