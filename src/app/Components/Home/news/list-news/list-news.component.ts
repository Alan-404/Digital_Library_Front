import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/Services/news.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {

  constructor(private newsService: NewsService, private router: Router, private storage: AngularFireStorage) { }

  newsShow: any


  loadNews(){
    this.newsService.getAllNews().subscribe(response => {
      console.log(response)
      this.newsShow = response.news.reverse()
      console.log(this.newsShow)
    })
  }

  ngOnInit(): void {
    this.loadNews()
  }


  goToNews(id: string){
    this.router.navigate(['home/news'], {queryParams: {id}})
  }

  async delele(id: string, imageLink: string){
    await this.storage.refFromURL(imageLink).delete()

    await this.newsService.deleleNews(id).subscribe(response => {
      if (response.success){
        this.loadNews()
      }
    })
  }

}
