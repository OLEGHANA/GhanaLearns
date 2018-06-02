import { Routes } from '@angular/router';
import { UploadResourcesComponent } from './upload-resources/upload-resources.component';
import { StudentResourcesComponent } from '../teacher/student-resources/student-resources.component';
import { SyncTabletsComponent } from './sync-tablets/sync-tablets.component';

export const LeadTeacherRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'upload-resources',
      component: UploadResourcesComponent
    }, {
      path: 'student-resources',
      component: StudentResourcesComponent
    }, {
      path: 'sync-tablets',
      component: SyncTabletsComponent
    }]
  }
];
