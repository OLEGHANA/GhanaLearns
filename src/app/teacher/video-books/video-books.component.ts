import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CouchService } from '../../shared/couchdb.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-video-books',
  templateUrl: './video-books.component.html',
  styleUrls: ['./video-books.component.scss']
})
export class VideoBooksComponent implements OnInit {

  private facility: any;
  private validTypes = [ 'mp4', 'avi', 'flv' ];
  private obs = [];
  private resources = [];
  groups = [];
  resClassLevel = [];
  languages = languages;
  selectedLang = 'en';
  selectedResource: any;
  questionList = [];
  classLevel = [0];
  videoBookForm: FormGroup;
  selected = [];

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
    this.videoBookForm = this.fb.group({
      startDate: ['', Validators.compose([Validators.required, CustomValidators.date])],
      endDate: ['', Validators.compose([Validators.required, CustomValidators.date])],
      level: [0, Validators.required],
      language: [this.selectedLang, Validators.required],
      library: this.fb.array([
        this.fb.group({
          resource: ['', Validators.required]
        })
      ])
    });
  }

  requestLoadLanguage() {
    const gName = this.groups[this.videoBookForm.get('level').value].name;
    this.resClassLevel = this.resources.filter(res => {
      return (res.language === this.videoBookForm.get('language').value)
      && res.levels
      && (res.levels.indexOf(gName) > -1)
      && (this.validTypes.indexOf(res.legacy.type) > -1);
    });
  }

  selectResource(num) {
    this.questionList = [];
    const rIndex = this.videoBookForm.get('library.' + num + '.resource').value;
    this.selectedResource = this.resClassLevel[rIndex];
    const quesKeys = Object.keys(this.selectedResource.questions);
    quesKeys.map(q => {
      const ques = Object.keys(this.selectedResource.questions[q]);
      const ans = Object.keys(this.selectedResource.questions[q][ques[0]]);
      this.questionList.push({id: q, question: ques[0], answer: ans[0]});
    });
  }

  onSelect({ selected }) {
    console.log(selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  remove() {
    this.selected = [];
  }

  displayCheck(row) {
    return true;
  }

  onSubmit() {
    if (this.videoBookForm.valid) {
      const assignmentValue = {
        kind: 'Assignment',
        startDate: '',
        endDate: '',
        memberId: '',
        resourceId: '',
        context: {
          subject: '',
          use: 'video book task',
          groupId: '',
          facilityId: this.facility.facilityId,
          questions: []
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
          use: 'video book task',
          level: ''
        }
      };
      const formData = this.videoBookForm.value;
      this.obs = [];
      formData.library.map((lib, i) => {
        const assignment = {
          startDate: Date.parse(formData.startDate),
          endDate: Date.parse(formData.endDate),
          resourceId: this.resClassLevel[lib.resource]._id,
          context: { ...assignmentValue.context,
            groupId: this.groups[formData.level]._id, subject: this.resClassLevel[lib.resource].subject,
            questions: this.selected.map(q => { return q.id })
          }
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
