import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { Account } from 'src/app/Interfaces/Account';
import {Router} from '@angular/router'



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



  constructor(private loginService: AccountService, private router: Router) { }

  ngOnInit(): void {
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

}
