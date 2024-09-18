import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  standalone:true,
  imports: [HttpClientModule, CommonModule,FormsModule],
  styleUrls: ['./question-list.component.css']

})
export class QuestionListComponent {
  httpClient = inject(HttpClient);
  public data: Array<any> = [];
  isPopupVisible = false;
  isOptionsPopupVisible = false;
  isDeleteConfirmationVisible = false;
  newListName = '';
  isInvalidInput = false;
  selectedList: any = null;
  newListDescription: any;
  newListCategory: any;
  categories: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.httpClient.get('http://localhost:8080/api/question-lists').subscribe({
      next: (data: any) => {
        this.data = data;
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  openCreatePopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
    this.newListName = '';
    this.isInvalidInput = false;
  }

  saveList() {
    if (!this.newListName.trim()) {
      this.isInvalidInput = true;
      return;
    }

    const newList = {
      name: this.newListName,
    };

    this.httpClient.post('http://localhost:8080/api/question-lists', newList).subscribe({
      next: (response: any) => {
        this.data.push(response);
        this.closePopup();
      },
      error: (err: any) => {
        console.error('Error creating list:', err);
        this.isInvalidInput = true;
      },
    });
  }

  openOptionsPopup(item: any) {
    this.selectedList = item;
    this.isOptionsPopupVisible = true;
  }

  closeOptionsPopup() {
    this.isOptionsPopupVisible = false;
    this.selectedList = null;
  }

  openDeleteConfirmation(item: any, event: MouseEvent) {
    event.stopPropagation();
    this.selectedList = item;
    this.isDeleteConfirmationVisible = true;
  }

  closeDeleteConfirmation() {
    this.isDeleteConfirmationVisible = false;
    this.selectedList = null;
  }

  deleteList(id: number) {
    this.httpClient.delete(`http://localhost:8080/api/question-lists/${id}`).subscribe({
      next: () => {
        this.data = this.data.filter((list) => list.id !== id);
        this.closeDeleteConfirmation();
      },
      error: (err: any) => console.error('Error deleting list:', err),
    });
  }

  navigateToAddQuestion() {
    if (this.selectedList) {
      this.router.navigate(['/add', this.selectedList.id]);
    }
  }

  navigateToPractice() {
    if (this.selectedList) {
      this.router.navigate(['/quiz', this.selectedList.id]);
    }
  }
}
