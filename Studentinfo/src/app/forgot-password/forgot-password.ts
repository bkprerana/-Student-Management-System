// import { Component } from '@angular/core';

// import { CommonModule } from '@angular/common';

// import { FormsModule } from '@angular/forms';

// import { ForgotPasswordService }
// from '../services/forgot-password-service';


// @Component({

//   selector: 'app-forgot-password',

//   standalone: true,

//   imports: [
//     CommonModule,
//     FormsModule
//   ],

//   templateUrl: './forgot-password.html',

//   styleUrls: ['./forgot-password.css']
// })

// export class ForgotPassword {

//   email = '';

//   otp = '';

//   newPassword = '';

//   confirmPassword = '';

//   otpVerified = false;

//   message = '';


//   constructor(

//     private forgotService:
//     ForgotPasswordService

//   ) { }


//   // =========================
//   // SEND OTP
//   // =========================

//   sendOTP() {

//     this.forgotService.sendOTP(

//       this.email

//     ).subscribe({

//       next: (res: any) => {

//         alert(res.message);
//       },

//       error: (err) => {

//         alert(err.error.message);
//       }

//     });

//   }


//   // =========================
//   // VERIFY OTP
//   // =========================

//   verifyOTP() {

//     this.forgotService.verifyOTP(

//       this.email,

//       this.otp

//     ).subscribe({

//       next: (res: any) => {

//         alert(res.message);

//         this.otpVerified = true;
//       },

//       error: (err) => {

//         alert(err.error.message);
//       }

//     });

//   }


//   // =========================
//   // RESET PASSWORD
//   // =========================

//   resetPassword() {

//     // PASSWORD MATCH CHECK

//     if (this.newPassword !== this.confirmPassword) {

//       alert('Passwords do not match');

//       return;
//     }

//     this.forgotService.resetPassword(

//       this.email,

//       this.newPassword

//     ).subscribe({

//       next: (res: any) => {

//         alert(res.message);

//         this.email = '';

//         this.otp = '';

//         this.newPassword = '';

//         this.confirmPassword = '';

//         this.otpVerified = false;

//       },

//       error: (err) => {

//         alert(err.error.message);
//       }

//     });

//   }

// }



import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ForgotPasswordService } from '../services/forgot-password-service';

import { ChangeDetectorRef } from '@angular/core';




@Component({

  selector: 'app-forgot-password',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './forgot-password.html',

  styleUrls: ['./forgot-password.css']
})

export class ForgotPassword {

  email = '';

  otp = '';

  newPassword = '';

  confirmPassword = '';

  message = '';

  // ✅ STEP CONTROL

  currentStep = 1;


  constructor(

    private forgotService:
    ForgotPasswordService,

    private cdr: ChangeDetectorRef

  ) { }


  // =========================
  // SEND OTP
  // =========================

  sendOTP() {

    if (!this.email) {

      alert('Enter Email ❌');

      return;
    }

    this.forgotService.sendOTP(

      this.email

    ).subscribe({

      next: (res: any) => {

        alert(res.message);

        // ✅ SHOW OTP SECTION

        this.currentStep = 2;
        this.cdr.detectChanges();
      },

      error: (err) => {

        alert(
          err?.error?.message ||
          'Failed to send OTP ❌'
        );
      }

    });

  }


  // =========================
  // VERIFY OTP
  // =========================

  verifyOTP() {

    if (!this.otp) {

      alert('Enter OTP ❌');

      return;
    }

    this.forgotService.verifyOTP(

      this.email,

      this.otp

    ).subscribe({

      next: (res: any) => {

        alert(res.message);

        // ✅ SHOW PASSWORD SECTION

        this.currentStep = 3;
        this.cdr.detectChanges();
      },

      error: (err) => {

        alert(
          err?.error?.message ||
          'Invalid OTP ❌'
        );
      }

    });

  }


  // =========================
  // RESET PASSWORD
  // =========================

  resetPassword() {

    if (
      !this.newPassword ||
      !this.confirmPassword
    ) {

      alert(
        'Fill all password fields ❌'
      );

      return;
    }

    // ✅ PASSWORD MATCH CHECK

    if (
      this.newPassword !==
      this.confirmPassword
    ) {

      alert(
        'Passwords do not match ❌'
      );

      return;
    }

    this.forgotService.resetPassword(

      this.email,

      this.newPassword

    ).subscribe({

      next: (res: any) => {

        alert(res.message);

        // ✅ RESET FORM

        this.email = '';

        this.otp = '';

        this.newPassword = '';

        this.confirmPassword = '';

        // ✅ BACK TO STEP 1

        this.currentStep = 1;
        this.cdr.detectChanges();
      },

      error: (err) => {

        alert(
          err?.error?.message ||
          'Password reset failed ❌'
        );
      }

    });

  }

}