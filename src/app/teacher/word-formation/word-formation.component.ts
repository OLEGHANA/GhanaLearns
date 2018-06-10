import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/constants';

@Component({
  selector: 'app-word-formation',
  templateUrl: './word-formation.component.html',
  styleUrls: ['./word-formation.component.scss']
})
export class WordFormationComponent implements OnInit {

  groups = [];
  languages = languages;
  defaultLanguage = 'en';

  ngOnInit() {
    this.groups = [{name: 'KG', _id: 'KG'}, {name: '1', _id: '1'}];
  }

  constructor() {
  }
}
