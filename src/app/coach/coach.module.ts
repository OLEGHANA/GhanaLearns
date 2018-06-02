import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DemoMaterialModule } from '../shared/demo.module';
import 'hammerjs';

import { CoachRoutes } from './coach.routing';
import { StudentResourcesComponent } from '../teacher/student-resources/student-resources.component';
import { UploadResourcesComponent } from '../lead-teacher/upload-resources/upload-resources.component';
import { LessonPlansComponent } from '../teacher/lesson-plans/lesson-plans.component';
import { ViewFeedbacksComponent } from '../head-teacher/view-feedbacks/view-feedbacks.component';
import { ViewStudentsComponent } from '../head-teacher/view-students/view-students.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CoachRoutes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    UploadResourcesComponent,
    LessonPlansComponent,
    ViewFeedbacksComponent,
    ViewStudentsComponent,
    StudentResourcesComponent
  ],
})

export class CoachModule {}
