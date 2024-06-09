import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {ApiResponse} from "../responses/user.response";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiGetRoles  = `${environment.apiBaseUrl}/roles`;

  constructor(private http: HttpClient) { }
  getRoles():Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiGetRoles);
  }
}
