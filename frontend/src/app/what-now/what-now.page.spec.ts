import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatNowPage } from './what-now.page';

describe('WhatNowPage', () => {
  let component: WhatNowPage;
  let fixture: ComponentFixture<WhatNowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatNowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
