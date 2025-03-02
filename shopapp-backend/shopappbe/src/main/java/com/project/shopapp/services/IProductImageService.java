package com.project.shopapp.services;

import com.project.shopapp.models.ProductImage;

public interface IProductImageService {
    ProductImage deleteProductImage(Long id) throws Exception;
}
