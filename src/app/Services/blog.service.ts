import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../Interfaces/Blog';
const headerOption = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `Bearer ${localStorage.getItem('key')}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private request: HttpClient) { }


  getAllBlogs():Observable<any>{
    return this.request.get<any>(`http://localhost:5000/blog`)
  }

  getBlogById(id: string):Observable<{}>{
    return this.request.get<{}>(`http://localhost:5000/blog/getBlog?blogId=${id}`);
  }


  addBlog(blog: Blog):Observable<{}>{
    return this.request.post<{}>(`http://localhost:5000/blog/insert`,blog, headerOption);
  }

  allBlogsByToken():Observable<any>{
    return this.request.get<any>(`http://localhost:5000/blog/token`, headerOption)
  }

}
