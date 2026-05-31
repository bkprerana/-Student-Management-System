import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateStudentService } from '../services/create-student-service';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-student.html',
  styleUrls: ['./create-student.css']
})
export class CreateStudent {

  // ✅ Student model
  student = {
    RollNumber: 0,
    StudentName: '',
    Semester: 0,
    Class: '',
    Address: '',
    JoiningDate: ''
  };

  constructor(private studentService: CreateStudentService) {}

  // ✅ Save function
  saveStudent() {
    console.log("🚀 BUTTON CLICKED");
    console.log("📤 Sending Data:", this.student);

    this.studentService.addStudent(this.student).subscribe({
      next: (res: any) => {
        console.log("✅ Response:", res);
        alert("Student Added Successfully ✅");

        // 🔄 Reset form
        this.student = {
          RollNumber: 0,
          StudentName: '',
          Semester: 0,
          Class: '',
          Address: '',
          JoiningDate: ''
        };
      },
      error: (err: any) => {
        console.error("❌ Error:", err);
        alert("Error adding student ❌");
      }
    });
  }
}