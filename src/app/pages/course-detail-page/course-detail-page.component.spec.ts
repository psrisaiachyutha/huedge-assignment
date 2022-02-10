import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailPageComponent } from './course-detail-page.component';

describe('CourseDetailPageComponent', () => {
  let component: CourseDetailPageComponent;
  let fixture: ComponentFixture<CourseDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
