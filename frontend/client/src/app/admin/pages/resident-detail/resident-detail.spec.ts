import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentDetail } from './resident-detail';

describe('ResidentDetail', () => {
  let component: ResidentDetail;
  let fixture: ComponentFixture<ResidentDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
