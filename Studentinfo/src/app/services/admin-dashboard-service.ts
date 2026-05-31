import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private baseUrl = 'http://localhost:3000/admin';

  constructor(private http: HttpClient) {}

  updateStudent(data: any) {
    return this.http.put(`${this.baseUrl}/student`, data);
  }

  deleteStudent(roll: number) {
    return this.http.delete(`${this.baseUrl}/student/${roll}`);
  }

  addAcademic(data: any) {
    return this.http.post(`${this.baseUrl}/academic`, data);
  }

  addAttendance(data: any) {
    return this.http.post(`${this.baseUrl}/attendance`, data);
  }

  addFees(data: any) {
    return this.http.post(`${this.baseUrl}/fees`, data);
  }

  addNotification(data: any) {
    return this.http.post(`${this.baseUrl}/notification`, data);
  }
}