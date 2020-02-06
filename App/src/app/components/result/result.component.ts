import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor() { }
  @Input() quantityCorrect = 0;
  @Input() questionQuantity = 0;
  public isPass = false;

  ngOnInit() {
    if (this.quantityCorrect > 0 && this.questionQuantity > 0
      && (this.quantityCorrect / this.questionQuantity >= 0.5)) {
        this.isPass = true;
      } else {
        this.isPass = false;
      }
  }

}
