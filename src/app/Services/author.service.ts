import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../Interfaces/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAllAuthors():Observable<{}>{
    return this.http.get<{}>('http://localhost:5000/author');
  }

  getAuthorById(id: String):Observable<{}>{
    return this.http.get<{}>(`http://localhost:5000/author/getAuthor/${id}`);
  }

  insertAuthor(author: Author):Observable<{}>{
    return this.http.post(`http://localhost:5000/author/insert`, author);
  }

  deleteAuthor(id: string):Observable<{}>{
    return this.http.delete<{}>(`http://localhost:5000/author/delete/${id}`)
  }
  
}
