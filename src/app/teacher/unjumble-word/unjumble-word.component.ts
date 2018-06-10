import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/constants';

@Component({
  selector: 'app-unjumble-word',
  templateUrl: './unjumble-word.component.html',
  styleUrls: ['./unjumble-word.component.scss']
})
export class UnjumbleWordComponent implements OnInit {

  groups = [];
  languages = languages;
  defaultLanguage = 'en';

  ngOnInit() {
    this.groups = [{name: 'KG', _id: 'KG'}, {name: '1', _id: '1'}];
  }

  constructor() {
  }
}
