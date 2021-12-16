import { Injectable } from '@angular/core';
import { google_client_id } from '../Common/Constants';
import { Observable, ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private auth2: gapi.auth2.GoogleAuth
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1)
  constructor() { 
    gapi.load('auth2', ()=> {
      this.auth2 = gapi.auth2.init({
        client_id: google_client_id

      })
    })
  }

  public signIn(){
    this.auth2.signIn({
      scope: 'https://www.googleapis.com/auth/gmail.readonly'
    })
    .then(user => {
      this.subject.next(user)
    })
    .catch(() => {
      this.subject.next(undefined)
    })
  }


  public signOut(){
    this.auth2.signOut()
      .then(() => {
        this.subject.next(undefined)
      })
  }


  public observable(): Observable<gapi.auth2.GoogleUser>{
    return this.subject.asObservable()
  }
}
