import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://127.0.0.1:8000/api/v1';

@Injectable()
export class AuthService {
    token = localStorage.getItem('token') || null;

    get isLoggedIn(): boolean{
        if (this.token === null) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }

    constructor(private router: Router, private http: HttpClient) {}

    authUser(data: any): Observable<any> {
        return this.http.post(`${baseUrl}/token-auth`, data);
    }

    logout(): void{
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        window.location.reload();
    }
}
