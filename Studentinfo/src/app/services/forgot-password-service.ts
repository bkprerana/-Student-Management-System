// import { Injectable } from '@angular/core';

// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })

// export class ForgotPasswordService {

//   baseUrl =
//   'http://localhost:3000/api/forgot-password';

//   constructor(

//     private http: HttpClient

//   ) { }


//   // =====================
//   // SEND OTP
//   // =====================
//   sendOTP(data:any){

//     return this.http.post(

//       `${this.baseUrl}/send-otp`,
//       data
//     );
//   }


//   // =====================
//   // VERIFY OTP
//   // =====================
//   verifyOTP(data:any){

//     return this.http.post(

//       `${this.baseUrl}/verify-otp`,
//       data
//     );
//   }


//   // =====================
//   // RESET PASSWORD
//   // =====================
//   resetPassword(data:any){

//     return this.http.post(

//       `${this.baseUrl}/reset-password`,
//       data
//     );
//   }
// }




import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ForgotPasswordService {

  constructor(
    private http: HttpClient
  ) { }


  // SEND OTP
  sendOTP(email: string) {

    return this.http.post(

      'http://localhost:3000/api/forgot-password/send-otp',

      { email }
    );
  }


  // VERIFY OTP
  verifyOTP(
    email: string,
    otp: string
  ) {

    return this.http.post(

      'http://localhost:3000/api/forgot-password/verify-otp',

      {
        email,
        otp
      }
    );
  }


  // RESET PASSWORD
  resetPassword(
    email: string,
    newPassword: string
  ) {

    return this.http.post(

      'http://localhost:3000/api/forgot-password/reset-password',

      {
        email,
        newPassword
      }
    );
  }

}