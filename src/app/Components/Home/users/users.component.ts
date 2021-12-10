
import { Component, OnInit } from '@angular/core'
import { AccountService } from 'src/app/Services/account.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private accountService: AccountService) { }


  inforPage: any = {admins: [], members: []}
  ngOnInit(): void {
    this.accountService.getAllUsers().subscribe(response => {
      this.inforPage = response
      for (let ad of this.inforPage.admins){
        ad.bDate = ad.bDate.split('T')[0]
        var dateTemp = ad.bDate.split('-');
        ad.bDate = dateTemp[2] + "-" + dateTemp[1] +"-" +  dateTemp[0]
      }

      for (let mem of this.inforPage.members){
        mem.bDate = mem.bDate.split('T')[0]
        var dateTemp = mem.bDate.split('-');
        mem.bDate = dateTemp[2] + "-" + dateTemp[1] +"-" +  dateTemp[0]
      }
    })
  }

}
