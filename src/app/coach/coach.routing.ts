import { Routes } from '@angular/router';
import { StudentResourcesComponent } from '../teacher/student-resources/student-resources.component';
import { UploadResourcesComponent } from '../lead-teacher/upload-resources/upload-resources.component';
import { LessonPlansComponent } from '../teacher/lesson-plans/lesson-plans.component';
import { ViewFeedbacksComponent } from '../head-teacher/view-feedbacks/view-feedbacks.component';
import { ViewStudentsComponent } from '../head-teacher/view-students/view-students.component';

export const CoachRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'upload-resources',
      component: UploadResourcesComponent
    }, {
      path: 'lesson-plans',
      component: LessonPlansComponent
    }, {
      path: 'view-feedbacks',
      component: ViewFeedbacksComponent
    }, {
      path: 'view-students',
      component: ViewStudentsComponent
    }, {
      path: 'student-resources',
      component: StudentResourcesComponent
    }]
  }
];
