import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterData {
  Name: string;
  Email: string;
  Password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

private apiUrl = 'http://localhost:3000/api/auth/register';

  constructor(private http: HttpClient) {}

  registerUser(data: RegisterData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}