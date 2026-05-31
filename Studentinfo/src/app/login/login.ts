


import {
  Component,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { LoginService } from '../services/login-service';

import { HttpClient } from '@angular/common/http';
import {ChangeDetectorRef} from '@angular/core';

// import {
//   DomSanitizer,
//   SafeHtml
// } from '@angular/platform-browser';


@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './login.html',

  styleUrls: ['./login.css']
})

export class LoginComponent
implements OnInit {

  Email: string = '';

  Password: string = '';
  showPassword = false;

  // ✅ CAPTCHA

  currentCaptcha: string = '';
captchaUrl: string = '';

  // captchaUrl!: SafeResourceUrl;

  captchaInput: string = '';

  constructor(

    private loginService: LoginService,

    private router: Router,

    private http: HttpClient,
      private cdr: ChangeDetectorRef,
      
    // private sanitizer: DomSanitizer

  ) {}

  // ============================
  // INIT
  // ============================

ngOnInit(): void {

  this.refreshCaptcha();
}
  // ============================
  // LOAD CAPTCHA
  // ============================
loadCaptcha() {

  this.http.get<any>(

    'http://localhost:3000/api/captcha',

    {
      withCredentials: true
    }

  ).subscribe({

    next: (res) => {

      console.log(
        'CAPTCHA RESPONSE:',
        res
      );

      this.captchaUrl =
        res.image;

      this.currentCaptcha =
        res.text;

      // ✅ FORCE UI UPDATE
      this.cdr.detectChanges();
    },

    error: (err) => {

      console.log(
        'Captcha load failed ❌',
        err
      );
    }
  });
}
  // ============================
  // REFRESH CAPTCHA
  // ============================

refreshCaptcha() {

  this.captchaInput = '';

  this.loadCaptcha();
}

  // ============================
  // 🔊 SPEAK CAPTCHA
  // ============================

  speakCaptcha() {

    if (!this.currentCaptcha) {

      alert(
        'Captcha not loaded ❌'
      );

      return;
    }

    // ✅ STOP PREVIOUS SPEECH

    window.speechSynthesis.cancel();

    // ✅ SPEAK CAPTCHA

    const speech =

      new SpeechSynthesisUtterance(

        this.currentCaptcha
          .split('')
          .join(' ')
      );

    speech.rate = 0.8;

    speech.pitch = 1;

    speech.volume = 1;

    window.speechSynthesis.speak(
      speech
    );
  }

  // ============================
  // LOGIN
  // ============================

  login() {

    // ✅ VALIDATION

    if (
      !this.Email ||
      !this.Password
    ) {

      alert(
        'Please fill all fields ❌'
      );

      return;
    }

    // ✅ CAPTCHA CHECK

    if (!this.captchaInput) {

      alert(
        'Enter CAPTCHA ❌'
      );

      return;
    }

    // ============================
    // ADMIN LOGIN
    // ============================

    if (

      this.Email ===
      'admin@gmail.com'

      &&

      this.Password ===
      'admin123'

    ) {

      localStorage.setItem(
        'role',
        'admin'
      );

      localStorage.setItem(
        'email',
        this.Email
      );

      alert(
        'Admin Login ✅'
      );

      this.router.navigate([
        '/admin-dashboard'
      ]);

      return;
    }

    // ============================
    // NORMAL LOGIN
    // ============================

    this.loginService.loginUser({

      Email: this.Email,

      Password: this.Password,

      captcha: this.captchaInput

    }).subscribe({

      next: (res: any) => {

        // ✅ CLEAR OLD STORAGE

        localStorage.clear();

        // ✅ STORE USER

        localStorage.setItem(
          'user',
          JSON.stringify(res.user)
        );

        localStorage.setItem(
          'role',
          res.user.Role || 'student'
        );

        localStorage.setItem(
          'email',
          res.user.Email
        );

        localStorage.setItem(
          'name',
          res.user.Name
        );

        localStorage.setItem(
          'token',
          res.token
        );

        // ✅ SESSION TIME

        const now =
          new Date().getTime();

        localStorage.setItem(
          'loginTime',
          now.toString()
        );

        localStorage.setItem(
          'lastActivity',
          now.toString()
        );

        alert(
          'Login Successful ✅'
        );

        // ✅ NAVIGATE

        setTimeout(() => {

          const role =

            res.user.Role ||
            'student';

          if (role === 'admin') {

            this.router.navigate([
              '/admin-dashboard'
            ]);

          } else {

            this.router.navigate([
              '/dashboard'
            ]);
          }

        }, 100);
      },

      error: (err: any) => {

        alert(

          err?.error?.message ||

          'Login Failed ❌'
        );

        // ✅ REFRESH CAPTCHA

        this.refreshCaptcha();
      }
    });
  }

  // ============================
  // REGISTER
  // ============================

  goToRegister() {

    this.router.navigate([
      '/register'
    ]);
  }


// ============================
// FORGOT PASSWORD
// ============================

goToForgotPassword() {

  this.router.navigate([

    '/forgot-password'

  ]);
}
}