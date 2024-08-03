import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(details: any) {
    let url = 'http://localhost:8080/api/auth/login';
    return this.http.post(url, details, { responseType: 'text' });
  }

  register(data: any) {
    console.log('Data:', data);
    let url = "http://localhost:8080/api/auth/register";
    return this.http.post(url, data, { responseType: 'text' });
  }

  Otp(otp: any) {
    let url = "http://localhost:8080/api/auth/verify-otp";
    return this.http.post(url, otp, { responseType: 'text' });
  }

  isLoggedIn()
  {
    return localStorage.getItem('authToken');
  }
}