import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }

  infoAccess: any = {role: false};

  ngOnInit(): void {
    this.accountService.getRole().subscribe(response => {
      this.infoAccess = response;
      if (!this.infoAccess.role)
        this.router.navigate(['accessDenied']);
      else 
        this.router.navigate(['home/admin/homeAdmin']);
    })
  }

}
