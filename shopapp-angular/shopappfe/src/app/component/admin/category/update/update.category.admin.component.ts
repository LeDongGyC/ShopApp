import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Category} from "../../../../models/product/category";
import {CategoryService} from "../../../../servies/category.service";
import {UpdateCategoryDto} from "../../../../dtos/category/update-category-dto";

@Component({
  selector: 'app-detail.category.admin',
  templateUrl: './update.category.admin.component.html',
  styleUrls: ['./update.category.admin.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ]
})

export class UpdateCategoryAdminComponent implements OnInit {
  categoryId: number;
  updatedCategory: Category;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.categoryId = 0;
    this.updatedCategory = {} as Category;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      debugger
      this.categoryId = Number(params.get('id'));
      this.getCategoryDetails();
    });

  }

  getCategoryDetails(): void {
    this.categoryService.getDetailCategory(this.categoryId).subscribe({
      next: (category: Category) => {
        this.updatedCategory = {...category};
      },
      complete: () => {

      },
      error: (error: any) => {

      }
    });
  }

  updateCategory() {
    // Implement your update logic here
    const updateCategoryDTO: UpdateCategoryDto = {
      name: this.updatedCategory.name,
    };
    this.categoryService.updateCategory(this.updatedCategory.id, updateCategoryDTO).subscribe({
      next: (response: any) => {
        debugger
      },
      complete: () => {
        debugger;
        this.router.navigate(['/admin/categories']);
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching categorys:', error);
      }
    });
  }
}
