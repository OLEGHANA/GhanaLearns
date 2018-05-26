import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {

  levels = [{label: 'KG', value: 'KG'}, {label: '1', value: '1'}];

  ngOnInit() {
  }

  constructor() {
  }
}
