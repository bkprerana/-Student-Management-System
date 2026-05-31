

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentListService {

  // =========================
  // ✅ API URL
  // =========================

  private apiUrl =
    'http://localhost:3000/api/students';

  constructor(
    private http: HttpClient
  ) {}

  // =========================
  // ✅ GET STUDENT BY ID
  // =========================

  getStudentById(
    id: number
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/${id}`
    );
  }

  // =========================
  // ✅ GET ALL STUDENTS
  // =========================

  getAllStudents(): Observable<any> {

    return this.http.get(
      this.apiUrl
    );
  }
}