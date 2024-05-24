import {Component} from '@angular/core';
import {UserService} from "../../servies/user.service";
import {TokenService} from "../../servies/token.service";
import {Router, RouterModule} from "@angular/router";
import {UserResponse} from "../../responses/user/user.response";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  adminComponent: string = 'orders';
  userResponse?: UserResponse | null;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  logout() {
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  showAdminComponent(componentName: string): void {
    this.adminComponent = componentName;
  }

}
