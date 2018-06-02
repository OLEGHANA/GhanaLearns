import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DemoMaterialModule } from '../shared/demo.module';
import 'hammerjs';

import { LeadTeacherRoutes } from './lead-teacher.routing';
import { UploadResourcesComponent } from './upload-resources/upload-resources.component';
import { StudentResourcesComponent } from '../teacher/student-resources/student-resources.component';
import { SyncTabletsComponent } from './sync-tablets/sync-tablets.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LeadTeacherRoutes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    UploadResourcesComponent,
    StudentResourcesComponent,
    SyncTabletsComponent
  ],
})

export class LeadTeacherModule {}
