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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TeacherRoutes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    RegisterStudentComponent,
    AssignTaskComponent,
    MyLibraryComponent,
    AudioBooksComponent,
    VideoBooksComponent,
    ListenAndFindComponent,
    FillInBlanksComponent,
    WordFormationComponent,
    UnjumbleWordComponent,
    WordPowerComponent
  ],
})

export class TeacherModule {}
