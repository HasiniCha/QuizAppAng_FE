import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [HttpClientModule, CommonModule, FormsModule],
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstname: string = '';
  lastname: string = '';

  constructor(private router: Router, private httpClient: HttpClient) {} 

  onSignup(form: NgForm) {
    if (form.invalid) {
      alert('Please fill all the required fields.');
      return;
    }

    if (form.value.password === form.value.confirmPassword) {
      const newUser = {
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        email: form.value.email,
        password: form.value.password,
      };

      this.httpClient.post('http://localhost:8080/api/v1/auth/register', newUser)
        .subscribe({
          next: (response) => {
            console.log("User registered successfully:", response);
            form.reset();
            this.router.navigate(['/login']);
          },
          error: (err) => console.error("Error registering user:", err),
        });
    } else {
      alert('Passwords do not match. Please try again.');
    }
  }
}
