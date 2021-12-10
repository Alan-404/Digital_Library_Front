import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/Services/author.service';
import {Router, ActivatedRoute} from '@angular/router'
import { NewsService } from 'src/app/Services/news.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  constructor(private authorService: AuthorService, private router: Router, private newsService: NewsService) { }

  infoPage: any = {authors:[]}

  numberOfRender: number = 5;

  renderAuthors: any = [];
  pagination: number = 0;

  renderPage: any = [];


  animation: string = "w3-animate-right";

  temp: any = [];

  all: any = [];

  index: number = 0;

  infoNews: any = {news: []};

  showNews: any = [];

  showSpinner: boolean = true;

  first: boolean = true;


  ngOnInit(): void {
    this.authorService.getAllAuthors().subscribe(response => {
      this.infoPage = response;

      for (var i =0; i<this.infoPage.authors.length; i++){
        
        if(i%this.numberOfRender==0)
        {
          if(i!=0)
          {
            this.all.push(this.temp)
          }
          this.temp = [];         
        }
        this.temp.push(this.infoPage.authors[i]);
      }
      this.all.push(this.temp);

      this.renderAuthors = this.all[this.index];
    })

    this.newsService.getAllNews().subscribe(response => {
      this.infoNews = response;
      this.showNews = this.infoNews.news.reverse();
    })

    if (this.first){
      setTimeout(() => {
        this.showSpinner = false;
      }, 2000)
      this.first =false;
    }
    

    setInterval(() => {
      this.changeNext();
    }, 5000)
  }




  routeAuthorPage(id: String){
    this.router.navigate(['home/author'], {queryParams: {id}})
  }

  changeNext(){
    this.animation = "w3-animate-right"
    if (this.index == this.all.length-1)
      this.index=0;
    else 
      this.index++;
    this.renderAuthors= [];
    this.renderAuthors = this.all[this.index];

    //this.showSpinner = true;
    /* setTimeout(() => {
      this.showSpinner = false;
    }, 1000) */
  }

  changePrev(){
    this.animation = "w3-animate-left"
    if (this.index == 0)
      this.index = this.all.length - 1;
    else 
      this.index--;
    this.renderAuthors= [];
    this.renderAuthors = this.all[this.index];

    //this.showSpinner = true;
    /* setTimeout(() => {
      this.showSpinner = false;
    }, 1000) */
  }

  routeNewsPage(id: String){
    this.router.navigate(['home/news'], {queryParams: {id}})
  }

  

}
