import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCardPopupComponent } from './share-card-popup.component';

describe('ShareCardPopupComponent', () => {
  let component: ShareCardPopupComponent;
  let fixture: ComponentFixture<ShareCardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareCardPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareCardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
