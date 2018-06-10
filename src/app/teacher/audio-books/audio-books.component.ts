import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CouchService } from '../../shared/couchdb.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-audio-books',
  templateUrl: './audio-books.component.html',
  styleUrls: ['./audio-books.component.scss']
})
export class AudioBooksComponent implements OnInit {

  private facility: any;
  private validTypes = [ 'mp3', 'wav' ];
  private obs = [];
  private resources = [];
  groups = [];
  resClassLevel = [];
  languages = languages;
  selectedLang = 'en';
  classLevel = [0, 1, 2, 3];
  audioTaskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private couchService: CouchService
  ) {}

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
    this.audioTaskForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      level: [0, Validators.required],
      language: ['', Validators.required],
      library: this.fb.array([
        this.fb.group({
          resource: ['', Validators.required]
        }),
        this.fb.group({
          resource: ['', Validators.required]
        }),
        this.fb.group({
          resource: ['', Validators.required]
        }),
        this.fb.group({
          resource: ['', Validators.required]
        })
      ])
    });
  }

  requestLoadLanguage() {
    const gName = this.groups[this.audioTaskForm.get('level').value].name;
    this.resClassLevel = this.resources.filter(res => {
      return (res.language === this.audioTaskForm.get('language').value)
      && res.levels
      && (res.levels.indexOf(gName) > -1)
      && (this.validTypes.indexOf(res.legacy.type) > -1);
    });
    console.log(this.resClassLevel);
  }

  onSubmit() {
    if (this.audioTaskForm.valid) {
      const assignmentValue = {
        kind: 'Assignment',
        startDate: '',
        endDate: '',
        memberId: '',
        resourceId: '',
        context: {
          subject: '',
          use: 'audio book task',
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
          use: 'audio book task',
          level: ''
        }
      };
      const formData = this.audioTaskForm.value;
      this.obs = [];
      formData.library.map((lib, i) => {
        const assignment = {
          startDate: Date.parse(formData.startDate),
          endDate: Date.parse(formData.endDate),
          resourceId: this.resClassLevel[lib.resource]._id,
          context: { ...assignmentValue.context,
            groupId: this.groups[formData.level]._id, subject: this.resClassLevel[lib.resource].subject }
        }
        const feedback = {
          resourceId: this.resClassLevel[lib.resource]._id,
          timestamp: Date.parse(''),
          context: { ...feedbackValue.context,
            subject: this.resClassLevel[lib.resource].subject, level: this.groups[formData.level].level[0] }
        }
        const assignmentData = {...assignmentValue, resourceId: this.resClassLevel[lib.resource]._id, ...assignment };
        const feedbackData = { ...feedbackValue, ...feedback };
        this.obs.push(this.couchService.post('assignments', assignmentData));
        this.obs.push(this.couchService.post('feedbacks', feedbackData));
      });
      forkJoin(this.obs).subscribe();
    }
  }

}
