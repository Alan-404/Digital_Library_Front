import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private request: HttpClient) { }

  getInfoFaceBook(id: string, accessToken: string):Observable<any>{
    return this.request.get(`https://graph.facebook.com/${id}?fields=picture&access_token=${accessToken}`)
  }

  
}
