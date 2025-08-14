import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointEditModalComponent } from './point-edit-modal.component';

describe('PointEditModalComponent', () => {
  let component: PointEditModalComponent;
  let fixture: ComponentFixture<PointEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointEditModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
