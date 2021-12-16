import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { Account } from 'src/app/Interfaces/Account';
import {Router} from '@angular/router'
import { GoogleAuthService } from 'src/app/Services/google-auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  account: Account = {username: '', password: ''}

  message: String = '';


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


  

}
