import {Component} from '@angular/core';
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: Product[] = [];
  categories: Category[] = []; // Dữ liệu động từ categoryService
  selectedCategoryId = 0;
  currentPage = 0;
  itemsPerPage = 12;
  pages: number[] = [];
  totalPages = 0;
  visiblePages: number[] = [];
  keyword = '';

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts('', 0, this.currentPage, this.itemsPerPage);
  }

  searchProducts() {
    this.currentPage = 0;
    this.itemsPerPage = 12;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
        next: (categories: Category[]) => {
          this.categories = categories;
        },
        complete: () => {
        },
        error: (error: any) => {
          console.error('Error fetching categories:', error);
        }
      }
    );
  }

  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
    this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe({
      next: (response: any) => {
        response.products.forEach((product: Product) => {
          product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
        });
        this.products = response.products;
        this.totalPages = response.totalPages;
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
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
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

  onProductClick(id: number) {
  }

}
