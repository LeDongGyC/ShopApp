import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RegisterComponent} from "../component/register/register.component";
import {LoginComponent} from "../component/login/login.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    RegisterComponent,
    LoginComponent,
  ]
})
export class AppComponent {
}
