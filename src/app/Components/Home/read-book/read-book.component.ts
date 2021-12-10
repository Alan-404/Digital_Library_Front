import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { GetBookService } from 'src/app/Services/get-book.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.css']
})

export class ReadBookComponent implements OnInit {
  urlBook: string = '';

  myTrustUrl: any

  
  constructor(private bookService: GetBookService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { 
    
  }
  

  bookId: string = '';

  infoPage: any = {book: {}};

  


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bookId = params.id;
    })
    this.bookService.getInfoBook(this.bookId).subscribe(response => {
      console.log(response);
      this.infoPage = response;
      this.urlBook = this.infoPage.book.linkPdf;
      console.log(this.myTrustUrl);
    });
  }


  

}
