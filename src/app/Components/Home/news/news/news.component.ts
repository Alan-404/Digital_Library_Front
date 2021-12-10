import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/Services/news.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private newsService: NewsService) { }

  newsId: string = '';

  infoPage: any = {news:{}};

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.newsId = params.id;
    })

    this.newsService.getNewsById(this.newsId).subscribe(response => {
      this.infoPage = response;
      console.log(response)
    })
  }

}
