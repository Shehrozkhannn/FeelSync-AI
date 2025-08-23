import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedTextareaComponent } from './animated-textarea.component';

describe('AnimatedTextareaComponent', () => {
  let component: AnimatedTextareaComponent;
  let fixture: ComponentFixture<AnimatedTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
