// import { Routes } from '@angular/router';
// import { CreateStudent } from './create-student/create-student';
// import { StudentList } from './student-list/student-list';
// import { StudentUpdate } from './student-update/student-update';
// import { StudentDelete } from './student-delete/student-delete';
// import { StudentData } from './submit-student/student-data/student-data';
// import { AcademicRecords } from './homepage/features/academic-records/academic-records';
// import { AttendanceTracking } from './homepage/features/attendance-tracking/attendance-tracking';
// import { FeeManagement } from './homepage/features/fee-management/fee-management';
// import { Notifications } from './homepage/features/notifications/notifications';




// export const routes: Routes = [

//   // ✅ DEFAULT ROUTE
//   { path: '', redirectTo: 'homepage', pathMatch: 'full' },

//   { path: 'create-student', component: CreateStudent },
//   { path: 'student-list', component: StudentList },
//   { path: 'student-update', component: StudentUpdate },
//   { path: 'student-delete', component: StudentDelete },

//     { path: 'submit-student', component: StudentData },

//     {path:'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent)},
//     {path:'login', loadComponent: () => import('./login/login').then(m => m.LoginComponent)},
//     {path:'register', loadComponent: () => import('./register/register').then(m => m.RegisterComponent)},
//     {path:'admin-dashboard', loadComponent: () => import('./admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent)},
//     // {path:'captcha', loadComponent: () => import('./captcha/captcha').then(m => m.CaptchaComponent)}
//     {path:'forgot-password',loadComponent: () =>import('./forgot-password/forgot-password').then(m => m.ForgotPassword)},
//     {
//       path: 'homepage',
//       loadComponent: () => import('./homepage/homepage').then(m => m.HomepageComponent),

//   children: [

//     {path: 'academic-records', component: AcademicRecords},

//     {path: 'attendance-tracking',component: AttendanceTracking},

//     {path: 'fee-management',component: FeeManagement},

//     {path: 'notifications',component: Notifications }
//  ]
// }
// ];

import { Routes } from '@angular/router';

/* ================= STUDENT CRUD ================= */

import { CreateStudent } from './create-student/create-student';
import { StudentList } from './student-list/student-list';
import { StudentUpdate } from './student-update/student-update';
import { StudentDelete } from './student-delete/student-delete';

import { StudentData } from './submit-student/student-data/student-data';

export const routes: Routes = [

  /* ===================================================== */
  /* DEFAULT ROUTE */
  /* ===================================================== */

  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },

  /* ===================================================== */
  /* HOMEPAGE LAYOUT */
  /* ===================================================== */

  {
    path: 'homepage',

    loadComponent: () =>
      import('./homepage/homepage')
      .then(m => m.HomepageComponent),

    children: [

      /* ===================================================== */
      /* HOME CONTENT */
      /* ===================================================== */

      {
        path: '',

        loadComponent: () =>
          import('./homepage/home-content/home-content')
          .then(m => m.HomeContentComponent)
      },

      /* ===================================================== */
      /* ACADEMIC RECORDS */
      /* ===================================================== */

      {
        path: 'academic-records',

        loadComponent: () =>
          import('./homepage/features/academic-records/academic-records')
          .then(m => m.AcademicRecords)
      },

      /* ===================================================== */
      /* ATTENDANCE TRACKING */
      /* ===================================================== */

      {
        path: 'attendance-tracking',

        loadComponent: () =>
          import('./homepage/features/attendance-tracking/attendance-tracking')
          .then(m => m.AttendanceTracking)
      },

      /* ===================================================== */
      /* FEE MANAGEMENT */
      /* ===================================================== */

      {
        path: 'fee-management',

        loadComponent: () =>
          import('./homepage/features/fee-management/fee-management')
          .then(m => m.FeeManagement)
      },

      /* ===================================================== */
      /* NOTIFICATIONS */
      /* ===================================================== */

      {
        path: 'notifications',

        loadComponent: () =>
          import('./homepage/features/notifications/notifications')
          .then(m => m.Notifications)
      },

      /* ===================================================== */
/* ABOUT SYSTEM */
/* ===================================================== */

{
  path: 'about-system',

  loadComponent: () =>
    import('./homepage/about-system/about-system')
    .then(m => m.AboutSystem)
},

/* ===================================================== */
/* MISSION */
/* ===================================================== */

{
  path: 'mission',

  loadComponent: () =>
    import('./homepage/mission/mission')
    .then(m => m.Mission)
},

{
  path: 'contact-us',

  loadComponent: () =>
    import('./homepage/contact-us/contact-us')
    .then(m => m.ContactUs)
},

{
  path: 'support',

  loadComponent: () =>
    import('./homepage/support/support')
    .then(m => m.Support)
},

{
  path: 'faq',

  loadComponent: () =>
    import('./homepage/faq/faq')
    .then(m => m.Faq)
},

// {
//   path: 'help-center',

//   loadComponent: () =>
//     import('./homepage/help-center/help-center')
//     .then(m => m.HelpCenter)
// }


    ]
  },

  /* ===================================================== */
  /* STUDENT CRUD */
  /* ===================================================== */

  {
    path: 'create-student',
    component: CreateStudent
  },

  {
    path: 'student-list',
    component: StudentList
  },

  {
    path: 'student-update',
    component: StudentUpdate
  },

  {
    path: 'student-delete',
    component: StudentDelete
  },

  {
    path: 'submit-student',
    component: StudentData
  },

  /* ===================================================== */
  /* DASHBOARD */
  /* ===================================================== */

  {
    path: 'dashboard',

    loadComponent: () =>
      import('./dashboard/dashboard')
      .then(m => m.DashboardComponent)
  },

  /* ===================================================== */
  /* LOGIN */
  /* ===================================================== */

  {
    path: 'login',

    loadComponent: () =>
      import('./login/login')
      .then(m => m.LoginComponent)
  },

  /* ===================================================== */
  /* REGISTER */
  /* ===================================================== */

  {
    path: 'register',

    loadComponent: () =>
      import('./register/register')
      .then(m => m.RegisterComponent)
  },

  /* ===================================================== */
  /* ADMIN DASHBOARD */
  /* ===================================================== */

  {
    path: 'admin-dashboard',

    loadComponent: () =>
      import('./admin-dashboard/admin-dashboard')
      .then(m => m.AdminDashboardComponent)
  },

  /* ===================================================== */
  /* FORGOT PASSWORD */
  /* ===================================================== */

  {
    path: 'forgot-password',

    loadComponent: () =>
      import('./forgot-password/forgot-password')
      .then(m => m.ForgotPassword)
  },

  /* ===================================================== */
  /* PAGE NOT FOUND */
  /* ===================================================== */

  {
    path: '**',
    redirectTo: 'homepage'
  }

];