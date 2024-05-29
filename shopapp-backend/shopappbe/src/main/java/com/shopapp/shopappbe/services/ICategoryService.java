package com.shopapp.shopappbe.services;

import com.shopapp.shopappbe.dtos.CategoryDTO;
import com.shopapp.shopappbe.models.Category;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;

public interface ICategoryService {
    Category createCategory(CategoryDTO category);
    Category getCategoryById(long id);
    List<Category> getAllCategories();
    Category updateCategory(long categoryId, CategoryDTO category);
    Category deleteCategory(long id) throws ChangeSetPersister.NotFoundException;
}
