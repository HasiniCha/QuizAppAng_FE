// src/app/services/question.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../interfaces/question.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questions: Question[] = [
    {
        id:'5',
        question: 'any',
        options: {
          A: 'a',
          B: 'b',
          C: 'c',
          D: 'd'
        },
    },
    // Add more questions here as needed
  ];

  private questionsSubject = new BehaviorSubject<Question[]>(this.questions);
  questions$ = this.questionsSubject.asObservable();

  getAllQuestions() {
    return this.questions$;
  }

  addQuestion(newQuestion: Question) {
    this.questions.push(newQuestion);
    this.questionsSubject.next(this.questions);
  }

  updateQuestion(updatedQuestion: Question) {
    const index = this.questions.findIndex((q) =>parseInt( q.id) ===parseInt( updatedQuestion.id));
    if (index !== -1) {
      this.questions[index] = updatedQuestion;
      this.questionsSubject.next(this.questions);
    }
  }

  deleteQuestion(id: number) {
    this.questions = this.questions.filter((q) => parseInt(q.id) !== id);
    this.questionsSubject.next(this.questions);
  }
}
