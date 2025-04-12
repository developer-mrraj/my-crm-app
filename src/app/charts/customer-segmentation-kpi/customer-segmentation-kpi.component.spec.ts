import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSegmentationKpiComponent } from './customer-segmentation-kpi.component';

describe('CustomerSegmentationKpiComponent', () => {
  let component: CustomerSegmentationKpiComponent;
  let fixture: ComponentFixture<CustomerSegmentationKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSegmentationKpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSegmentationKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
