import { Component, OnInit, Output } from '@angular/core';
import { EmailService } from 'src/app/Services/email.service';
import { Mail } from 'src/app/Interfaces/Mail';
import { SharedService } from 'src/app/Services/shared.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private emailService: EmailService, private sharedService: SharedService) { }
  ngOnInit(): void {
  }
  message: String = '';
  mail: Mail = {email:''}
  onKey(event:any){
    this.mail.email = event.target.value;
  }

  authenticateEmail(){
    this.emailService.sendEmail(this.mail).subscribe(response => {
      if (response.success){
        this.message = response.message;
        localStorage.setItem('email', this.mail.email)
      }
        
        setTimeout(() => {this.message = ''}, 3000)
    })
  }

  

}
