import {Component} from '@angular/core';
import {ProductService} from "../../servies/product.service";
import {CartService} from "../../servies/cart.service";
import {Product} from "../../models/product/product";
import {environment} from "../../../environments/environment";
import {ProductImage} from "../../models/product/product.image";

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {
  product?: Product;
  productId = 0;
  currentImageIndex = 0;
  quantity = 1;

  constructor(private productService: ProductService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    // Lấy productId từ URL
    // const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    // this.cartService.clearCart();
    const idParam = 5; // fake tạm 1 giá trị
    // if (idParam !== null) {
    //   this.productId = +idParam;
    // }
    this.productId = +idParam;
    if (!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {
          // Lấy danh sách ảnh sản phẩm và thay đổi URL
          if (response.product_images && response.product_images.length > 0) {
            response.product_images.forEach((productImage: ProductImage) => {
              productImage.imageUrl = `${environment.apiBaseUrl}/products/images/${productImage.imageUrl}`;
            });
          }
          this.product = response;
          // Bắt đầu với ảnh đầu tiên
          this.showImage(0);
        },
        complete: () => {
        },
        error: (error: any) => {
          console.error('Error fetching detail:', error);
        }
      });
    } else {
      console.error('Invalid productId:', idParam);
    }
  }

  showImage(index: number): void {
    if (this.product && this.product.product_images &&
      this.product.product_images.length > 0) {
      // Đảm bảo index nằm trong khoảng hợp lệ
      if (index < 0) {
        index = 0;
      } else if (index >= this.product.product_images.length) {
        index = this.product.product_images.length - 1;
      }
      // Gán index hiện tại và cập nhật ảnh hiển thị
      this.currentImageIndex = index;
    }
  }

  thumbnailClick(index: number) {
    // Gọi khi một thumbnail được bấm
    this.currentImageIndex = index; // Cập nhật currentImageIndex
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.product.product_images.length;
    this.showImage(this.currentImageIndex);
  }

  previousImage(): void {
    this.showImage(this.currentImageIndex
      = (this.currentImageIndex - 1 + this.product.product_images.length) % this.product.product_images.length);
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product.id, this.quantity);
    } else {
      // Xử lý khi product là null
      console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.');
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  buyNow(): void {
    // Thực hiện xử lý khi người dùng muốn mua ngay
  }

}
