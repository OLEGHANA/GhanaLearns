import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DemoMaterialModule } from '../shared/demo.module';
import 'hammerjs';

import { BellRoutes } from './bell.routing';
import { StudentResourcesComponent } from '../teacher/student-resources/student-resources.component';
import { TeacherResourcesComponent } from './teacher-resources/teacher-resources.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BellRoutes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    TeacherResourcesComponent,
    StudentResourcesComponent
  ],
})

export class BellModule {}
