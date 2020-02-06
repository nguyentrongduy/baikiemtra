import { Component, OnInit, Input, Output } from '@angular/core';
import { IViewQuestion, IChangeAnswerEvent } from 'src/app/defines/question';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  constructor() {}
  @Input() question: IViewQuestion = null;
  @Input() index: number = null;
  @Output() changeAnswerEvent = new EventEmitter<IChangeAnswerEvent>();

  ngOnInit() {
    console.log(this.question);
    console.log(this.index);
  }

  onChangeAnswer(questionIndex: number, answerIndex: number): void {
    console.log(questionIndex);
    console.log(answerIndex);
    this.changeAnswerEvent.emit(questionIndex, answerIndex);
  }
}
