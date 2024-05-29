package com.shopapp.shopappbe.repositories;

import com.shopapp.shopappbe.models.Category;
import com.shopapp.shopappbe.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    String SEARCH_PRODUCTS = "SELECT p FROM Product p WHERE " +
            "(:categoryId IS NULL OR :categoryId = 0 OR p.category.id = :categoryId) " +
            "AND (:keyword IS NULL OR :keyword = '' OR p.name LIKE %:keyword% OR p.description LIKE %:keyword%)";

    boolean existsByName(String name);

    List<Product> findByCategory(Category category);

    Page<Product> findAll(Pageable pageable);//phân trang

    @Query(SEARCH_PRODUCTS)
    Page<Product> searchProducts
            (@Param("categoryId") Long categoryId,
             @Param("keyword") String keyword, Pageable pageable);

    @Query("select p from Product p left join fetch p.productImages where p.id = :productId")
    Optional<Product> getDetailProduct(Long productId);

    @Query("select p from Product p where p.id in :productIds")
    List<Product> findProductsByIds(@Param("productIds") List<Long> productIds);
}
