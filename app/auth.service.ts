// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   isLoggedIn() {
//     throw new Error('Method not implemented.');
//   }
//   private apiUrl = 'http://localhost:8080/api/v1/auth'; // Replace with your API URL
//   private authToken: string;

//   private tokenSubject = new BehaviorSubject<string | null>(null);
//   token$ = this.tokenSubject.asObservable();

//   constructor(private http: HttpClient) {}

//   login(email: string, password: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/authenticate`, { email, password })
//       .pipe(
//         tap(response => {
//           this.authToken = response.access_token;
//           localStorage.setItem('access_token', this.authToken);
//           this.tokenSubject.next(this.authToken);
//         })
//       );
//   }

//   logout(): void {
//     this.authToken = null;
//     localStorage.removeItem('access_token');
//     this.tokenSubject.next(null);
//   }

//   refreshToken(): Observable<any> {
//     const refreshToken = localStorage.getItem('refresh_token');
//     return this.http.post<any>(`${this.apiUrl}/refresh`, { refresh_token: refreshToken })
//       .pipe(
//         tap(response => {
//           this.authToken = response.access_token;
//           localStorage.setItem('access_token', this.authToken);
//           this.tokenSubject.next(this.authToken);
//         })
//       );
//   }

//   getAuthToken(): string | null {
//     return this.authToken || localStorage.getItem('access_token');
//   }

//   private getHeaders(): HttpHeaders {
//     return new HttpHeaders({
//       'Authorization': `Bearer ${this.getAuthToken()}`
//     });
//   }
// }
