import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentUpdateService {

  private apiUrl = 'http://localhost:3000/api/students';

  constructor(private http: HttpClient) {}

  // 🔍 GET BY ID
  getStudentById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // ✏️ UPDATE
  updateStudent(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}