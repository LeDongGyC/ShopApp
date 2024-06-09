import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {Product} from "../../models/product/product";
import {Category} from "../../models/product/category";
import {ProductService} from "../../servies/product.service";
import {CategoryService} from "../../servies/category.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {CartService} from "../../servies/cart.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiResponse} from "../../responses/user.response";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: 'home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = []; // Dữ liệu động từ categoryService
  selectedCategoryId = 0;
  currentPage = 0;
  itemsPerPage = 12;
  pages: number[] = [];
  totalPages = 0;
  visiblePages: number[] = [];
  keyword = '';
  sort = 'default'

  constructor(private productService: ProductService,
              private cartService: CartService,
              private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCategories(0, 100);
    this.getProducts('', 0, this.currentPage, this.itemsPerPage, this.sort);
  }

  searchProducts() {
    this.currentPage = 0;
    this.itemsPerPage = 12;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage, this.sort);
  }

  getCategories(page: number, limit: number) {
    this.categoryService.getCategories(page, limit).subscribe({
      next: (apiResponse: ApiResponse) => {
        debugger;
        this.categories = apiResponse.data;
      },
      complete: () => {
        debugger;
      },
      error: (error: HttpErrorResponse) => {
        debugger;
        console.error(error?.error?.message ?? '');
      }
    });
  }


  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number, sort: string) {
    this.productService.getProducts(keyword, selectedCategoryId, page, limit, sort).subscribe({
      next: (response: any) => {
        debugger;
        response.data.products.forEach((product: Product) => {
          product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
        });
        debugger;
        this.products = response.data.products;
        this.totalPages = response.data.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage, this.sort);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2); // 2

    let startPage = Math.max(currentPage - halfVisiblePages, 0);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }

  onProductClick(productId: number) {
    debugger
    this.router.navigate(['/products', productId]);

  }


}
