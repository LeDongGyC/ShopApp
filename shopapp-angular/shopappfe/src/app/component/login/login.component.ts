import {Component, OnInit, ViewChild} from '@angular/core';
import {Role} from "../../models/role";
import {UserService} from "../../servies/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../../servies/token.service";
import {RoleService} from "../../servies/role.service";
import {LoginResponse} from "../../responses/user/login-response";
import {FormsModule, NgForm} from "@angular/forms";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {CommonModule} from "@angular/common";
import {LoginDto} from "../../dtos/user/login-dto";
import {UserResponse} from "../../responses/user/user.response";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber = '0337355842';
  password = '123456';
  showPassword: boolean = false;

  roles: Role[] = []; // Mảng roles
  rememberMe: boolean = true;
  selectedRole: Role | undefined; // Biến để lưu giá trị được chọn từ dropdown
  userResponse?: UserResponse

  onPhoneNumberChange() {
    console.log(`Phone typed: ${this.phoneNumber}`);
    //how to validate ? phone must be at least 6 characters
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService,
    // private cartService: CartService
  ) {
  }

  ngOnInit() {
    // Gọi API lấy danh sách roles và lưu vào biến roles
    debugger
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => { // Sử dụng kiểu Role[]
        debugger
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        debugger
        console.error('Error getting roles:', error);
      }
    });
  }

  login() {
    const message = `phone: ${this.phoneNumber}` +
      `password: ${this.password}`;

    const loginDTO: LoginDto = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    };
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger;
        const {token} = response;
        if (this.rememberMe) {
          this.tokenService.setToken(token);
          this.userService.getUserDetail(token).subscribe({
            next: (response: any) => {
              debugger
              this.userResponse = {
                ...response,
                date_of_birth: new Date(response.date_of_birth),
              };
              this.userService.saveUserResponseToLocalStorage(this.userResponse);
              if (this.userResponse?.role.name == 'admin') {
                this.router.navigate(['/admin']).then(r => console.log('Navigate to admin page'));
              } else if (this.userResponse?.role.name == 'user') {
                this.router.navigate(['/']).then(r => console.log('Navigate to home page'));
              }

            },
            complete: () => {
              // this.cartService.refreshCart();
              debugger;
            },
            error: (error: any) => {
              debugger;
              alert(error.error.message);
            }
          })
        }
        this.userService.getUserDetail(token).subscribe({
          next: (response: any) => {
            debugger
            this.userResponse = {
              ...response,
              date_of_birth: new Date(response.date_of_birth),
              // id: response.id,
              // fullname: response.fullname,
              // phone_number: response.phone_number,
              // address: response.address,
              // is_active: response.is_active,
              // date_of_birth: new Date(response.date_of_birth),
              // facebook_account_id: response.facebook_account_id,
              // google_account_id: response.google_account_id,
              // role: response.role,
            };
            this.userService.saveUserResponseToLocalStorage(this.userResponse);
            this.router.navigate(['/']).then(r => console.log('Navigate to home page'));
          },
          complete: () => {
            debugger;
          },
          error: (error: any) => {
            debugger;
            alert(error.error.message);
          }
        });
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  createAccount() {
    debugger
    this.router.navigate(['/register']);
  }
}
