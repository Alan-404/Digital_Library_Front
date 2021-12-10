import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/Services/author.service';
import { GetBookService } from 'src/app/Services/get-book.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authorService: AuthorService, private bookService: GetBookService, private router: Router) { }

  animation: string = 'w3-animate-right';

  authorId: string = '';

  infoAuthor: any = {author: {}, success: false};

  infoBooks: any = {books: []};

  renderBook: any = [];

  numberOfRender: number = 4;

  allBooks: any = [];

  temp: any = [];

  index: number = 0;

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.authorId = param.id
    })

    this.authorService.getAuthorById(this.authorId).subscribe(response => {
      this.infoAuthor = response;
      if (!this.infoAuthor.success)
        this.router.navigate(['notFound']);
    })

    this.bookService.getBooksByAuthorId(this.authorId).subscribe(response => {
      this.infoBooks = response;
      for (var i = 0; i<this.infoBooks.books.length; ++i)
      {
        if (i%4==0)
        {
          if (i != 0){
            this.allBooks.push(this.temp);
          }
          this.temp = [];
        }
        this.temp.push(this.infoBooks.books[i]);
          
      }
      this.allBooks.push(this.temp);

      this.renderBook = this.allBooks[this.index];

      
    })

  }

  goBookPage(id: String){
    this.router.navigate(['home/book'], {queryParams: {id}})
  }

  changePage(event:any){
    event.preventDefault();
    this.renderBook = [];
    for (var i = (event.target.text-1)*4; i<(event.target.text-1)*4 + 4; ++i)
    {
      if (!this.infoBooks.books[i])
        break;
      this.renderBook.push(this.infoBooks.books[i]);
    }
  }

  nextPage(){
    this.animation = 'w3-animate-right';
    if(this.index == this.allBooks.length - 1)
      this.index = 0;
    else 
      this.index++;
    this.renderBook = this.allBooks[this.index];
  }

  prevPage(){
    this.animation ='w3-animate-left'
    if (this.index == 0)
      this.index = this.allBooks.length-1;
    else 
      this.index--;
    this.renderBook = this.allBooks[this.index];
  }

  
}
