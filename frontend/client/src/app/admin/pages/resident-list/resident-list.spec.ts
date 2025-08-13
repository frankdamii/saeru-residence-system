import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentList } from './resident-list';

describe('ResidentList', () => {
  let component: ResidentList;
  let fixture: ComponentFixture<ResidentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
