import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-ending-interface',
  standalone: true,
  templateUrl: './quiz-ending-interface.component.html',
  styleUrls: ['./quiz-ending-interface.component.css']
})
export class QuizEndingInterfaceComponent {
  totalMarks: number = 0;  
  listId: string = '';    
userScore: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.totalMarks = navigation.extras.state['totalMarks'];
      this.listId = navigation.extras.state['listId'];


      console.log('Total Marks:', this.totalMarks);
      console.log('List ID:', this.listId);
    }
  }
viewQuestionList() {
  this.router.navigate(['/list']);
}

}


