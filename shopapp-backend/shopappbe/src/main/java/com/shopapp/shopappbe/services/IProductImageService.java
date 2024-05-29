package com.shopapp.shopappbe.services;

import com.shopapp.shopappbe.models.ProductImage;

public interface IProductImageService {
    ProductImage deleteProductImage(Long id) throws Exception;
}
