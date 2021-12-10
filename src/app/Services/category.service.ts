import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../Interfaces/Categories';
import { Category } from '../Interfaces/Category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private request: HttpClient) { }
  categoryInfo: any = {categoryId:''}
  getAllCategories():Observable<Categories>{
    return this.request.get<Categories>(`http://localhost:5000/category`);
  }

  addCategory(category: Category):Observable<{}>{
    return this.request.post<{}>(`http://localhost:5000/category/insert`, category);
  }
}
