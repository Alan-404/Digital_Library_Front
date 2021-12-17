import { Component, OnInit } from '@angular/core';
import { GetBookService } from 'src/app/Services/get-book.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private bookService: GetBookService, private router: Router, private storage: AngularFireStorage) { }

  showSpinner = false

  allBooks: any
  allCategoriesName: any
  allAuthorName: any

  loadBooks(){
    this.bookService.showAll().subscribe(response => {
      this.allBooks = response.books
      this.allCategoriesName = response.categories
      this.allAuthorName = response.authors
    })
  }
  ngOnInit(): void {
    this.loadBooks();
  }


  goEdit(id: string){
    this.router.navigate(['home/admin/edit-book'], {queryParams: {id}})
  }



  async deleteBook(id: string, imageLink: string, linkPdf: string){
    this.showSpinner = true
    var check = imageLink.split('firebase')
    if (check.length > 1){
      await this.storage.refFromURL(imageLink).delete();
    }

    check = linkPdf.split('firebase')
    if (check.length> 1){
      await this.storage.refFromURL(linkPdf).delete()
    }

    await this.bookService.deleteBook(id).subscribe(response => {
      if (response.success){
        this.loadBooks();
        this.showSpinner = false;
      }
    })
  }

}
