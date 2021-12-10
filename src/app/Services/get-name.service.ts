import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetName } from '../Interfaces/GetName';

const headerOption = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `Bearer ${localStorage.getItem('key')}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class GetNameService {

  constructor(private request: HttpClient) { }

  getName():Observable<GetName>{
    return this.request.get<GetName>('http://localhost:5000/account/getInfor', headerOption);
  }
}
