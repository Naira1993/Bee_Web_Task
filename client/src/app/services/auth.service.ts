import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators'
import { User } from '../shared/interface';



@Injectable({ providedIn: 'root' })
export class AuthService {

    //    islogin: false;
    token = null;

    constructor(private http: HttpClient) { }

    login(user: { email: string, password: string }): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(`/api/auth/login`, user).pipe(tap(
            ({ token }) => {
                localStorage.setItem('auth-token', token);
                localStorage.setItem('email', user.email);
                this.setToken(token)
            }
        ))
    }

    signup(user: User, image?: File): Observable<any> {

        const fd = new FormData();
        if (image) {
            fd.append('image', image, image.name)
        };
        fd.append('fullName', user.fullName);
        fd.append('email', user.email);
        fd.append('password', user.password);
        return this.http.post(`/api/auth/signup`, fd).pipe(tap(
            ({ token }) => {
                localStorage.setItem('auth-token', token);
                localStorage.setItem('email', user.email);
                this.setToken(token)
            }
        ))
    }

    getUserByEmail(email: string): Observable<any> {
        return this.http.get(`/api/auth/${email}`)
    }

    update(email: string, user, image?: File):  Observable<any>  {
        const fd = new FormData();
        if (image) {
            fd.append('image', image, image.name)
        };
        fd.append('fullName', user.fullName);
        return this.http.patch(`/api/auth/${email}`, fd)
    }

    setToken(token: string) {
        this.token = token
    }

    getToken(): string {
        return this.token
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    logout() {
        this.setToken(null);
        localStorage.clear()
    }
}