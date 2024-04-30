import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {RegisterDto} from "../../dtos/user/register-dto";
import {UserService} from "../../servies/user.service";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  // private couponService = inject(CouponService);
  // private cartService = inject(CartService);
  // private productService = inject(ProductService);
  // private orderService = inject(OrderService);
  // private tokenService = inject(TokenService);
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  // @ViewChild('registerForm') registerForm!: NgForm;
  phoneNumber: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;
  showPassword: boolean = false;
  registerForm: FormGroup;

  constructor() {
    this.phoneNumber = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.isAccepted = true;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
    this.registerForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      retypePassword: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', [Validators.required]],
      address: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      isAccepted: [false],
    }, {validators: [this.checkPasswordsMatch('password', 'retypePassword'), this.checkAge('dateOfBirth')]});
  }

  ngOnInit(): void {
  }

  onPhoneChange() {
    console.log(`Phone typed: ${this.phoneNumber}`);
  }

  register() {
    // const registerData = this.rfRegister.value;
    const registerData: RegisterDto = {
      fullname: this.fullName,
      phone_number: this.phoneNumber,
      address: this.address,
      password: this.password,
      retype_password: this.retypePassword,
      date_of_birth: this.dateOfBirth,
      facebook_account_id: 0,
      google_account_id: 0,
      role_id: 1
    };
    console.log(registerData);
    this.userService.register(registerData).subscribe({
      next: (response: any) => {
        if (response) {
          this.router.navigate(['/login']).then(r => console.log('Navigate to login page'));
        } else {
          // do something
        }
      },
      complete: () => {
        // do something
      },
      error: (error: any) => {
        console.log(`Đăng ký không thành công: ${error.error}`);
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  checkPasswordsMatch(passwordKey: string, retypePasswordKey: string) {
    return (group: AbstractControl) => {
      const passwordControl = group.get(passwordKey)?.value;
      const retypePasswordControl = group.get(retypePasswordKey)?.value;
      if (passwordControl !== retypePasswordControl) {
        return {
          passwordNotMatch: true
        };
      }
      return null;
    };
  }

  checkAge(dateOfBirthKey: string) {
    return (group: AbstractControl) => {
      const dateOfBirth = group.get(dateOfBirthKey)?.value;
      if (dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 18) {
          return {invalidAge: true};
        }
      }
      return null;
    };
  }
}

