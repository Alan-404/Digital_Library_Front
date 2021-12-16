import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Component, OnInit } from '@angular/core'
import { AccountService } from 'src/app/Services/account.service';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private accountService: AccountService, private userService: UserService, private storage: AngularFireStorage) { }


  inforPage: any = {admins: [], members: []}

  loadUser(){
    this.accountService.getAllUsers().subscribe(response => {
      console.log(response)
      this.inforPage = response
      for (let ad of this.inforPage.admins){
        if (ad.bDate){
          var date = ad.bDate.split('T')[0]
          var dateTemp = date.split('-');
          ad.bDate = dateTemp[2] + "-" + dateTemp[1] +"-" +  dateTemp[0]
        }
        
      }

      for (let mem of this.inforPage.members){
        if (mem.bDate){
          var date = mem.bDate.split('T')[0]
          var dateTemp = date.split('-');
          mem.bDate = dateTemp[2] + "-" + dateTemp[1] +"-" +  dateTemp[0]
        }
      }
    })
  }
  ngOnInit(): void {
    this.loadUser()
  }


  changeRole(id: string){
    this.userService.changeRole(id).subscribe(response => {
      if (response.success){
        this.loadUser()
      }
    })
  }

  async deleteUser(id: string, imageLink:string){
    this.storage.refFromURL(imageLink).delete().subscribe(async () => {
      this.userService.deleteUser(id).subscribe(response => {
        if (response.success){
          this.loadUser();
        }
      })
    })
  }

}
