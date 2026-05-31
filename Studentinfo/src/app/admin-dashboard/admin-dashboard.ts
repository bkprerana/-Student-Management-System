// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AdminDashboardService } from '../services/admin-dashboard-service';

// @Component({
//   selector: 'app-admin-dashboard',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './admin-dashboard.html',
//   styleUrls: ['./admin-dashboard.css']
// })
// export class AdminDashboardComponent {

//   // 🔹 ROLL NUMBER
//   rollNumber: number = 0;

//   // 🔹 STUDENT DATA
//   student = {
//     StudentName: '',
//     Semester: null,
//     Class: '',
//     Address: ''
//   };

//   // 🔹 ACADEMIC
//   academic = {
//     Subject: '',
//     Marks: null,
//     Grade: ''
//   };

//   // 🔹 ATTENDANCE
//   attendance = {
//     TotalClasses: null,
//     Present: null,
//     Absent: null
//   };

//   // 🔹 FEES
//   fees = {
//     TotalFees: null,
//     Paid: null,
//     Pending: null
//   };

//   // 🔹 NOTIFICATION
//   notification = {
//     Message: ''
//   };

//   constructor(
//     private adminService: AdminDashboardService,
//     private router: Router
//   ) {}

//   // ================================
//   // ✅ NAVIGATION
//   // ================================
//   navigate(path: string) {
//     this.router.navigate([path]);
//   }

//   // ================================
//   // ✅ LOGOUT
//   // ================================
//   logout() {
//     localStorage.clear();
//     this.router.navigate(['/login']);
//   }

//   // ================================
//   // ✅ UPDATE STUDENT
//   // ================================
//   updateStudent() {
//     const data = {
//       RollNumber: this.rollNumber,
//       ...this.student
//     };

//     this.adminService.updateStudent(data).subscribe({
//       next: () => {
//         alert("Student Updated ✅");
//       },
//       error: () => {
//         alert("Update Failed ❌");
//       }
//     });
//   }

//   // ================================
//   // ✅ DELETE STUDENT
//   // ================================
//   deleteStudent() {
//     this.adminService.deleteStudent(this.rollNumber).subscribe({
//       next: () => {
//         alert("Student Deleted 🗑");
//       },
//       error: () => {
//         alert("Delete Failed ❌");
//       }
//     });
//   }

//   // ================================
//   // ✅ SAVE ACADEMIC
//   // ================================
//   saveAcademic() {
//     const data = {
//       RollNumber: this.rollNumber,
//       ...this.academic
//     };

//     this.adminService.addAcademic(data).subscribe({
//       next: () => {
//         alert("Academic Saved 📚");
//       },
//       error: () => {
//         alert("Academic Save Failed ❌");
//       }
//     });
//   }

//   // ================================
//   // ✅ SAVE ATTENDANCE
//   // ================================
//   saveAttendance() {
//     const data = {
//       RollNumber: this.rollNumber,
//       ...this.attendance
//     };

//     this.adminService.addAttendance(data).subscribe({
//       next: () => {
//         alert("Attendance Saved 📅");
//       },
//       error: () => {
//         alert("Attendance Save Failed ❌");
//       }
//     });
//   }

//   // ================================
//   // ✅ SAVE FEES
//   // ================================
//   saveFees() {
//     const data = {
//       RollNumber: this.rollNumber,
//       ...this.fees
//     };

//     this.adminService.addFees(data).subscribe({
//       next: () => {
//         alert("Fees Saved 💰");
//       },
//       error: () => {
//         alert("Fees Save Failed ❌");
//       }
//     });
//   }

//   // ================================
//   // ✅ SEND NOTIFICATION
//   // ================================
//   sendNotification() {
//     const data = {
//       RollNumber: this.rollNumber,
//       ...this.notification
//     };

//     this.adminService.addNotification(data).subscribe({
//       next: () => {
//         alert("Notification Sent 📢");
//       },
//       error: () => {
//         alert("Notification Failed ❌");
//       }
//     });
//   }

// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminDashboardService } from '../services/admin-dashboard-service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent {

  // 🔹 ROLL NUMBER
  rollNumber: number = 0;

  // 🔹 STUDENT DATA
  student = {
    StudentName: '',
    Semester: null,
    Class: '',
    Address: ''
  };

  // 🔹 ACADEMIC
  academic = {
    Subject: '',
    Marks: null,
    Grade: '',

    // ✅ NEW
    Semester: null
  };

  // 🔹 ATTENDANCE
  attendance = {
    TotalClasses: null,
    Present: null,
    Absent: null,

    // ✅ NEW
    Semester: null
  };

  // 🔹 FEES
  fees = {
    TotalFees: null,
    Paid: null,
    Pending: null,

    // ✅ NEW
    Semester: null
  };

  // 🔹 NOTIFICATION
  notification = {
    Message: '',

    // ✅ NEW
    Semester: null
  };

  constructor(
    private adminService: AdminDashboardService,
    private router: Router
  ) {}

  // ================================
  // ✅ NAVIGATION
  // ================================
  navigate(path: string) {
    this.router.navigate([path]);
  }

  // ================================
  // ✅ LOGOUT
  // ================================
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // ================================
  // ✅ UPDATE STUDENT
  // ================================
  updateStudent() {

    const data = {
      RollNumber: this.rollNumber,
      ...this.student
    };

    this.adminService.updateStudent(data).subscribe({

      next: () => {
        alert("Student Updated ✅");
      },

      error: () => {
        alert("Update Failed ❌");
      }

    });
  }

  // ================================
  // ✅ DELETE STUDENT
  // ================================
  deleteStudent() {

    this.adminService.deleteStudent(this.rollNumber).subscribe({

      next: () => {
        alert("Student Deleted 🗑");
      },

      error: () => {
        alert("Delete Failed ❌");
      }

    });
  }

  // ================================
  // ✅ SAVE ACADEMIC
  // ================================
  saveAcademic() {

    const data = {

      RollNumber: this.rollNumber,

      Subject: this.academic.Subject,

      Marks: this.academic.Marks,

      Grade: this.academic.Grade,

      // ✅ NEW
      Semester: this.academic.Semester

    };

    this.adminService.addAcademic(data).subscribe({

      next: () => {

        alert("Academic Saved 📚");

        // ✅ CLEAR
        this.academic = {
          Subject: '',
          Marks: null,
          Grade: '',
          Semester: null
        };

      },

      error: () => {
        alert("Academic Save Failed ❌");
      }

    });
  }

  // ================================
  // ✅ SAVE ATTENDANCE
  // ================================
  saveAttendance() {

    const data = {

      RollNumber: this.rollNumber,

      TotalClasses: this.attendance.TotalClasses,

      Present: this.attendance.Present,

      Absent: this.attendance.Absent,

      // ✅ NEW
      Semester: this.attendance.Semester

    };

    this.adminService.addAttendance(data).subscribe({

      next: () => {

        alert("Attendance Saved 📅");

        // ✅ CLEAR
        this.attendance = {
          TotalClasses: null,
          Present: null,
          Absent: null,
          Semester: null
        };

      },

      error: () => {
        alert("Attendance Save Failed ❌");
      }

    });
  }

  // ================================
  // ✅ SAVE FEES
  // ================================
  saveFees() {

    const data = {

      RollNumber: this.rollNumber,

      TotalFees: this.fees.TotalFees,

      Paid: this.fees.Paid,

      Pending: this.fees.Pending,

      // ✅ NEW
      Semester: this.fees.Semester

    };

    this.adminService.addFees(data).subscribe({

      next: () => {

        alert("Fees Saved 💰");

        // ✅ CLEAR
        this.fees = {
          TotalFees: null,
          Paid: null,
          Pending: null,
          Semester: null
        };

      },

      error: () => {
        alert("Fees Save Failed ❌");
      }

    });
  }

  // ================================
  // ✅ SEND NOTIFICATION
  // ================================
  sendNotification() {

    const data = {

      RollNumber: this.rollNumber,

      Message: this.notification.Message,

      // ✅ NEW
      Semester: this.notification.Semester

    };

    this.adminService.addNotification(data).subscribe({

      next: () => {

        alert("Notification Sent 📢");

        // ✅ CLEAR
        this.notification = {
          Message: '',
          Semester: null
        };

      },

      error: () => {
        alert("Notification Failed ❌");
      }

    });
  }

}