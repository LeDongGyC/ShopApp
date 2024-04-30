import {Inject, Injectable} from '@angular/core';
import {ProductService} from "./product.service";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Map<number, number> = new Map();// Dùng Map để lưu trữ giỏ hàng, key là id sản phẩm, value là số lượng
  localStorage?: Storage;

  constructor(private productService: ProductService,
              @Inject(DOCUMENT) private document: Document) {
    // Lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo service
    this.localStorage = document.defaultView?.localStorage;
    // Lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo service
    this.refreshCart();
  }

  public refreshCart() {
    const storedCart = this.localStorage?.getItem(this.getCartKey());
    if (storedCart) {
      this.cart = new Map(JSON.parse(storedCart));
    } else {
      this.cart = new Map<number, number>();
    }
  }

  addToCart(productId: number, quantity: number = 1): void {
    if (this.cart.has(productId)) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên `quantity`
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào với số lượng là `quantity`
      this.cart.set(productId, quantity);
    }
    // Sau khi thay đổi giỏ hàng, lưu trữ nó vào localStorage
    this.saveCartToLocalStorage();
  }

  getCart(): Map<number, number> {
    return this.cart;
  }

  // Lưu trữ giỏ hàng vào localStorage
  private saveCartToLocalStorage(): void {
    this.localStorage?.setItem(this.getCartKey(), JSON.stringify(Array.from(this.cart.entries())));
  }

  private getCartKey(): string {
    const userResponseJSON = this.localStorage?.getItem('user');
    const userResponse = JSON.parse(userResponseJSON!);
    return `cart:${userResponse?.id ?? ''}`;

  }

  setCart(cart: Map<number, number>) {
    this.cart = cart ?? new Map<number, number>();
    this.saveCartToLocalStorage();
  }

  // Hàm xóa dữ liệu giỏ hàng và cập nhật Local Storage
  clearCart(): void {
    this.cart.clear(); // Xóa toàn bộ dữ liệu trong giỏ hàng
    this.saveCartToLocalStorage(); // Lưu giỏ hàng mới vào Local Storage (trống)
  }

}
