import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should take given string as input', () => {
    component.data = "this is angular banner";
    fixture.detectChanges();
    var paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph.className).toEqual('mt-3');
    expect(paragraph.innerHTML).toBe("this is angular banner")
  });


});
