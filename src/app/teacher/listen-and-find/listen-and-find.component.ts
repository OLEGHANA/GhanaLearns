import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CouchService } from '../../shared/couchdb.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-listen-and-find',
  templateUrl: './listen-and-find.component.html',
  styleUrls: ['./listen-and-find.component.scss']
})
export class ListenAndFindComponent implements OnInit {

  private facility: any;
  groups = [];
  resClassLevel = [];
  languages = languages;
  selectedLang = 'en';
  listenFindForm: FormGroup;
  durations = [
    { value: 120, label: '2 minutes' },
    { value: 150, label: '2 min 30 seconds' },
    { value: 180, label: '3 minutes' },
    { value: 210, label: '3 min 30 seconds' },
    { value: 240, label: '4 minutes' },
    { value: 270, label: '4 min 30 seconds' },
    { value: 300, label: '5 minutes' },
    { value: 330, label: '5 min 30 seconds' },
    { value: 360, label: '6 minutes' },
    { value: 390, label: '6 min 30 seconds' },
    { value: 420, label: '7 minutes' },
    { value: 450, label: '7 min 30 seconds' },
    { value: 480, label: '8 minutes' },
    { value: 510, label: '8 min 30 seconds' },
    { value: 540, label: '9 minutes' },
    { value: 570, label: '9 min 30 seconds' },
    { value: 600, label: '10 minutes' },
    { value: 630, label: '10 min 30 seconds' }
  ];
  settings = [
    { value: 'classroom', label: 'Classroom Setting' },
    { value: 'kitchen', label: 'Kitch Setting' },
    { value: 'bodyparts', label: 'Body Parts' },
  ]

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
    });
    this.initializeForm();
  }

  initializeForm() {
    this.listenFindForm = this.fb.group({
      startDate: ['', Validators.compose([Validators.required, CustomValidators.date])],
      endDate: ['', Validators.compose([Validators.required, CustomValidators.date])],
      level: [0, Validators.required],
      language: [this.selectedLang, Validators.required],
      imageSetting: [this.settings[0].value, Validators.required],
      duration: [this.durations[0].value, Validators.required]
    });
  }

  onSubmit() {
    if (this.listenFindForm.valid) {
      const assignmentValue = {
        kind: 'Assignment',
        startDate: '',
        endDate: '',
        memberId: '',
        duration: '',
        imageSetting: '',
        context: {
          subject: 'english',
          use: 'listen and find',
          groupId: '',
          facilityId: this.facility.facilityId
        }
      };
      const formData = this.listenFindForm.value;
      const assignment = {
        startDate: Date.parse(formData.startDate),
        endDate: Date.parse(formData.endDate),
        imageSetting: formData.imageSetting,
        duration: formData.duration,
        context: { ...assignmentValue.context,
          groupId: this.groups[formData.level]._id
        }
      }
      const assignmentData = { ...assignmentValue, ...assignment };
      this.couchService.post('assignments', assignmentData).subscribe();
    }
  }

}
