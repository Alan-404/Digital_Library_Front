import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/Services/email.service';
import { Mail } from 'src/app/Interfaces/Mail';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private emailService: EmailService) { }
  ngOnInit(): void {
  }
  message: String = '';
  mail: Mail = {email:''}
  onKey(event:any){
    this.mail.email = event.target.value;
  }

  authenticateEmail(){
    console.log(this.mail.email);
    this.emailService.sendEmail(this.mail).subscribe(response => {
      if (response.success)
        this.message = response.message;
        setTimeout(() => {this.message = ''}, 3000)
    })
  }

  

}
