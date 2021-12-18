import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/Services/blog.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  constructor(private blogService: BlogService, private router: Router) { }

  infoPage: any = {blogs:[], users:[]};

  allowAddBlog: boolean = false;

  showUsers = []

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe(response => {
      this.infoPage = response;
      
      this.showUsers = this.infoPage.users.reverse();
      if (localStorage.getItem('key'))
        this.allowAddBlog = true;
    })

    
  }

  addBlog(){
    this.router.navigate(['home/addBlog']);
  }



}
