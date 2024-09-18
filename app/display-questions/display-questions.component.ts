import { Component, OnInit  } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-display-questions',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './display-questions.component.html',
  styleUrl: './display-questions.component.css'
})
export class DisplayQuestionsComponent  implements OnInit {

  questions: any[] = [];
  apiUrl = 'http://localhost:8080/question/AllQuestions';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    window.location.reload();
    this.fetchQuestions();

  }

  fetchQuestions(): void {
    this.httpClient.get<any[]>(this.apiUrl)
      .subscribe({
        next: (data) => {
          this.questions = data;
          console.log(this.questions);
        },
        error: (err) => console.log(err)
      });
  }

  updateQuestion(questionId: number): void {

    console.log('Update question with ID:', questionId);
  }

  deleteQuestion(questionId: number): void {
 
    const deleteUrl = `http://localhost:8080/question/delete/${questionId}`;
    
    this.httpClient.delete(deleteUrl)
      .subscribe({
        next: () => {
        
          this.questions = this.questions.filter(q => q.id !== questionId);
          console.log('Question deleted');
        },
        error: (err) => console.log(err)
      });
  }
}
