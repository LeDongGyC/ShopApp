import {Routes} from '@angular/router';

import {AdminComponent} from "./admin.component";
import {OrderAdminComponent} from "./order/order.admin.component";
import {ProductAdminComponent} from "./product/product.admin.component";
import {CategoryAdminComponent} from "./category/category.admin.component";
import {DetailOrderAdminComponent} from "./detail-order/detail.order.admin.component";
import {UpdateProductAdminComponent} from "./product/update/update.product.admin.component";
import {InsertProductAdminComponent} from "./product/insert/insert.product.admin.component";
import {UpdateCategoryAdminComponent} from "./category/update/update.category.admin.component";
import {InsertCategoryAdminComponent} from "./category/insert/insert.category.admin.component";


//import { OrderAdminComponent } from './components/admin/order/order.admin.component';


export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'orders',
        component: OrderAdminComponent
      },
      {
        path: 'products',
        component: ProductAdminComponent
      },
      {
        path: 'categories',
        component: CategoryAdminComponent
      },
      //sub path
      {
        path: 'orders/:id',
        component: DetailOrderAdminComponent
      },
      {
        path: 'products/update/:id',
        component: UpdateProductAdminComponent
      },
      {
        path: 'products/insert',
        component: InsertProductAdminComponent
      },
      //categories
      {
        path: 'categories/update/:id',
        component: UpdateCategoryAdminComponent
      },
      {
        path: 'categories/insert',
        component: InsertCategoryAdminComponent
      },
    ]
  }
];

