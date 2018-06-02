import { Routes } from '@angular/router';
import { TeacherResourcesComponent } from './teacher-resources/teacher-resources.component';
import { StudentResourcesComponent } from '../teacher/student-resources/student-resources.component';

export const BellRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'teacher-resources',
      component: TeacherResourcesComponent
    }, {
      path: 'student-resources',
      component: StudentResourcesComponent
    }]
  }
];
