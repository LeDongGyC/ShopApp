import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../models/product/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiGetProducts = `${environment.apiBaseUrl}/products`;

  // @ts-ignore
  constructor(private http: HttpClient) {
  }

  getProducts(keyword: string, categoryId: number, page: number, limit: number): Observable<Product[]> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('category_id', categoryId.toString())
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<Product[]>(this.apiGetProducts, {params});
  }

  // getDetailProduct(productId: number): Observable<Product> {
  //   return this.http.get<Product>(`${this.apiGetProducts}/${productId}`);
  // }
  getDetailProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiGetProducts}/${productId}`);
  }
  getProductsByIds(productsIds: number[]): Observable<Product[]> {
    const params = new HttpParams().set('ids', productsIds.join(','));
    return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`, {params});
  }

}
