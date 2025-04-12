import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSalesKPIComponent } from './total-sales-kpi.component';

describe('TotalSalesKPIComponent', () => {
  let component: TotalSalesKPIComponent;
  let fixture: ComponentFixture<TotalSalesKPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalSalesKPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSalesKPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
