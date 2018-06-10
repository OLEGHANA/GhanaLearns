import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { languages } from '../../shared/constants';

@Component({
  selector: 'app-student-resources',
  templateUrl: './student-resources.component.html',
  styleUrls: ['./student-resources.component.scss']
})
export class StudentResourcesComponent implements OnInit {

  levels = [{label: 'KG', value: 'KG'}, {label: '1', value: '1'}];
  languages = languages;

  ngOnInit() {
  }

  constructor() {
  }
}
