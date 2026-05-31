



// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-homepage',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule
//   ],
//   templateUrl: './homepage.html',
//   styleUrls: ['./homepage.css']
// })
// export class HomepageComponent {

//   constructor(private router: Router) {}

//   goToLogin() {
//     this.router.navigate(['/login']);
//   }

//   goToRegister() {
//     this.router.navigate(['/register']);
//   }

// }


import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css']
})
export class HomepageComponent {

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}