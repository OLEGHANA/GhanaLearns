import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/constants';

@Component({
  selector: 'app-video-books',
  templateUrl: './video-books.component.html',
  styleUrls: ['./video-books.component.scss']
})
export class VideoBooksComponent implements OnInit {

  groups = [];
  languages = languages;
  defaultLanguage = 'en';

  ngOnInit() {
    this.groups = [{name: 'KG', _id: 'KG'}, {name: '1', _id: '1'}];
  }

  constructor() {
  }
}
