import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/constants';

@Component({
  selector: 'app-student-excercises',
  templateUrl: './student-excercises.component.html',
  styleUrls: ['./student-excercises.component.scss']
})
export class StudentExcercisesComponent implements OnInit {

  groups = [];
  languages = languages;
  defaultLanguage = 'en';

  ngOnInit() {
    this.groups = [{name: 'KG', _id: 'KG'}, {name: '1', _id: '1'}];
  }

  constructor() {
  }
}
