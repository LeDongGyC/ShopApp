import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {environment} from '../../../../environments/environment';
import {OrderResponse} from '../../../responses/order/order.response';
import {OrderService} from "../../../servies/order.service";
import {OrderDTO} from "../../../dtos/order/order-dto";


@Component({
  selector: 'app-detail-order-admin',
  templateUrl: './detail.order.admin.component.html',
  styleUrls: ['./detail.order.admin.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ]
})

export class DetailOrderAdminComponent implements OnInit{
  orderId:number = 0;
  orderResponse: OrderResponse = {
    id: 0, // Hoặc bất kỳ giá trị số nào bạn muốn
    user_id: 0,
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0,
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: [],

  };
  private orderService = inject(OrderService);
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    debugger
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (response: any) => {
        debugger;
        this.orderResponse.id = response.data.id;
        debugger;
        this.orderResponse.user_id = response.data.user_id;
        debugger;
        this.orderResponse.fullname = response.data.fullname;
        this.orderResponse.email = response.data.email;
        this.orderResponse.phone_number = response.data.phone_number;
        this.orderResponse.address = response.data.address;
        this.orderResponse.note = response.data.note;
        this.orderResponse.total_money = response.data.total_money;
        if (response.data.order_date) {
          this.orderResponse.order_date = new Date(
            response.data.order_date[0],
            response.data.order_date[1] - 1,
            response.data.order_date[2]
          );
        }
        this.orderResponse.order_details = response.data.order_details
          .map((order_detail:any) => {
            debugger;
            order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
            order_detail.number_of_products = order_detail.numberOfProducts
            //order_detail.total_money = order_detail.totalMoney
            return order_detail;
          });
        this.orderResponse.payment_method = response.data.payment_method;
        if (response.data.shipping_date) {
          this.orderResponse.shipping_date = new Date(
            response.data.shipping_date[0],
            response.data.shipping_date[1] - 1,
            response.data.shipping_date[2]
          );
        }
        this.orderResponse.shipping_method = response.data.shipping_method;
        this.orderResponse.status = response.data.status;
        debugger
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
      },
    });
  }

  saveOrder(): void {
    debugger
    this.orderService
      .updateOrder(this.orderId, new OrderDTO(this.orderResponse))
      .subscribe({
        next: (response: Object) => {
          debugger
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          // Handle the error
          debugger
          console.error('Error updating order:', error);
          this.router.navigate(['../'], { relativeTo: this.route });
        }
      });
  }
}
