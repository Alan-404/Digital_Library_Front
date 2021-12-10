import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/Services/news.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  constructor(private newsService: NewsService, private router: Router) { }


  infoPage: any = {news: []}
  slideShowNews: any = [];
  ngOnInit(): void {
    this.newsService.getAllNews().subscribe(response => {
      this.infoPage = response;
      this.infoPage.news = this.infoPage.news.reverse();
      for (var i = 0; i<3; ++i){
        this.slideShowNews.push(this.infoPage.news[i]);
      }
    })
  }


  goNews(id: string){
    this.router.navigate(['home/news'], {queryParams: {id}})
  }
}
