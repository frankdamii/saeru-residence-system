import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitationDialog } from './habitation-dialog';

describe('HabitationDialog', () => {
  let component: HabitationDialog;
  let fixture: ComponentFixture<HabitationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitationDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
