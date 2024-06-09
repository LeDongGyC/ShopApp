import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ApiResponse} from "../responses/user.response";
import {UpdateCategoryDto} from "../dtos/category/update-category-dto";
import {InsertCategoryDto} from "../dtos/category/insert-category-dto";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  getCategories(page: number, limit: number): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<ApiResponse>(`${environment.apiBaseUrl}/categories`, {params});
  }

  getDetailCategory(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/categories/${id}`);
  }

  deleteCategory(id: number): Observable<ApiResponse> {
    debugger
    return this.http.delete<ApiResponse>(`${this.apiBaseUrl}/categories/${id}`);
  }

  updateCategory(id: number, updatedCategory: UpdateCategoryDto): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiBaseUrl}/categories/${id}`, updatedCategory);
  }

  insertCategory(insertCategoryDTO: InsertCategoryDto): Observable<ApiResponse> {
    // Add a new category
    return this.http.post<ApiResponse>(`${this.apiBaseUrl}/categories`, insertCategoryDTO);
  }

}
