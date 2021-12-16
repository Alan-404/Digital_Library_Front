import { Component, OnInit } from '@angular/core';
import { AdService } from 'src/app/Services/ad.service';
import {Ad} from '../../../../Interfaces/Ad';
import { GetBookService } from 'src/app/Services/get-book.service';
import { NewsService } from 'src/app/Services/news.service';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/Services/blog.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private AdService: AdService, private getBookService: GetBookService, private newsService: NewsService, private router: Router, private blogService: BlogService) { }
 
  ads: Ad[] = [];

  showSpinner: boolean = true;

  novelBooks: any = [];

  infoNews: any = {news: []};

  showNews: any = [];

  infoBooks: any = {books: []};

  booksShow: any = [];

  infoBlogs : any = []

  blogsShow: any = []

  ngOnInit(): void {
    this.AdService.getAllAds().subscribe(response => {
      this.ads = response.ads;
    })

    this.newsService.getAllNews().subscribe(response => {
      this.infoNews = response;
      for (var i =this.infoNews.news.length - 1; i>= this.infoNews.news.length-4; --i)
        this.showNews.push(this.infoNews.news[i])
    })

    this.getBookService.getAllBooks().subscribe(response => {
      this.infoBooks = response;
      for (var i = this.infoBooks.books.length - 1; i >= this.infoBooks.books.length - 4; --i)
        this.booksShow.push(this.infoBooks.books[i]);
    })

    this.blogService.getAllBlogs().subscribe(response => {
      for (var i = 0; i<response.blogs.length; ++i){
        this.blogsShow.push(response.blogs[i])
        if (i == 3)
          break;
      }
      this.blogsShow.reverse();  
    })

    setTimeout(() => {
      this.showSpinner =false
    }, 2000)

  }

  routeNewsPage(id: String){
    this.router.navigate(['home/news'], {queryParams: {id}})
  }

  routeBookPage(id: String){
    this.router.navigate(['home/book'], {queryParams: {id}})
  }

  routeBlogPage(id: string){
    this.router.navigate(['home/blog'], {queryParams: {id}})
  }




}
