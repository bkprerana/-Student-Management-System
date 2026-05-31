import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentSubmitService {

  private apiUrl = 'http://localhost:3000/api/students/submit';

  constructor(private http: HttpClient) {}

  submitStudent(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}