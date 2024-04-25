import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RegisterComponent} from "../component/register/register.component";
import {LoginComponent} from "../component/login/login.component";
import {HomeComponent} from "../component/home/home.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
  ]
})
export class AppComponent {
}
