import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CouchService } from '../../shared/couchdb.service';
import { nationalities } from '../../shared/constants';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {

  levelOpts = [];
  nationalityOpts = nationalities;
  facility: any;
  registerForm: FormGroup;

  constructor(
    private couchService: CouchService
  ) {
  }

  ngOnInit() {
    this.couchService.get('whoami/_all_docs?include_docs=true')
    .subscribe(data => {
      data.rows.map(row => {
        if (row.id === 'config') {
          this.levelOpts = row.doc.levels;
        }
        if (row.id === 'facility') {
          this.facility = row.doc;
        }
      });
    });
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      middleNames: new FormControl(),
      dateOfBirth: new FormControl(),
      nationality: new FormControl(),
      gender: new FormControl(),
      levels: new FormControl(),
      login: new FormControl(),
      pass: new FormControl(),
      phone: new FormControl()
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const defaultValue = {
        roles: [ 'student' ],
        facilityId: this.facility.facilityId,
        status: 'active',
        dateRegistered: Date.now(),
        kind: 'Member'
      }
      const data = { ...this.registerForm.value, ...defaultValue };
      console.log(data);
      this.couchService.post('members', data).subscribe(res => {
        console.log(res);
      });
    }
  }

}
