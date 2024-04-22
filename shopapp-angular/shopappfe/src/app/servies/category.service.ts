import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiGetCategories = `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiGetCategories);
  }

}
