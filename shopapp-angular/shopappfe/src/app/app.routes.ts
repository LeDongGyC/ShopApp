import {Routes} from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {DetailProductComponent} from "./component/detail-product/detail-product.component";
import {OrderComponent} from "./component/order/order.component";
import {OrderDetailComponent} from "./component/order-confirm/order-confirm.component";
import {UserProfileComponent} from "./component/user-profile/user-profile.component";
import {AuthGuardFn} from "./guards/auth.guard";
import {AdminComponent} from "./component/admin/admin.component";
import {AdminGuardFn} from "./guards/admin.guard";

//import { OrderAdminComponent } from './components/admin/order/order.admin.component';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'products/:id', component: DetailProductComponent},
  // {path: 'orders', component: OrderComponent},
  // {path: 'user-profile', component: UserProfileComponent},
  {path: 'orders', component: OrderComponent, canActivate: [AuthGuardFn]},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardFn]},
  {path: 'orders/:id', component: OrderDetailComponent},
  //Admin
  {
    path: 'admin',
    component: AdminComponent,
    canActivate:[AdminGuardFn]
  },
];
