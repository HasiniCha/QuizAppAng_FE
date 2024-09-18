import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizEndingInterfaceComponent } from './quiz-ending-interface.component';

describe('QuizEndingInterfaceComponent', () => {
  let component: QuizEndingInterfaceComponent;
  let fixture: ComponentFixture<QuizEndingInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizEndingInterfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizEndingInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
