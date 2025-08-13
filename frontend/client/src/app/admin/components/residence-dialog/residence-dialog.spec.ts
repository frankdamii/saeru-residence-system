import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceDialog } from './residence-dialog';

describe('ResidenceDialog', () => {
  let component: ResidenceDialog;
  let fixture: ComponentFixture<ResidenceDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenceDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidenceDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
