
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.email === 'test@example.com' && this.password === 'password') {
      alert('Login successful!');
      this.router.navigate(['/dashboard']); 
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }
}
