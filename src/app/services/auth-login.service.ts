import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  private controllerUrl = `${environment.apiUrl}/auth`;

  constructor(private httpClient: HttpClient,private localStorage:LocalStorageService,private jwtHelperService:JwtHelperService) { }

  checkLogin(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.controllerUrl}/login`, user);
  }

  get isAuthenticated():boolean{
    //TODO: localstoragedan token al
    //token yoksa false
    //varsa sürei geçmişse yine false
    let token = this.localStorage.get("token");
    if(!token) return false;
    if(this.jwtHelperService.isTokenExpired()) return false;
    return true;
  }

  get jwtToken():string | null {
    return this.localStorage.get("token");
  }
}
