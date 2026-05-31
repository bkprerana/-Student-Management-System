
import {
  Component,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Chart } from 'chart.js/auto';

import { DashboardService } from '../services/dashboard-service';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent
  implements AfterViewInit, OnInit {

  students: any[] = [];

  totalStudents = 0;

  chart: any;

  attendanceChart: any;

  feesChart: any;

  gpaChart: any;

  role: string = '';

  email: string = '';

  student: any = {};

  academic: any[] = [];

  attendance: any = {};

  fees: any = {};

  notifications: any[] = [];

  gpa: number = 0;

  isLoading: boolean = true;

  retryCount: number = 0;

  // ============================
  // ✅ SEMESTER FILTER
  // ============================

  selectedSemester = 8;

  semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    const token = localStorage.getItem('token');

    const email = localStorage.getItem('email');

    if (!token || !email) {

      this.logout();

      return;
    }

    const tabId = Date.now().toString();

    const existingTab =
      localStorage.getItem('activeTab');

    if (existingTab && existingTab !== tabId) {

      alert("Already open in another tab ❌");

      this.logout();

      return;
    }

    localStorage.setItem('activeTab', tabId);

    window.addEventListener('storage', (event) => {

      if (event.key === 'activeTab') {

        alert("Session opened in another tab ❌");

        this.logout();
      }
    });

    window.addEventListener('beforeunload', () => {

      localStorage.removeItem('activeTab');
    });

    this.updateActivity();

    this.startSessionTimer();

    this.trackActivity();
  }

  ngAfterViewInit() {

    this.role =
      localStorage.getItem('role') || '';

    this.email =
      localStorage.getItem('email') || '';

    // ✅ FIX ADDED
    const userData =
      localStorage.getItem('user');

    if (userData) {

      const user = JSON.parse(userData);

      console.log("Logged User:", user);

      this.student = user;

      this.email = user.Email || '';

      this.role = user.Role || '';
    }

    setTimeout(() => {

      this.loadStudents();

    }, 100);
  }

  // ============================
  // SESSION TIMER
  // ============================

  startSessionTimer() {

    const timeout = 15 * 60 * 1000;

    setInterval(() => {

      const lastActivity = Number(
        localStorage.getItem('lastActivity')
      );

      if (!lastActivity || isNaN(lastActivity)) {

        this.updateActivity();

        return;
      }

      const now = new Date().getTime();

      if (now - lastActivity > timeout) {

        alert("Session expired ⏱️");

        this.logout();
      }

    }, 5000);
  }

  trackActivity() {

    document.addEventListener(
      'click',
      () => this.updateActivity()
    );

    document.addEventListener(
      'keydown',
      () => this.updateActivity()
    );
  }

  updateActivity() {

    localStorage.setItem(
      'lastActivity',
      new Date().getTime().toString()
    );
  }

 // LOAD DATA //
loadStudents() {

  this.isLoading = true;

  this.dashboardService
    .getDashboardData()
    .subscribe({

      next: (res: any) => {

        if (!res) {
          return;
        }

        this.student = res?.student || {};

        this.academic = res?.academic || [];

        this.attendance = res?.attendance || {};

        this.fees = res?.fees || {};

        this.notifications =
          res?.notifications || [];

        this.gpa = res?.gpa || 0;

        this.students =
          this.student ? [this.student] : [];

        this.totalStudents =
          this.students.length;

        this.isLoading = false;

        this.cdr.detectChanges();

        setTimeout(() => {

          this.createChart();

          this.createAttendanceChart();

          this.createFeesChart();

          this.createGpaChart();

        }, 100);

        this.retryCount = 0;
      },

      // ✅ UPDATED ERROR BLOCK ADDED
      error: (err: any) => {

        console.error(err);

        // ✅ SESSION EXPIRED
        if (
          err.status === 401 ||
          err.error?.message?.includes('Session')
        ) {

          alert("Session expired ❌");

          localStorage.clear();

          this.router.navigate(['/login']);

          return;
        }

        // ✅ RETRY ON TEMP ERROR
        if (this.retryCount < 1) {

          this.retryCount++;

          setTimeout(() => {

            this.loadStudents();

          }, 1000);

          return;
        }

        this.isLoading = false;
      }
    });
}
  // ============================
  // LOAD SEMESTER DATA
  // ============================

  loadSemesterData() {

    this.dashboardService
      .getSemesterData(
        this.student.RollNumber,
        this.selectedSemester
      )

      .subscribe((res: any) => {

        this.academic =
          res.academic || [];

        this.attendance =
          res.attendance || {};

        this.fees =
          res.fees || {};

        this.notifications =
          res.notifications || [];

        if (this.academic.length > 0) {

          const total =
            this.academic.reduce(
              (sum: number, a: any) =>
                sum + (a.Marks || 0),
              0
            );

          this.gpa =
            (total / this.academic.length) / 10;
        }
        else {

          this.gpa = 0;
        }

        this.cdr.detectChanges();

        this.createChart();

        this.createAttendanceChart();

        this.createFeesChart();

        this.createGpaChart();
      });
  }

  // ============================
  // 📊 SEMESTER PERFORMANCE CHART
  // ============================

  createChart() {

    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.academic.map(
      (a: any) => a.Subject
    );

    const marks = this.academic.map(
      (a: any) => a.Marks
    );

    this.chart = new Chart(
      'semesterChart',
      {

        type: 'bar',

        data: {

          labels: labels,

          datasets: [{

            label:
              '📚 Semester ' +
              this.selectedSemester +
              ' Academic Performance',

            data: marks,

            backgroundColor: [
              '#df6bff',
              '#0eb3a8',
              '#1710a4',
              '#5f27cd',
              '#54a0ff',
              '#1dd1a1',
              '#021d1d',
              '#ff6b6b'
            ],

            borderRadius: 10,

            borderWidth: 1
          }]
        },

        options: {

          responsive: true,

          maintainAspectRatio: false,

          plugins: {

            legend: {

              labels: {
                color: 'white',

                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            },

            title: {

              display: true,

              text:
                '📚 Semester ' +
                this.selectedSemester +
                ' Academic Performance',

              color: 'white',

              font: {
                size: 20,
                weight: 'bold'
              },

              padding: {
                top: 10,
                bottom: 20
              }
            }
          },

          scales: {

            x: {

              ticks: {
                color: 'white'
              }
            },

            y: {

              beginAtZero: true,

              max: 100,

              ticks: {
                color: 'white'
              }
            }
          }
        }
      }
    );
  }

  // ============================
  // ATTENDANCE CHART
  // ============================

  createAttendanceChart() {

    if (this.attendanceChart) {
      this.attendanceChart.destroy();
    }

    this.attendanceChart = new Chart(
      'attendanceChart',
      {

        type: 'pie',

        data: {

          labels: ['Present', 'Absent'],

          datasets: [{

            data: [
              this.attendance?.Present || 0,
              this.attendance?.Absent || 0
            ],

            backgroundColor: [
              '#a40f9a',
              '#ff52ba'
            ]
          }]
        },

        options: {

          responsive: true,

          plugins: {
            legend: {
              labels: {
                color: 'white'
              }
            }
          }
        }
      });
  }

  // ============================
  // FEES CHART
  // ============================

  createFeesChart() {

    if (this.feesChart) {
      this.feesChart.destroy();
    }

    this.feesChart = new Chart(
      'feesChart',
      {

        type: 'doughnut',

        data: {

          labels: ['Paid', 'Pending'],

          datasets: [{

            data: [
              this.fees?.Paid || 0,
              this.fees?.Pending || 0
            ],

            backgroundColor: [
              '#42A5F5',
              '#FFA726'
            ]
          }]
        },

        options: {

          responsive: true,

          plugins: {
            legend: {
              labels: {
                color: 'white'
              }
            }
          }
        }
      });
  }

  // ============================
  // GPA CHART
  // ============================

  createGpaChart() {

    if (this.gpaChart) {
      this.gpaChart.destroy();
    }

    this.gpaChart = new Chart(
      'gpaChart',
      {

        type: 'line',

        data: {

          labels: [
            'Semester 1',
            'Semester 2',
            'Semester 3',
            'Semester 4',
            'Semester 5',
            'Semester 6',
            'Semester 7',
            'Semester 8'
          ],

          datasets: [{

            label: 'GPA',

            data: [
              7.1,
              7.5,
              7.8,
              8.0,
              8.2,
              8.5,
              8.8,
              this.gpa || 0
            ],

            borderColor: '#FFD54F',

            backgroundColor:
              'rgba(255, 213, 79, 0.2)',

            fill: true,

            tension: 0.4
          }]
        },

        options: {

          responsive: true,

          maintainAspectRatio: false,

          plugins: {
            legend: {
              labels: {
                color: 'white'
              }
            }
          },

          scales: {

            x: {
              ticks: {
                color: 'white'
              }
            },

            y: {
              ticks: {
                color: 'white'
              }
            }
          }
        }
      });
  }

  // ============================
  // NAVIGATION
  // ============================

  navigate(path: string) {
    this.router.navigate([path]);
  }

  // ============================
  // LOGOUT
  // ============================

  logout() {

    localStorage.clear();

    window.location.href = '/';
  }
}