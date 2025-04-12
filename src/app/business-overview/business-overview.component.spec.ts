import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOverviewComponent } from './business-overview.component';

describe('BusinessOverviewComponent', () => {
  let component: BusinessOverviewComponent;
  let fixture: ComponentFixture<BusinessOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
