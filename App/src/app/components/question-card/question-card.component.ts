import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IViewQuestion, IChangeAnswerEvent } from 'src/app/defines/question';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  constructor() {}
  @Input() question: IViewQuestion = null;
  @Input() index: number = null;
  @Input() testInprogress: boolean ;
  @Output() changeAnswerEvent = new EventEmitter<IChangeAnswerEvent>();
  private answerIndex;

  ngOnInit() {
  }

  onChangeAnswer(questionIndex: number, answerIndex: number): void {
    this.answerIndex = answerIndex;
    this.changeAnswerEvent.emit({questionIndex, answerIndex});
  }
}
