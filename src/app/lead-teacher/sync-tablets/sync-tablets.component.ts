import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/languages';

@Component({
  selector: 'app-sync-tablets',
  templateUrl: './sync-tablets.component.html',
  styleUrls: ['./sync-tablets.component.scss']
})
export class SyncTabletsComponent implements OnInit {

  groups = [];
  languages = languages;
  defaultLanguage = 'en';

  ngOnInit() {
    this.groups = [{name: 'KG', _id: 'KG'}, {name: '1', _id: '1'}];
  }

  constructor() {
  }
}
