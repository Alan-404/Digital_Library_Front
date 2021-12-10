import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  avatar: boolean = false;

  edit: boolean = false;

  showFormChange = false;

  infoPage: any = {user: {}}
  ngOnInit(): void {
    this.accountService.getAllInfo().subscribe(response => {
      this.infoPage = response;
      console.log(response);
      if (this.infoPage.user.avatar)
        this.avatar = true;
        
    })
  }

  oldPassword: string = '';
  newPassword: string = '';
  rePassword: string = '';
  getInfo(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "oldPass")
      this.oldPassword = value;
    else if (name == "newPass")
      this.newPassword = value;
    else if (name == "rePass")
      this.rePassword = value;
      
  }

  message: string = ''
  showColorMessage = 'text-danger'
  changePassoword(){
    if (this.newPassword == '' || this.oldPassword == '' || this.rePassword == ''){
      this.message = 'Vui lòng điền đầy đủ các trường'
      setTimeout(() => {
        this.message = ''
      }, 2000)
      return;
    }

    if (this.newPassword != this.rePassword){
      this.message = 'Mật khẩu không khớp'
      setTimeout(() => {
        this.message = ''
      }, 2000)
    }

    this.accountService.changePassword(this.oldPassword, this.newPassword).subscribe(response => {
      if (!response.success){
        this.message = "Đổi mật khẩu không thành công"
      }
      else{
        this.showColorMessage = "text-success"
        this.message = "Đổi mật khẩu thành công";
        this.showFormChange = false
      }

      
      setTimeout(() => {
        this.message = ''
      }, 2000)
    })
  }


  showInfo(){
    this.edit = false;
  }

  editInfo(){
    this.edit = true;
  }


  showFormChangePassword(){
    this.showFormChange = true;
  }

  cancelShowForm(){
    this.showFormChange = false;
  }

}
