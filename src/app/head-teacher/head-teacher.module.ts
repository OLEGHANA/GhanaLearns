import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DemoMaterialModule } from '../shared/demo.module';
import 'hammerjs';

import { HeadTeacherRoutes } from './head-teacher.routing';
import { StudentResourcesComponent } from '../teacher/student-resources/student-resources.component';
import { ManageStudentsComponent } from '../teacher/manage-students/manage-students.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RegisterSchoolComponent } from './register-school/register-school.component';
import { ManageAccessibilityComponent } from './manage-accessibility/manage-accessibility.component';
import { ViewFeedbacksComponent } from './view-feedbacks/view-feedbacks.component';
import { LessonPlansComponent } from '../teacher/lesson-plans/lesson-plans.component';
import { ViewStudentsComponent } from './view-students/view-students.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HeadTeacherRoutes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule,
    NgxDatatableModule
  ],
  declarations: [
    RegisterSchoolComponent,
    ManageStudentsComponent,
    StudentResourcesComponent,
    ManageAccessibilityComponent,
    ViewFeedbacksComponent,
    LessonPlansComponent,
    ViewStudentsComponent
  ],
})

export class HeadTeacherModule {}
