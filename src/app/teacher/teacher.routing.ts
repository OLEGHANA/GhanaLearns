import { Routes } from '@angular/router';
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

export const TeacherRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'register-student',
      component: RegisterStudentComponent
    }, {
      path: 'assign-task',
      component: AssignTaskComponent
    }, {
      path: 'assign-task/my-library',
      component: MyLibraryComponent
    }, {
      path: 'assign-task/audio-books',
      component: AudioBooksComponent
    }, {
      path: 'assign-task/video-books',
      component: VideoBooksComponent
    }, {
      path: 'assign-task/listen-and-find',
      component: ListenAndFindComponent
    }, {
      path: 'assign-task/fill-in-blanks',
      component: FillInBlanksComponent
    }, {
      path: 'assign-task/word-formation',
      component: WordFormationComponent
    }, {
      path: 'assign-task/unjumble',
      component: UnjumbleWordComponent
    }, {
      path: 'assign-task/word-power',
      component: WordPowerComponent
    }]
  }
];
