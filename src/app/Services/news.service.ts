import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { News } from '../Interfaces/News';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private request: HttpClient) { }

  getAllNews():Observable<any>{
    return this.request.get<any>(`http://localhost:5000/news`);
  }

  getNewsById(id: String):Observable<{}>{
    return this.request.get<{}>(`http://localhost:5000/news/getNewsById?newsId=${id}`);
  }

  insertNews(news: News):Observable<any>{
    return this.request.post<any>(`http://localhost:5000/news/insert`, news)
  }

  deleleNews(id: string):Observable<any>{
    return this.request.delete<any>(`http://localhost:5000/news/delete?id=${id}`)
  }
}
