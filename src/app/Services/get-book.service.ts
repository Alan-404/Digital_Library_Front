import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Books } from '../Interfaces/Books';
import { Show_Book } from '../Interfaces/Show-Book';
import { Book } from '../Interfaces/Book';
@Injectable({
  providedIn: 'root'
})
export class GetBookService {

  constructor(private request: HttpClient) { }
  getBooks(categoryName: String):Observable<Books>{
    return this.request.get<Books>(`http://localhost:5000/book/getBooks?categoryName=${categoryName}`);
  }

  getInfoBook(id: String):Observable<Show_Book>{
    return this.request.get<Show_Book>(`http://localhost:5000/book/infoBook?id=${id}`);
  }

  getBooksByAuthorId(id: String):Observable<{}>{
    return this.request.get<{}>(`http://localhost:5000/book/getBooksAuthor?authorId=${id}`);
  }

  getBooksByCategoryId(categoryId: String):Observable<any>{
    return this.request.get<any>(`http://localhost:5000/book/getBooks?categoryId=${categoryId}`);
  }

  getAllInfo():Observable<Array<{}>>{
    return this.request.get<Array<{}>>('http://localhost:5000/book/allInfoCategories');
  }

  insertBook(book:Book):Observable<{}>{
    return this.request.post(`http://localhost:5000/book/insert`,book);
  }

  getAllBooks():Observable<any>{
    return this.request.get<any>(`http://localhost:5000/book/getAll`);
  }


  showAll():Observable<any>{
    return this.request.get<any>(`http://localhost:5000/book/show-all`)
  }


  changeImage(id: string, imageLink: string):Observable<any>{
    return this.request.put<any>(`http://localhost:5000/book/change-image`, {id, imageLink})
  }

  editInfo(book: any):Observable<any>{
    return this.request.put<any>(`http://localhost:5000/book/edit-info`, book)
  }

  deleteBook(id: string):Observable<any>{
    return this.request.delete<any>(`http://localhost:5000/book/delete?id=${id}`)
  }

}
