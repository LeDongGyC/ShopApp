import {Inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {HttpUtilService} from "./http-util.service";
import {Observable} from "rxjs";
import {LoginDto} from "../dtos/user/login-dto";
import {RegisterDto} from "../dtos/user/register-dto";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiConfig = {
    headers: this.httpUtilService.createHeaders()
  };
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;


  constructor(private http: HttpClient,
              private httpUtilService: HttpUtilService,
              @Inject(DOCUMENT) private document: Document
  ) {
  }

  register(registerDTO: RegisterDto): Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post(this.apiLogin, loginDto, this.apiConfig);
  }

}
