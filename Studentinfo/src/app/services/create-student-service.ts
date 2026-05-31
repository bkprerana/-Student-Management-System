import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Optional (but good practice)
export interface Student {
  RollNumber: number;
  StudentName: string;
  Semester: number;
  Class: string;
  Address: string;
  JoiningDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateStudentService {
  getStudentById(rollNumber: number) {
    throw new Error('Method not implemented.');
  }

  // ✅ Backend base URL
  private apiUrl = 'http://localhost:3000/api/students';

  constructor(private http: HttpClient) {}

  // ✅ API call
  addStudent(student: Student): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, student);
  }
}