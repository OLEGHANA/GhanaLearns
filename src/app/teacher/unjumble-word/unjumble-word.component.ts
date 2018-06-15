import { Component, Input, OnInit } from '@angular/core';
import { languages } from '../../shared/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CouchService } from '../../shared/couchdb.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-unjumble-word',
  templateUrl: './unjumble-word.component.html',
  styleUrls: ['./unjumble-word.component.scss']
})
export class UnjumbleWordComponent implements OnInit {

  private facility: any;
  groups = [];
  languages = languages;
  selectedLang = 'en';
  unjumbleForm: FormGroup;
  durations = [
    { value: 30, label: '30 seconds' },
    { value: 50, label: '50 seconds' },
    { value: 60, label: '60 seconds' },
    { value: 80, label: '1 min 20 seconds' },
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
    this.unjumbleForm = this.fb.group({
      startDate: ['', Validators.compose([Validators.required, CustomValidators.date])],
      endDate: ['', Validators.compose([Validators.required, CustomValidators.date])],
      level: [0, Validators.required],
      language: [this.selectedLang, Validators.required],
      words: ['', Validators.required],
      duration: ['', Validators.required],
      jumbleWord: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.unjumbleForm.valid) {
      const formData = this.unjumbleForm.value;
      const assignmentData = {
        kind: 'Assignment',
        startDate: Date.parse(formData.startDate),
        endDate: Date.parse(formData.endDate),
        memberId: '',
        duration: formData.duration,
        jumbleWord: formData.jumbleWord,
        context: {
          subject: 'english',
          use: 'unjumble words',
          groupId: this.groups[formData.level]._id,
          facilityId: this.facility.facilityId
        }
      };
      this.couchService.post('assignments', assignmentData).subscribe();
    }
  }

}
