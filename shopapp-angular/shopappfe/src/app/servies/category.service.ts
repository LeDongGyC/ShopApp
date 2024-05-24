import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Category} from "../models/product/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiGetCategories = `${environment.apiBaseUrl}/categories`;
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  getCategories(page: number, limit: number): Observable<Category[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/categories`, {params});
  }

  getDetailCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiBaseUrl}/categories/${id}`);
  }

  deleteCategory(id: number): Observable<string> {
    debugger
    return this.http.delete<string>(`${this.apiBaseUrl}/categories/${id}`);
  }

  // updateCategory(id: number, updatedCategory: UpdateCategoryDTO): Observable<UpdateCategoryDTO> {
  //   return this.http.put<Category>(`${this.apiBaseUrl}/categories/${id}`, updatedCategory);
  // }
  //
  // insertCategory(insertCategoryDTO: InsertCategoryDTO): Observable<any> {
  //   // Add a new category
  //   return this.http.post(`${this.apiBaseUrl}/categories`, insertCategoryDTO);
  // }


}
