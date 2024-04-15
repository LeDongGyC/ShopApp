import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RegisterComponent} from "../component/register/register.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    RegisterComponent,
  ]
})
export class AppComponent {
}
