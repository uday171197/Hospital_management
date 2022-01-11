import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSubadminComponent } from './header-subadmin.component';

describe('HeaderSubadminComponent', () => {
  let component: HeaderSubadminComponent;
  let fixture: ComponentFixture<HeaderSubadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSubadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSubadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
