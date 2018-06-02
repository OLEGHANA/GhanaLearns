import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-manage-accessibility',
  templateUrl: './manage-accessibility.component.html',
  styleUrls: ['./manage-accessibility.component.scss']
})
export class ManageAccessibilityComponent implements OnInit {

  levels = [{label: 'KG', value: 'KG'}, {label: '1', value: '1'}];

  ngOnInit() {
  }

  constructor() {
  }
}
