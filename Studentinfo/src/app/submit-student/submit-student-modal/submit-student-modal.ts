import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-submit-student-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './submit-student-modal.html',
  styleUrls: ['./submit-student-modal.css']
})
export class SubmitStudentModal {

  @Input() studentData: any;

  @Output() sendData = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  submit() {
    this.sendData.emit(this.studentData);
  }

  close() {
    this.closeModal.emit();
  }
}