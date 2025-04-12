import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVsRepeatedKpiComponent } from './new-vs-repeated-kpi.component';

describe('NewVsRepeatedKpiComponent', () => {
  let component: NewVsRepeatedKpiComponent;
  let fixture: ComponentFixture<NewVsRepeatedKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewVsRepeatedKpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVsRepeatedKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
