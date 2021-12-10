import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/Interfaces/Account';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/User';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private storage: AngularFireStorage, private userService: UserService, private router: Router) { }

  account: Account = {username: '', password: ''}

  message: string = '';

  avatar: any = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4U5WnC1MCC0IFVbJPePBA2H0oEep5aDR_xS_FbNx3wlqqORv2QRsf5L5fbwOZBeqMdl4&usqp=CAU"


  user: User = {firstName: '', middleName: '', lastName: '', phone: '', email: '', avatar: '', bDate: ''}

  ngOnInit(): void {
  }


  rePass: string = ''
  onKey(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "firstName")
      this.user.firstName = value;
    else if (name == "middleName")
      this.user.middleName = value;
    else if (name == "lastName")
      this.user.lastName = value;
    else if (name == "phone")
      this.user.phone = value;
    else if (name == "email")
      this.user.email = value;
    else if (name == "username")
      this.account.username = value;
    else if (name == "password")
      this.account.password = value;
    else if (name == "rePass")
      this.rePass = value;
  }

  getDate(event: any){
    this.user.bDate = event.target.value;
  }


  file: any;
  upLoadImage(event: any){
    this.file = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (__event) => {
      this.avatar = reader.result;
    }
  }

  rep: any ={}
  async registerUser(){
    if (this.account.password != this.rePass){
      this.message = "Your password is not matched";

      setTimeout(() => {
        this.message = ''
      }, 3000)
      return;
    }
    
    const filePath = "/users/" + this.file.name + Math.random()
    await this.storage.upload(filePath, this.file);

    await this.storage.ref(filePath).getDownloadURL().subscribe(async (response) => {
      this.user.avatar = response;

      await this.userService.registerAccount(this.user, this.account).subscribe(response => {
        if (response.success == true)
        {
          this.router.navigate(['auth/login'])
        }
        else {
          this.message = response.message;

          setTimeout(() => {
            this.message = ''
          }, 3000)
        }
      })
    })


  }

}