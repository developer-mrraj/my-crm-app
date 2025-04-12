import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSellingItemsComponent } from './top-selling-items.component';

describe('TopSellingItemsComponent', () => {
  let component: TopSellingItemsComponent;
  let fixture: ComponentFixture<TopSellingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSellingItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSellingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
