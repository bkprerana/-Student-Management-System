import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubmitStudentModal } from '../submit-student-modal/submit-student-modal';
import { StudentSubmitService } from '../../services/submit-student-service'; // ✅ FIXED PATH

import { OnInit } from '@angular/core';
@Component({
  selector: 'app-student-data',
  standalone: true,
  imports: [CommonModule, FormsModule, SubmitStudentModal],
  templateUrl: './student-data.html',
  styleUrls: ['./student-data.css']
})
export class StudentData implements OnInit {
  

  showModal = false;

  studentParent: any = {
    RollNumber: '',
    StudentName: '',
    Semester: '',
    Class: '',
    Address: '',
    JoiningDate: '',
    Email: '' 
  };

  constructor(private studentService: StudentSubmitService) {}

  ngOnInit() {
    this.studentParent.Email = localStorage.getItem('email') || '';
  }


  openModal() {

  // ✅ Validation condition
  if (
    !this.studentParent.RollNumber ||
    !this.studentParent.StudentName
  ) {
    alert("⚠ Please fill Roll Number and Student Name first");
    return; // stop here
  }

  // ✅ Open child if valid
  this.showModal = true;
}

  closeModal() {
    this.showModal = false;
  }

  receiveChildData(data: any) {
    console.log("Final Data:", data);

    this.studentService.submitStudent(data).subscribe({
      next: (res: any) => {   // ✅ FIX
        alert("✅ Student saved successfully");
        this.showModal = false;
      },
      error: (err: any) => {  // ✅ FIX
        console.error(err);
        alert("❌ Error saving student");
      }
    });
  }
}