import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../models/product/product";
import {UpdateProductDTO} from "../dtos/product/update-product-dto";
import {InsertProductDTO} from "../dtos/product/insert-product-dto";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiBaseUrl = environment.apiBaseUrl;
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

  getDetailProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiGetProducts}/${productId}`);
  }

  getProductsByIds(productsIds: number[]): Observable<Product[]> {
    const params = new HttpParams().set('ids', productsIds.join(','));
    return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`, {params});
  }

  deleteProduct(productId: number): Observable<string> {
    debugger
    return this.http.delete<string>(`${this.apiBaseUrl}/products/${productId}`);
  }

  updateProduct(productId: number, updatedProduct: UpdateProductDTO): Observable<UpdateProductDTO> {
    return this.http.put<Product>(`${this.apiBaseUrl}/products/${productId}`, updatedProduct);
  }

  insertProduct(insertProductDTO: InsertProductDTO): Observable<any> {
    // Add a new product
    return this.http.post(`${this.apiBaseUrl}/products`, insertProductDTO);
  }

  uploadImages(productId: number, files: File[]): Observable<any> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    // Upload images for the specified product id
    return this.http.post(`${this.apiBaseUrl}/products/uploads/${productId}`, formData);
  }

  deleteProductImage(id: number): Observable<any> {
    debugger
    return this.http.delete<string>(`${this.apiBaseUrl}/product_images/${id}`);
  }

}
