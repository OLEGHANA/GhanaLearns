import { Routes } from '@angular/router';
import { StudentResourcesComponent } from '../teacher/student-resources/student-resources.component';
import { ManageStudentsComponent } from '../teacher/manage-students/manage-students.component';
import { RegisterSchoolComponent } from './register-school/register-school.component';
import { ManageAccessibilityComponent } from './manage-accessibility/manage-accessibility.component';
import { ViewFeedbacksComponent } from './view-feedbacks/view-feedbacks.component';
import { LessonPlansComponent } from '../teacher/lesson-plans/lesson-plans.component';
import { ViewStudentsComponent } from './view-students/view-students.component';

export const HeadTeacherRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'register-school',
      component: RegisterSchoolComponent,
    }, {
      path: 'student-resources',
      component: StudentResourcesComponent
    }, {
      path: 'manage-accessibility',
      component: ManageAccessibilityComponent
    }, {
      path: 'manage-students',
      component: ManageStudentsComponent
    }, {
      path: 'view-feedbacks',
      component: ViewFeedbacksComponent
    }, {
      path: 'lesson-plans',
      component: LessonPlansComponent
    }, {
      path: 'view-students',
      component: ViewStudentsComponent
    }]
  }
];
