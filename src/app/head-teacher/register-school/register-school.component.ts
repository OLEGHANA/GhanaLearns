import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-school',
  templateUrl: './register-school.component.html',
  styleUrls: ['./register-school.component.scss']
})
export class RegisterSchoolComponent implements OnInit {

  levels = [{label: 'KG', value: 'KG'}, {label: '1', value: '1'}];

  ngOnInit() {
  }

  constructor() {
  }
}
