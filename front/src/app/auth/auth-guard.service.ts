import { Router, CanActivate} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()


export class AuthGuardService implements CanActivate {
    token = localStorage.getItem('token') || null;

    constructor(public router: Router) {}

    canActivate(): boolean {
        if (this.token === null) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }

}
