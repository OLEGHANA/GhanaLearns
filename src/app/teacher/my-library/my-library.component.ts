import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/languages';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss']
})
export class MyLibraryComponent implements OnInit {

  groups = [];
  languages = languages;
  defaultLanguage = 'en';

  ngOnInit() {
    this.groups = [{name: 'KG', _id: 'KG'}, {name: '1', _id: '1'}];
  }

  constructor() {
  }
}
