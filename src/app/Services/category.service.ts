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
  getAllCategories():Observable<any>{
    return this.request.get<any>(`http://localhost:5000/category`);
  }

  addCategory(category: Category):Observable<{}>{
    return this.request.post<{}>(`http://localhost:5000/category/insert`, category);
  }

  deleteCategory(id: string):Observable<any>{
    return this.request.delete<any>(`http://localhost:5000/category/delete?id=${id}`)
  }


  editInfo(id: string, name: string, description: string):Observable<any>{
    return this.request.put<any>(`http://localhost:5000/category/edit-info`, {id, name, description})
  }

  changeImage(id: string, imageLink: string):Observable<any>{
    return this.request.put<any>(`http://localhost:5000/category/change-image`, {id, imageLink})
  }
}
