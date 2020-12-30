import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'front';
  isLogged: boolean;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn;
  }

  logout(): void{
    this.authService.logout();
  }

}
