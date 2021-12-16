import { Component, OnInit } from '@angular/core';
import { GetNameService } from 'src/app/Services/get-name.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private getNameService: GetNameService, private router: Router) { }
  name: String = '';
  role: boolean = false;
  auth: boolean = false;
  ngOnInit(): void {
    this.getNameService.getName().subscribe(response => {
      console.log(response)
      this.name = response.name;
      this.role = response.role;
    })
    if(localStorage.getItem('key'))
      this.auth = true;
  }

  logout(){
    localStorage.removeItem('key');
    this.auth = false
    this.name = '';
    this.router.navigate(['auth/login']);
  }

  loginAccount(){
    this.router.navigate(['auth/login']);
  }

  goToMyInfo(){
    this.router.navigate(['home/info/my-info']);
  }


}
