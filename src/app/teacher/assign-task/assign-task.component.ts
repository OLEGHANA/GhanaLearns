import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss']
})
export class AssignTaskComponent implements OnInit {

  assignTaskItem = [
    { id: 1, image: 'cards/notes.svg', name: 'My Library', viewLink: '/teacher/assign-task/my-library'},
    { id: 2, image: 'cards/clipboards.svg', name: 'Audio Books', viewLink: '/teacher/assign-task/audio-books'},
    { id: 3, image: 'cards/notepad.svg', name: 'Video Books', viewLink: '/teacher/assign-task/video-books'},
    { id: 4, image: 'cards/bookshelf.svg', name: 'Phonics', viewLink: '/teacher/assign-task/phonics'},
    { id: 5, image: 'cards/studying.svg', name: 'Listen & Find', viewLink: '/teacher/assign-task/listen-and-find'},
    { id: 6, image: 'cards/feedback.svg', name: 'Fill In The Blanks', viewLink: '/teacher/assign-task/fill-in-blanks'},
    { id: 7, image: 'cards/school.svg', name: 'Word Formation', viewLink: '/teacher/assign-task/word-formation'},
    { id: 8, image: 'cards/settings.svg', name: 'Unjumble', viewLink: '/teacher/assign-task/unjumble'},
    { id: 9, image: 'cards/settings.svg', name: 'Word Power', viewLink: '/teacher/assign-task/word-power'}
  ];

  ngOnInit() {
  }

  constructor() {
  }
}
