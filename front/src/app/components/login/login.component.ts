import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  error = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null){
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.loginForm.controls;
  }

  login(): void{
    this.submitted = true;
    const data = {
      username: this.loginForm.value.user,
      password: this.loginForm.value.password
    };
    if (!this.loginForm.invalid) {
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
}
