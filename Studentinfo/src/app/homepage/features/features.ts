import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AcademicRecords } from './academic-records/academic-records';

import { AttendanceTracking } from './attendance-tracking/attendance-tracking';

import { FeeManagement } from './fee-management/fee-management';

import { Notifications } from './notifications/notifications';

@Component({

  selector: 'app-features',

  standalone: true,

  imports: [

    CommonModule,

    AcademicRecords,

    AttendanceTracking,

    FeeManagement,

    Notifications

  ],

  templateUrl: './features.html',

  styleUrls: ['./features.css']

})

export class Features {

}