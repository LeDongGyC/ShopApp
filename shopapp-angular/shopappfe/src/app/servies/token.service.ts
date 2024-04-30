import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'access-token';
  localStorage?: Storage;
  private jwtHelperService = new JwtHelperService();

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
  }


  getToken(): string {
    return this.localStorage?.getItem(this.TOKEN_KEY) ?? '';
  }

  setToken(token: string): void {
    this.localStorage?.setItem(this.TOKEN_KEY, token);
  }

  getUserId(): number {
    let userObject = this.jwtHelperService.decodeToken(this.getToken() ?? '');
    return "userId" in userObject ? parseInt(userObject["userId"]) : 0;
  }

  removeToken(): void {
    this.localStorage?.removeItem(this.TOKEN_KEY);
  }

  isTokenExpired(): boolean {
    if (this.getToken() == null || this.getToken() == '') {
      return false;
    }
    return this.jwtHelperService.isTokenExpired(this.getToken());
  }
}
