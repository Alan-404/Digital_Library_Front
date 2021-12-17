import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { BlogService } from 'src/app/Services/blog.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/User';
import { UserService } from 'src/app/Services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  constructor(private accountService: AccountService, private blogService: BlogService, private router: Router, private userService: UserService, private storage: AngularFireStorage) { }

  showProcess = false
  avatar: boolean = false;

  edit: boolean = false;

  showFormChange = false;

  infoPage: any = {user: {}}
  infoBlogs: any = []

  imageShow: any


  userShow: User = {firstName: '', middleName: '', lastName: '', bDate: '', email: '', phone: '', maxim: '', id: ''}


  loadUser(){
    this.accountService.getAllInfo().subscribe(response => {
      this.infoPage = response;
      if(this.infoPage.user.bDate != null)
        this.infoPage.user.bDate = this.infoPage.user.bDate.split('T')[0]
      this.userShow.firstName = this.infoPage.user.firstName;
      this.userShow.middleName = this.infoPage.user.middleName;
      this.userShow.lastName = this.infoPage.user.lastName;
      this.userShow.bDate = this.infoPage.user.bDate;
      this.userShow.email = this.infoPage.user.email;
      this.userShow.phone = this.infoPage.user.phone;
      this.userShow.maxim = this.infoPage.user.maxim;
      this.userShow.id = this.infoPage.user._id;
      this.imageShow = this.infoPage.user.avatar
      if (this.infoPage.user.avatar)
        this.avatar = true;
        
    })
  }

  blogShow: any = []
  allBlogs: any = []
  temp: any = []
  count = 1;
  showPage: any = [];
  loadBlogs(){
    this.blogShow = []
    this.allBlogs = []
    this.temp = []
    this.count = 1
    this.showPage = []
    this.blogService.allBlogsByToken().subscribe(response => {
      console.log(response)
      this.infoBlogs = response.blogs.reverse();
      console.log(this.infoBlogs)
      this.count = Math.floor(this.infoBlogs.length/3);
      if (this.infoBlogs.length%3!=0)
        this.count++;
      for (var i =1; i<=this.count; i++){
        this.showPage.push(i)
      }
      for (var i = 0; i<this.infoBlogs.length; ++i){
        if(i%3==0 && i!=0){
          console.log("stop")
          this.allBlogs.push(this.temp)
          this.temp = []
        }
        this.temp.push(this.infoBlogs[i])
      }
      this.allBlogs.push(this.temp)
      this.blogShow = this.allBlogs[0]
    })
  }
  ngOnInit(): void {
    
    this.loadUser()
    this.loadBlogs()
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

  getBlogByPage(event: any){
    var page = event.target.text;
    this.blogShow = this.allBlogs[page-1]
  }

  getAuthInfo(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "firstName")
      this.userShow.firstName = value;
    else if (name == "middleName")
      this.userShow.middleName = value;
    else if (name == "lastName")
      this.userShow.lastName = value;
    else if (name == "email")
      this.userShow.email = value;
    else if (name == "phone")
      this.userShow.phone = value;
    else if (name == "maxim")
      this.userShow.maxim = value;
  }

  getBdate(event: any){
    this.userShow.bDate = event.target.value
  }

  messageInfo: string = ''
  editInfoUser(){
    this.userService.editInfoUser(this.userShow).subscribe(response => {
      if (response.success){
        this.loadUser();
        this.messageInfo = "Đổi thông tin thành công"
      }     
      else
        this.messageInfo = "Đổi thông tin không thành công"

      setTimeout(() => {
        this.messageInfo = ''
      }, 3000)
    })
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



  changePage(){
    this.edit = !this.edit;
  }


  showFormChangePassword(){
    this.showFormChange = true;
  }

  cancelShowForm(){
    this.showFormChange = false;
  }


  goChangeAvatar(){
    this.router.navigate(['home/change-avatar'])
  }


  async deleteMyBlog(id: string, imageLink: string){
    this.showProcess = true
    var check = imageLink.split('firebase');
    if(check.length > 1){
      await this.storage.refFromURL(imageLink).delete();
    } 

    await this.blogService.deleteBlog(id).subscribe(response => {
      if (response.success){
        
        this.loadBlogs();
        this.showProcess = false;
      }
    })
  }
}
