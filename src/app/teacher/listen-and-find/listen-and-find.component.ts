import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/languages';

@Component({
  selector: 'app-listen-and-find',
  templateUrl: './listen-and-find.component.html',
  styleUrls: ['./listen-and-find.component.scss']
})
export class ListenAndFindComponent implements OnInit {

  groups = [];
  languages = languages;
  defaultLanguage = 'en';

  ngOnInit() {
    this.groups = [{name: 'KG', _id: 'KG'}, {name: '1', _id: '1'}];
  }

  constructor() {
  }
}
