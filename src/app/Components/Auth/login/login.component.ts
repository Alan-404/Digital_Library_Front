import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { Account } from 'src/app/Interfaces/Account';
import {Router} from '@angular/router'
import { GoogleAuthService } from 'src/app/Services/google-auth.service';
import { UserService } from 'src/app/Services/user.service';
import {facebook_key} from 'src/app/Common/Constants'

declare var FB: any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  account: Account = {username: '', password: ''}

  message: String = '';

  loadFaceBook(){
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : facebook_key,
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0'
      });
        
      FB.AppEvents.logPageView();   
        
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       (js as any).src = "https://connect.facebook.net/en_US/sdk.js";
       (fjs as any).parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }


  onKey(event: any){
    if (event.target.name == "username")
      this.account.username = event.target.value;
    else if (event.target.name == "password")
      this.account.password = event.target.value;
  }

  user: gapi.auth2.GoogleUser


  constructor(private loginService: AccountService, private router: Router, private googleAuth: GoogleAuthService, private ref: ChangeDetectorRef, private userService: UserService) { }

  ngOnInit(): void {
    this.googleAuth.observable().subscribe(user => {
      this.user = user;
      if (this.user){
        this.userService.loginAccountGoogle(this.user.getBasicProfile().getEmail()).subscribe(response => {
          console.log(response)
          if (response.success){
            localStorage.setItem('key', response.accessToken);
            this.router.navigate(['home']).then(() => {
              window.location.reload();
            });
          }
        })
      }
      this.ref.detectChanges()
    })

    this.loadFaceBook();
  }

  login(){
    this.loginService.loginAccount(this.account).subscribe(response => {
      if (!response.success)
      {
        this.message = response.message;
        setTimeout(() => {this.message = ''}, 3000)
      }
      else{
        localStorage.setItem('key', response.accessToken);
        this.router.navigate(['home']).then(() => {
          window.location.reload();
        });
      }
    })
  }

  signInGoogle(){
    this.googleAuth.signIn()
  }


  async loginAccountFacebook(){
    await FB.login(async (response) => {
      console.log(response)
      await this.loginService.loginByFacebook(response.authResponse.userID).subscribe(rep => {
        if (rep.success){
          localStorage.setItem('key', rep.accessToken);
          this.router.navigate(['home']).then(() => {
            window.location.reload();
          });
        }
      })
    })
  }


  

}
