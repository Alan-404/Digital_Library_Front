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

  infoPage: any = {user: {}}
  ngOnInit(): void {
    this.accountService.getAllInfo().subscribe(response => {
      this.infoPage = response;
      console.log(response);
      if (this.infoPage.user.avatar)
        this.avatar = true;
    })
  }


  showInfo(){
    this.edit = false;
  }

  editInfo(){
    this.edit = true;
  }

}
