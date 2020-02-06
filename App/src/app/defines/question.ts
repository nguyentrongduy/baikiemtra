export interface IQuestion {
  question?: string;
  answers?: string[];
  correctAnswer?: number;
}

export interface IViewQuestion extends IQuestion {
    userAnswer?: number;
    rootIndex?: number;
}


export interface IChangeAnswerEvent {
    questionIndex: number;
    answerIndex: number;
}
