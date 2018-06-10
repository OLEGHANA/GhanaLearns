import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DemoMaterialModule } from '../shared/demo.module';
import 'hammerjs';

import { TeacherRoutes } from './teacher.routing';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { MyLibraryComponent } from './my-library/my-library.component';
import { AudioBooksComponent } from './audio-books/audio-books.component';
import { VideoBooksComponent } from './video-books/video-books.component';
import { ListenAndFindComponent } from './listen-and-find/listen-and-find.component';
import { FillInBlanksComponent } from './fill-in-blanks/fill-in-blanks.component';
import { WordFormationComponent } from './word-formation/word-formation.component';
import { UnjumbleWordComponent } from './unjumble-word/unjumble-word.component';
import { WordPowerComponent } from './word-power/word-power.component';
import { StudentResourcesComponent } from './student-resources/student-resources.component';
import { RateResourceComponent } from './rate-resource/rate-resource.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LessonPlansComponent } from './lesson-plans/lesson-plans.component';
import { PreparePlanComponent } from './prepare-plan/prepare-plan.component';
import { ManageStudentsComponent } from './manage-students/manage-students.component';
import { StudentExcercisesComponent } from './student-excercises/student-excercises.component';
import { QuoteComponent } from './quote.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TeacherRoutes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule,
    NgxDatatableModule
  ],
  declarations: [
    QuoteComponent,
    RegisterStudentComponent,
    AssignTaskComponent,
    MyLibraryComponent,
    AudioBooksComponent,
    VideoBooksComponent,
    ListenAndFindComponent,
    FillInBlanksComponent,
    WordFormationComponent,
    UnjumbleWordComponent,
    WordPowerComponent,
    StudentExcercisesComponent,
    ManageStudentsComponent,
    PreparePlanComponent,
    LessonPlansComponent,
    RateResourceComponent,
    StudentResourcesComponent
  ],
})

export class TeacherModule {}
