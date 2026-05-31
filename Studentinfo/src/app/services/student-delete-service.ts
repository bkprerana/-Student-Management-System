import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentDeleteService {

  private apiUrl = 'http://localhost:3000/api/students';

  constructor(private http: HttpClient) {}

  // 🗑 DELETE STUDENT
  deleteStudent(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}