import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../services/register-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  Name: string = '';
  Email: string = '';
  Password: string = '';
  confirmPassword: string = '';

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  register() {

    // ✅ Validation
    if (!this.Name || !this.Email || !this.Password || !this.confirmPassword) {
      alert("All fields are required ❌");
      return;
    }

    if (this.Password !== this.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    const body = {
      Name: this.Name,
      Email: this.Email,
      Password: this.Password
    };

 this.registerService.registerUser(body).subscribe({
  next: (res: any) => {
    console.log("RESPONSE:", res);

    if (res?.success) {
      alert("Registered Successfully ✅");

      // ✅ REDIRECT WORKS NOW
      this.router.navigate(['/login']);
    } else {
      alert(res?.message || "Registration Failed ❌");
    }
  },
  error: (err) => {
    console.error("ERROR:", err);
    alert(err?.error?.message || "Registration Failed ❌");
  }
});
  }

  // ✅ Navigate to Login
  goToLogin() {
    this.router.navigate(['/']);
  }
}