import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { NewLearnerComponent } from './new-learner/new-learner.component';
import { ViewLearnerComponent } from './view-learner/view-learner.component';


export const RegisterRouting: Routes = [{
  path: '',
  redirectTo: 'new-learner',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'new-learner',
    component: NewLearnerComponent
  }, {
    path: 'view-learner',
    component: ViewLearnerComponent
  }]
}];
