import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'https://ang-dnd.fundsforngospremium.com/api/UserManagement/AutheticateUser';

  constructor(private http: HttpClient) {}

  // API call
  login(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  // cookie check
  isLoggedIn(): boolean {
    return document.cookie.includes('user_Auth');
  }

  // set cookie
  setSession() {
    document.cookie = 'user_Auth=true; path=/';
  }

  // logout
  logout() {
    document.cookie = 'user_Auth=; Max-Age=0; path=/';
  }
}
