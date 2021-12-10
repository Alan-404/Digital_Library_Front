import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Ads} from '../Interfaces/Ads';
@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor(private request: HttpClient) { }


  getAllAds():Observable<Ads>{
    return this.request.get<Ads>('http://localhost:5000/ad');
  }
}
