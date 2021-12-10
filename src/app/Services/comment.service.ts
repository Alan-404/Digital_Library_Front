import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../Interfaces/Comment';
const headerOption = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `Bearer ${localStorage.getItem('key')}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  insertComment(comment: Comment):Observable<{}>{
    return this.http.post<{}>(`http://localhost:5000/comment/add`,comment,headerOption);
  }


  getAllCommentIdObjId(id:string):Observable<{}>{
    return this.http.get<{}>(`http://localhost:5000/comment/all?id=${id}`);
  }
}
