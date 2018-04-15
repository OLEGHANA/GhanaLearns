import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatListModule, MatGridListModule,
  MatMenuModule,
  MatSidenavModule,
  MatProgressBarModule,
  MatTabsModule,
  MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RegisterRouting } from './register-routing';
import { NewLearnerComponent } from './new-learner/new-learner.component';
import { ViewLearnerComponent } from './view-learner/view-learner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDialogModule,
    FlexLayoutModule,
    RouterModule.forChild(RegisterRouting)
  ],
  declarations: [
    NewLearnerComponent,
    ViewLearnerComponent
  ]
})
export class RegisterModule { }
