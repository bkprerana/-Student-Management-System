// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface LoginData {
//   Email: string;
//   Password: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {

// private apiUrl = 'http://localhost:3000/api/auth/login';

//   constructor(private http: HttpClient) {}

//   loginUser(data: LoginData): Observable<any> {
//     return this.http.post(this.apiUrl, data);
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginData {

  Email: string;

  Password: string;

  // ✅ CAPTCHA ADDED
  captcha: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl =
    'http://localhost:3000/api/auth/login';

  constructor(
    private http: HttpClient
  ) {}

  loginUser(
    data: LoginData
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      data,
      {
        withCredentials: true
      }
    );
  }
}