import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  dataAuth = {
    user: '',
    password: ''
  };
  loading = false;
  error = false;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null){
      this.router.navigate(['/']);
    }
  }

  login(): void{
    const data = {
      username: this.dataAuth.user,
      password: this.dataAuth.password
    };

    this.loading = true;
    this.authService.authUser(data)
      .subscribe(
        response => {
          this.loading = false;
          this.error = false;
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
          window.location.reload();
        },
        error => {
          this.loading = false;
          this.error = error.error;
        });
  }

}
