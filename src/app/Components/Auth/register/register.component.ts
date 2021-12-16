import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Account } from 'src/app/Interfaces/Account';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/User';
import { GoogleAuthService } from 'src/app/Services/google-auth.service';
import {SharedService} from 'src/app/Services/shared.service'
import {facebook_key} from 'src/app/Common/Constants'

declare var FB: any

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private storage: AngularFireStorage, private userService: UserService, private router: Router, private googleAuth: GoogleAuthService, private ref: ChangeDetectorRef, private sharedService: SharedService) { }

  account: Account = {username: '', password: ''}

  message: string = '';

  avatar: any = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4U5WnC1MCC0IFVbJPePBA2H0oEep5aDR_xS_FbNx3wlqqORv2QRsf5L5fbwOZBeqMdl4&usqp=CAU"


  user: User = {firstName: '', middleName: '', lastName: '', phone: '', email: '', avatar: '', bDate: ''}

  userGoogle: gapi.auth2.GoogleUser


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
  ngOnInit(): void {
    this.googleAuth.observable().subscribe(user => {
      this.userGoogle = user
      if (this.userGoogle){
        var profile = this.userGoogle.getBasicProfile();
        var id = profile.getId();
        var email = profile.getEmail()
        var fullName = profile.getName();
        var imageUrl = profile.getImageUrl();
        this.userService.registerAccountGoogle(id, fullName, email, imageUrl).subscribe(response => {
          if (response.success){
            this.router.navigate(['auth/login'])
          }
        })
      }
      this.ref.detectChanges()
    })


    this.loadFaceBook()

    
  }


  async registerByFacebook(){
    await FB.login(async (response) => {
      console.log(response)
      if (response.status == 'connected'){
        await FB.api(`/${response.authResponse.userID}`, async (rep) => {
          console.log(rep)
          if (rep.id){
            await this.sharedService.getInfoFaceBook(rep.id, response.authResponse.accessToken).subscribe(async (res) => {
              console.log(res.picture.data.url)
              if (res.picture.data.url){
                await this.userService.registerByFacebook(rep.id, rep.name, res.picture.data.url).subscribe(result => {
                  if (result.success){
                    this.router.navigate(['auth/login'])
                  }
                })
              }
            })
          }
        })
      }
    })
  }


  registerByGoogle(){
    this.googleAuth.signIn();
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
