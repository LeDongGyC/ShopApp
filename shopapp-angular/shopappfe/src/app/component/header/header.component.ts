import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../servies/user.service";
import {UserResponse} from "../../responses/user/user.response";
import {TokenService} from "../../servies/token.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userResponse?: UserResponse | null;
  isPopoverOpen = false;
  activeNavItem: number = 0;
  private orderId = this.tokenService.getUserId();
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleItemClick(index: number): void {
    //alert(`Clicked on "${index}"`);
    if (index === 0) {
      debugger
      this.router.navigate(['/user-profile']);
    } else if (index === 1) {
      this.router.navigate(['/orders/user', this.orderId]);
    } else if (index === 2) {
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
      this.router.navigate(['/']);
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item
  }


  setActiveNavItem(index: number) {
    this.activeNavItem = index;
    // alert(this.activeNavItem);
  }

}
