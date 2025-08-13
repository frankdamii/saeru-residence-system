import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('saeru_token', response.token);
        localStorage.setItem('saeru_user', JSON.stringify(response.user));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('saeru_token');
    localStorage.removeItem('saeru_user');
  }

  getToken(): string | null { return localStorage.getItem('saeru_token'); }
  isLoggedIn(): boolean { return !!this.getToken(); }

  getUserRole(): string | null {
    const user = localStorage.getItem('saeru_user');
    if (user) {
      return JSON.parse(user).role;
    }
    return null;
  }
}
