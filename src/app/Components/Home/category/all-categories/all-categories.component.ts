import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { GetBookService } from 'src/app/Services/get-book.service';
import { Categories } from 'src/app/Interfaces/Categories';
@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService, private bookService: GetBookService) { }


  novelBooks: any = [];
  booksRender: any = [];
  index: Number = 1;
  pageNovels: number = 0;
  renderPage: any = [];


  categories: any = [];



  getAll: any = {allInfo: []};

  ngOnInit(): void {


    this.bookService.getAllInfo().subscribe(response=> {
      this.getAll = response;
    })

    

  }


  getPagination(event: any){
    event.preventDefault();
    //this.booksRender = [];
    
    this.booksRender = [];
    //this.booksRender.push(this.novelBooks[(event.target.text-1)*4])
    /* for (var i = 0; i < 4; i++) {
      if (!this.novelBooks[(event.target.text-1)*4 + i])
        break;
      this.booksRender.push(this.novelBooks[(event.target.text-1)*4 + i]);
    } */
  }

}
