// import { Injectable } from '@angular/core';

// import { HttpClient } from '@angular/common/http';

// import { Observable } from 'rxjs';

// export interface DashboardData {

//   student: any;

//   academic: any[];

//   attendance: any;

//   fees: any;

//   notifications: any[];

//   gpa: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class DashboardService {

//   private apiUrl =
//     'http://localhost:3000/api/dashboard';

//   constructor(private http: HttpClient) {}

//   // ============================
//   // GET DASHBOARD
//   // ============================

//   getDashboardData():
//   Observable<DashboardData> {

//     const email =
//       localStorage.getItem('email');

//     const token =
//       localStorage.getItem('token');

//     return this.http.get<DashboardData>(

//       `${this.apiUrl}?email=${email}`,

//       {
//         headers: {
//           Authorization: token || ''
//         }
//       }
//     );
//   }

//   // ============================
//   // SEMESTER DATA
//   // ============================

//   getSemesterData(
//     roll: number,
//     semester: number
//   ) {

//     const token =
//       localStorage.getItem('token');

//     return this.http.get(

//       `http://localhost:3000/api/dashboard/${roll}/${semester}`,

//       {
//         headers: {
//           Authorization: token || ''
//         }
//       }
//     );
//   }
// }




import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  private apiUrl =
    'http://localhost:3000/api/dashboard';

  constructor(
    private http: HttpClient
  ) { }

  // ============================
  // MAIN DASHBOARD
  // ============================

  getDashboardData(): Observable<any> {

    const email =
      localStorage.getItem('email');

    const token =
      localStorage.getItem('token');

    console.log("EMAIL:", email);

    console.log("TOKEN:", token);

    const headers =
      new HttpHeaders({

        Authorization:
          `Bearer ${token}`
      });

    return this.http.get(

      `${this.apiUrl}?email=${email}`,

      { headers }
    );
  }

  // ============================
  // SEMESTER DATA
  // ============================

  getSemesterData(
    roll: number,
    semester: number
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/semester/${roll}/${semester}`
    );
  }
}