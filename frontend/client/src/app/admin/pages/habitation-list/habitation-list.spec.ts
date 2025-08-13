import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitationList } from './habitation-list';

describe('HabitationList', () => {
  let component: HabitationList;
  let fixture: ComponentFixture<HabitationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
