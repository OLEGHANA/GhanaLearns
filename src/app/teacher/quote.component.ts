import { Component } from '@angular/core';
import { quotes } from '../shared/quotes';

@Component({
  template: `
  <p>{{currentQuote.msg}}</p>
  By: {{currentQuote.author}}
    `
})
export class QuoteComponent {

  quotes = quotes;
  currentQuote: any;

  constructor() {
    this.currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  }
}
