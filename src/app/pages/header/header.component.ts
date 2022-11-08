import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isLogin: boolean = Boolean(localStorage.getItem("isLogin"));
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.subscribeToIsLoggin();
  }

  login() {
      this.router.navigateByUrl('/login');
      this.userLogin();
  }

  logout(){
      this.router.navigateByUrl('/login');
      localStorage.clear();
      this.userLogout();
  }

  subscribeToIsLoggin() {
    this.localStorageService.isUserLoggedIn.subscribe((isLogin) => {
      this.isLogin = isLogin;
    });
  }

  userLogin() {
    this.localStorageService.login();
  }
  userLogout() {
    this.localStorageService.logout();
    // this.isLogin = false;
  }
}
