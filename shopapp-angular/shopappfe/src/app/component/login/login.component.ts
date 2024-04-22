import {Component, ViewChild} from '@angular/core';
import {Role} from "../../models/role";
import {UserService} from "../../servies/user.service";
import {Router} from "@angular/router";
import {TokenService} from "../../servies/token.service";
import {RoleService} from "../../servies/role.service";
import {LoginDto} from "../../dtos/user/login-dto";
import {LoginResponse} from "../../responses/user/login-response";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber = '0337355842';
  password = '123456';
  roles: Role[] = [];
  selectedRole: Role | undefined;
  rememberMe = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService,
    private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: any) => {
        console.error('Error getting roles:', error);
      }
    });
  }

  onPhoneNumberChange() {
    console.log(`Phone: ${this.phoneNumber}`);
  }

  login() {
    const message = `phone: ${this.phoneNumber}` + `password: ${this.password}`;
    const loginDto: LoginDto = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    };
    this.userService.login(loginDto).subscribe({
      next: (response: LoginResponse) => {
        const {token} = response;
        this.tokenService.setToken(token);
        if (this.rememberMe) {
          this.tokenService.setToken(token);
        }
      },
      complete: () => {
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

}
