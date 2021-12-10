
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.css']
})
export class HomeLandingComponent implements OnInit {

  showSpinner: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {


    if (this.router.url== '/home')
      this.router.navigate(['/home/mainPage']);

    setTimeout(() => {
      this.showSpinner = false;
    }, 5000)
  }

}
