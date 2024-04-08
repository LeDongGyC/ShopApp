package com.shopapp.shopappbe.services;

import com.shopapp.shopappbe.dtos.ProductDTO;
import com.shopapp.shopappbe.dtos.ProductImageDTO;
import com.shopapp.shopappbe.models.Product;
import com.shopapp.shopappbe.models.ProductImage;
import com.shopapp.shopappbe.responses.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IProductService {
    Product createProduct(ProductDTO productDTO) throws Exception;

    Product getProductById(long id) throws Exception;

    Page<ProductResponse> getAllProducts(PageRequest pageRequest);

    Page<ProductResponse> getAllProducts(String keyword, Long categoryId, PageRequest pageRequest);

    Product updateProduct(long id, ProductDTO productDTO) throws Exception;

    void deleteProduct(long id);

    boolean existsByName(String name);

    ProductImage createProductImage(
            Long productId,
            ProductImageDTO productImageDTO) throws Exception;

    List<Product> findProductsByIds(List<Long> productIds);

}

