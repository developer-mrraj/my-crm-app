import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRevenueKPIComponent } from './total-revenue-kpi.component';

describe('TotalRevenueKPIComponent', () => {
  let component: TotalRevenueKPIComponent;
  let fixture: ComponentFixture<TotalRevenueKPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalRevenueKPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalRevenueKPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
