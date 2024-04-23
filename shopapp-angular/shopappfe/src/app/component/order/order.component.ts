import {Component} from '@angular/core';
import {ProductService} from "../../servies/product.service";
import {Product} from "../../models/product/product";
import {CartService} from "../../servies/cart.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  cartItems: { product: Product, quantity: number }[] = [];
  couponCode = ''; // Mã giảm giá
  totalAmount = 0; // Tổng tiền

  constructor(private productService: ProductService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());
    this.productService.getProductsByIds(productIds).subscribe({
        next: (products) => {
          this.cartItems = productIds.map(productId => {
            const product = products.find(p => p.id === productId);
            if (product) {
              product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
              return {
                product,
                quantity: cart.get(productId)
              };
            }
          });
        },
        complete: () => {
          this.calculateTotal();
        },
        error: (error: any) => {
          console.error('Error fetching detail:', error);
        }
      }
    );
  }

  private calculateTotal() {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  applyCoupon(): void {
    // Viết mã xử lý áp dụng mã giảm giá ở đây
    // Cập nhật giá trị totalAmount dựa trên mã giảm giá nếu áp dụng
  }

}
