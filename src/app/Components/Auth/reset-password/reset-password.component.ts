import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { AccountService } from 'src/app/Services/account.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }
  email: any = ''
  message: string = ''
  ngOnInit(): void {
    if (!localStorage.getItem('email'))
      this.router.navigate(['/notFound'])
    this.email = localStorage.getItem('email')
  }

  newPassword: string = ''
  rePass: string = ''

  animate: string = 'danger'

  getInfor(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "password")
      this.newPassword = value
    else if (name == "rePass")
      this.rePass = value
  }

  resetPassword(){
    if (this.newPassword != this.rePass){
      this.message = 'Mật khẩu không khớp'
      this.animate = 'danger'
      return;
    }

    this.accountService.resetPassword(this.email, this.newPassword).subscribe(response => {
      if (response.success == true)
      {
        this.animate = 'success';
        this.message = 'Đổi password thành công';
        localStorage.removeItem('email')
      }
      else{
        this.animate = 'danger'
        this.message = "Đổi password không thành công"
      }
        
    })
  }

}
