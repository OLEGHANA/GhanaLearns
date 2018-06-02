import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/languages';

@Component({
  selector: 'app-upload-resources',
  templateUrl: './upload-resources.component.html',
  styleUrls: ['./upload-resources.component.scss']
})
export class UploadResourcesComponent implements OnInit {

  groups = [];
  languages = languages;
  defaultLanguage = 'en';

  ngOnInit() {
    this.groups = [{name: 'KG', _id: 'KG'}, {name: '1', _id: '1'}];
  }

  constructor() {
  }
}
