import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizEndingInterfaceComponent } from './quiz-ending-interface/quiz-ending-interface.component';
import { QuizInterfaceComponent } from './quiz-interface/quiz-interface.component';
import { PostsComponent } from './posts/posts.component';
import { DisplayQuestionsComponent } from './display-questions/display-questions.component';
import { LoginComponent} from './login/login.component';
import { SignupComponent} from './signup/signup.component';
import {QuestionListComponent } from './question-list/question-list.component';
import { UpdateComponent } from './update/update.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    // { path: 'home', component: HomeComponent },
    { path: 'quiz/:id', component: QuizInterfaceComponent },
    { path: 'end', component:  QuizEndingInterfaceComponent},
    { path: 'add/:id', component:  PostsComponent},
    { path: 'que', component:  DisplayQuestionsComponent },
    { path: 'login', component:  LoginComponent},
    { path: 'signup', component:  SignupComponent},
    { path: 'home', component:  QuestionListComponent},
    { path: 'update', component:  UpdateComponent},
    { path: '**', redirectTo: '/list' }
];

