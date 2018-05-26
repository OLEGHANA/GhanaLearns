import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/languages';

@Component({
  selector: 'app-audio-books',
  templateUrl: './audio-books.component.html',
  styleUrls: ['./audio-books.component.scss']
})
export class AudioBooksComponent implements OnInit {

  groups = [];
  languages = languages;
  defaultLanguage = 'en';

  ngOnInit() {
    this.groups = [{name: 'KG', _id: 'KG'}, {name: '1', _id: '1'}];
  }

  constructor() {
  }
}
