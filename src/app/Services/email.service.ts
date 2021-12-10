import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Response} from '../Interfaces/Response';
import { Mail } from '../Interfaces/Mail';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private request: HttpClient) { }

  sendEmail(mail: Mail):Observable<Response>{
    return this.request.post<Response>('http://localhost:5000/user/mail',mail);
  }
}
