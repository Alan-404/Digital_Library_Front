import { Component, OnInit } from '@angular/core';
import { GetBookService } from 'src/app/Services/get-book.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private bookService: GetBookService, private route: ActivatedRoute) { }

  categoryId: string = '';

  infoPage: any = {category:{}, books: [], authorName: []};

  booksRender: any = [];

  index: number = 0;

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.categoryId= param.id
    })

    this.bookService.getBooksByCategoryId(this.categoryId).subscribe(response => {
      this.infoPage = response;
    })
  }

  showBook(){

  }

}
