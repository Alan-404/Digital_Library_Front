import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.css']
})
export class ChangeAvatarComponent implements OnInit {

  constructor(private accountService: AccountService, private storage: AngularFireStorage, private userService: UserService) { }

  infoPage: any
  imageShow: any

  showSpinner = false;


  fullName: string = ''
  ngOnInit(): void {
    this.accountService.getAllInfo().subscribe(response => {
      this.infoPage = response
      this.imageShow = this.infoPage.user.avatar
      this.fullName = this.infoPage.user.firstName+ " " + this.infoPage.user.middleName+ " " + this.infoPage.user.lastName
    })
  }

  file: any
  fileName: any;
  uploadImage(event: any){
    this.file = event.target.files[0]

    this.fileName = event.target.files[0].name;

    var reader = new FileReader()
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imageShow = reader.result;
    }

  }


  async changeAvatar(){
    this.showSpinner = true
    const check = this.infoPage.user.avatar.split('firebase');
    if (check.length > 1)
      await this.storage.refFromURL(this.infoPage.user.avatar).delete()

    const filePath = '/users/'+ this.fileName + Math.random();
    await this.storage.upload(filePath, this.file);

    await this.storage.ref(filePath).getDownloadURL().subscribe(async (info) => {
      await this.userService.changeAvatar(this.infoPage.user._id, info).subscribe(rep => {
        if (rep.success){
          this.showSpinner = false
        }
      })
    })

  }

}
