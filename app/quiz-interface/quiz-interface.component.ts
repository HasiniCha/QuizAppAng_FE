import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Question } from '../interfaces/question.interface';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import confetti from 'canvas-confetti';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-interface',
  templateUrl: './quiz-interface.component.html',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  styleUrls: ['./quiz-interface.component.css']
})
export class QuizInterfaceComponent {

  httpClient = inject(HttpClient);  
  route = inject(ActivatedRoute);  
  public data: Array<any> = [];
  currentQuestionIndex = 0;
  isAnswerSelected = false;
  selectedOptionKey: keyof Question['options'] | null = null;
  clickedOptionKey: string | null = null;
  optionKeys: Array<keyof Question['options']> = ['A', 'B', 'C', 'D'];
  totalMarks = 0;
  isUpdating = false;
  listId: BigInt = BigInt(0); 
  selectedWrongAnswerFirst = false;
  createnew = false;

  constructor(private router: Router) {}

  updateQue(id: number): void {
    this.isUpdating = true;
    this.router.navigate(['/update', id]);  
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listId = params['id'];  
      console.log('List ID:', this.listId);
  
      this.httpClient.get(`http://localhost:8080/question/list/${this.listId}`)
        .subscribe({
          next: (data: any) => {
            console.log('Received data:', data);
            this.data = data;  
            this.createnew = this.data.length === 0;  
          },
          error: (err: any) => console.log('Error fetching data:', err)
        });
    });
  }

  triggerConfetti(): void {
    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.2 }  
    });
  }

  triggerVibration(): void {
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]); 
    }
  }

  selectAnswer(optionKey: keyof Question['options']): boolean {
    this.clickedOptionKey = optionKey;
    const currentQuestion = this.data[this.currentQuestionIndex];
    const isCorrect = optionKey === currentQuestion.answer;

    if (isCorrect) {
      this.isAnswerSelected = true;
      this.triggerConfetti();  
    } else {
      this.triggerVibration();  
      this.selectedWrongAnswerFirst = true;
    }

    return isCorrect;
  }

  isCorrect(optionKey: keyof Question['options']): boolean {
    const currentQuestion = this.data[this.currentQuestionIndex];
    return this.isAnswerSelected && optionKey === currentQuestion.answer;
  }

  prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.resetSelection();
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.data.length - 1) {
      this.currentQuestionIndex++;
      this.resetSelection();
    } else {
      this.totalMarks = (this.totalMarks / this.data.length) * 100;
      this.endQuiz(this.listId);
    }
  }

  resetSelection(): void {
    this.isAnswerSelected = false;
    this.selectedOptionKey = null;
    this.clickedOptionKey = null;
  }

  endQuiz(listId: BigInt): void {
    this.router.navigate(['/end'], { 
      state: { 
        totalMarks: this.totalMarks, 
        listId: listId 
      } 
    });
  }

  deleteQue(id: number): void {
    this.httpClient.delete(`http://localhost:8080/question/delete/${id}`)
      .pipe(
        tap(() => {
          this.data = this.data.filter(q => q.id !== id); 
          this.resetSelection();
          if (this.data.length === 0) {
            this.createnew = true; 
          }
        }),
        catchError((err: any) => of(null))
      ).subscribe();
  }

  Post(): void {
    this.router.navigate(['/add', this.listId]);
  }
}
