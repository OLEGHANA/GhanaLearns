import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/constants';

@Component({
  selector: 'app-fill-in-blanks',
  templateUrl: './fill-in-blanks.component.html',
  styleUrls: ['./fill-in-blanks.component.scss']
})
export class FillInBlanksComponent implements OnInit {

  groups = [];
  languages = languages;
  defaultLanguage = 'en';

  ngOnInit() {
    this.groups = [{name: 'KG', _id: 'KG'}, {name: '1', _id: '1'}];
  }

  constructor() {
  }
}
