// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly users = [
        { accountId: 'student', password: 'student', role: 'student' },
        { accountId: 'reads', password: 'reads', role: 'reads' },
        { accountId: 'faculty', password: 'faculty', role: 'faculty' },
        { accountId: 'oic', password: 'oic', role: 'oic' }
    ];


    constructor(private router: Router) {}

    login(accountId: string, password: string): boolean {
        const user = this.users.find(u => u.accountId === accountId && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            switch (user.role) {
            case 'student':
                this.router.navigate(['/dashboard/student']);
                break;
            case 'reads':
                this.router.navigate(['/dashboard/reads']);
                break;
            case 'faculty':
                this.router.navigate(['/dashboard/faculty']);
                break;
            case 'oic':
                this.router.navigate(['/dashboard/oic']);
                break;
            default:
                this.router.navigate(['/dashboard']);
            }
            return true;
        } else {
            return false;
        }
    }

    logout(): void {
        localStorage.removeItem('isLoggedIn');
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('isLoggedIn') === 'true';
    }
}
