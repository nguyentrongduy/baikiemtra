import { Component, OnInit, OnDestroy } from '@angular/core';
import content from '../../../../Data/Data.json';
import { IQuestion, IViewQuestion, IChangeAnswerEvent } from '../defines/question.js';

const MAX_EXECUTION_TIME = 3600000;
const MAX_QUESTION_IN_TEST = 60;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy {
  quantityQuestionCorrect: number;
  constructor() {}
  public readonly maxExectionTime =
    Math.floor(
      (MAX_EXECUTION_TIME % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ) +
    'giờ ' +
    Math.floor((MAX_EXECUTION_TIME % (1000 * 60 * 60)) / (1000 * 60)) +
    'phút ' +
    Math.floor((MAX_EXECUTION_TIME % (1000 * 60)) / 1000) +
    'giây ';
  public timeShowTxt = 'Thời gian làm bài ' + this.maxExectionTime;
  public readonly questionQuantity =
    MAX_QUESTION_IN_TEST > content.length
      ? content.length
      : MAX_QUESTION_IN_TEST;

  private _timeInterVal = null;
  public testInprogress = false;
  public isFirstTest = true;
  get startText() {
    return this.isFirstTest ? 'Bắt đầu' : 'Kiểm tra lại';
  }
  public endText = 'Nộp bài';
  private timer: number;
  public questions: IViewQuestion[];
  private userAnswers: IChangeAnswerEvent[] = [];

  onClickStartTest() {
    window.scrollTo(0, 0);
    this.testInprogress = true;
    this.isFirstTest = false;
    this.timer = MAX_EXECUTION_TIME;

    this.questions = this.getQuestionWithIndexs(this.getrandomIndex());
    // Update the count down every 1 second
    this._timeInterVal = setInterval(this.handleTimeInterVal.bind(this), 1000);
  }

  onClickDone() {
    this.testInprogress = false;
    this.clearTimeInterVal();
    this.quantityQuestionCorrect = this.getResultCorrect();
    window.scrollTo(0, 0);
  }

  private handleTimeInterVal = function() {
    this.timeShowTxt = this.getTimeString(this.timer);

    this.timer -= 1000;
    // If the count down is over, write some text
    if (this.timer <= 0 || !this.testInprogress) {
      clearInterval(this._timeInterVal);
      // this.timeShowTxt = "Kết quả";
    }
  };

  private clearTimeInterVal() {
    // this.timer = 0;
  }

  private getTimeString(timespan): string {
    let result = '';
    // Time calculations for days, hours, minutes and seconds
    // let days = Math.floor(timespan / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timespan % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timespan % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timespan % (1000 * 60)) / 1000);

    // result = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    result = hours + 'giờ ' + minutes + 'phút ' + seconds + 'giây ';
    return result;
  }

  private getrandomIndex(): number[] {
    const arr = [];
    while (arr.length < this.questionQuantity) {
      const r = Math.floor(Math.random() * content.length) + 1;
      if (arr.indexOf(r) === -1) { arr.push(r); }
    }
    return arr;
  }

  private getQuestionWithIndexs(indexs: number[]): IViewQuestion[] {
    const questions: IViewQuestion[] = [];
    indexs.forEach(idx => {
      questions.push(Object.assign(content[idx], {rootIndex: idx}));
    });
    return questions;
  }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true); // third parameter
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (event): void => {
    // handle your scroll here
    // notice the 'odd' function assignment to a class field
    // this is used to be able to remove the event listener
    const header = document.getElementById('testing-control');
    const sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }

  onChangeAnswer(result: IChangeAnswerEvent): void {
    const checkExist = this.userAnswers.find(f => f.questionIndex === result.questionIndex);
    if (checkExist === undefined) {
      this.userAnswers.push(result);
    } else {
      checkExist.answerIndex = result.answerIndex;
    }
  }

  getResultCorrect(): number {
    let quantityQuestionCorrect = 0;
    for (const answ of this.userAnswers) {
      const rootItem = this.questions.find(f => f.rootIndex === answ.questionIndex);
      if (rootItem && answ.answerIndex === rootItem.correctAnswer) {
        quantityQuestionCorrect++;
      }
    }
    return quantityQuestionCorrect;
  }
}
