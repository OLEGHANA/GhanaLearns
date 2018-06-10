import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/constants';
import { StudentResourcesComponent } from '../student-resources/student-resources.component';
import { CouchService } from '../../shared/couchdb.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss']
})
export class MyLibraryComponent implements OnInit {

  private facility: any;
  private invalidTypes = ['mp4', 'avi', 'flv', 'ppt', 'pptx', 'doc', 'docx', 'mp3', 'wav', 'midi'];
  private obs = [];
  private resources = [];
  groups = [];
  resClassLevel = [];
  languages = languages;
  selectedLang = 'en';
  classLevel = ['Fluent', 'Early', 'Emergent', 'Other'];
  libraryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private couchService: CouchService
  ) {
  }

  ngOnInit() {
    this.couchService.get('whoami/_all_docs?include_docs=true')
    .subscribe(data => {
      data.rows.map(row => {
        if (row.id === 'facility') {
          this.facility = row.doc;
        }
      });
      this.couchService.get('groups/_design/api/_view/allGroupsInFacility?include_docs=true&key="' + this.facility.facilityId + '"')
      .subscribe(groupData => {
        this.groups = groupData.rows.map(group => {
          return group.doc;
        });
      });
      this.couchService.get('resources/_design/api/_view/allResources?include_docs=true')
      .subscribe(resData => {
        this.resources = resData.rows.map(res => {
          return res.doc;
        });
      });
    });
    this.initializeForm();
  }

  initializeForm() {
    this.libraryForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      level: [0, Validators.required],
      language: ['', Validators.required],
      library: this.fb.array([
        this.fb.group({
          group: [0, Validators.required],
          resource: ['', Validators.required]
        }),
        this.fb.group({
          group: [0, Validators.required],
          resource: ['', Validators.required]
        }),
        this.fb.group({
          group: [0, Validators.required],
          resource: ['', Validators.required]
        }),
        this.fb.group({
          group: [0, Validators.required],
          resource: ['', Validators.required]
        })
      ])
    });
  }

  loadReaders() {
    const level = this.libraryForm.get('level').value;
    this.libraryForm.get('library.0.group').setValue(level);
    if (level - 1 > -1) {
      this.libraryForm.get('library.1.group').setValue(level - 1);
    }
    if (level - 2 > -1) {
      this.libraryForm.get('library.2.group').setValue(level - 2);
    }
  }

  requestLoadAllLanguage() {
    this.requestLoadLanguage(0);
    this.requestLoadLanguage(1);
    this.requestLoadLanguage(2);
    this.requestLoadLanguage(3);
  }

  requestLoadLanguage(num) {
    const gName = this.groups[this.libraryForm.get('library.' + num + '.group').value].name;
    this.resClassLevel[num] = this.resources.filter(res => {
      return (res.language === this.libraryForm.get('language').value)
      && res.levels
      && (res.levels.indexOf(gName) > -1)
      && (this.invalidTypes.indexOf(res.legacy.type) === -1);
    });
  }

  onSubmit() {
    if (this.libraryForm.valid) {
      const assignmentValue = {
        kind: 'Assignment',
        startDate: '',
        endDate: '',
        memberId: '',
        resourceId: '',
        context: {
          subject: '',
          use: 'stories for the week',
          groupId: '',
          facilityId: this.facility.facilityId
        }
      };
      const feedbackValue = {
        kind: 'Feedback',
        rating: 0,
        comment: '',
        facilityId: this.facility.facilityId,
        memberId: '',
        resourceId: '',
        timestamp: '',
        context: {
          subject: '',
          use: 'stories for the week',
          level: ''
        }
      };
      const formData = this.libraryForm.value;
      this.obs = [];
      formData.library.map((lib, i) => {
        const assignment = {
          startDate: Date.parse(formData.startDate),
          endDate: Date.parse(formData.endDate),
          resourceId: this.resClassLevel[i][lib.resource]._id,
          context: { ...assignmentValue.context,
            groupId: this.groups[formData.level]._id, subject: this.resClassLevel[i][lib.resource].subject }
        }
        const feedback = {
          resourceId: this.resClassLevel[i][lib.resource]._id,
          timestamp: Date.parse(''),
          context: { ...feedbackValue.context,
            subject: this.resClassLevel[i][lib.resource].subject, level: this.groups[formData.level].level[0] }
        }
        const assignmentData = {...assignmentValue, resourceId: this.resClassLevel[i][lib.resource]._id, ...assignment };
        const feedbackData = { ...feedbackValue, ...feedback };
        this.obs.push(this.couchService.post('assignments', assignmentData));
        this.obs.push(this.couchService.post('feedbacks', feedbackData));
      });
      forkJoin(this.obs).subscribe();
    }
  }

}
