import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-prepare-plan',
  templateUrl: './prepare-plan.component.html',
  styleUrls: ['./prepare-plan.component.scss']
})
export class PreparePlanComponent implements OnInit {

  levels = [{label: 'KG', value: 'KG'}, {label: '1', value: '1'}];

  ngOnInit() {
  }

  constructor() {
  }
}
