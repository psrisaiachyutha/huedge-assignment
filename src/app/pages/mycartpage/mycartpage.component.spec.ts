import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycartpageComponent } from './mycartpage.component';

describe('MycartpageComponent', () => {
  let component: MycartpageComponent;
  let fixture: ComponentFixture<MycartpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycartpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MycartpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
