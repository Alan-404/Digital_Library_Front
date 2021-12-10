import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { News } from '../Interfaces/News';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private request: HttpClient) { }

  getAllNews():Observable<{}>{
    return this.request.get<{}>(`http://localhost:5000/news`);
  }

  getNewsById(id: String):Observable<{}>{
    return this.request.get<{}>(`http://localhost:5000/news/getNewsById?newsId=${id}`);
  }

  insertNews(news: News):Observable<{}>{
    return this.request.post<{}>(`http://localhost:5000/news/insert`, news)
  }
}
