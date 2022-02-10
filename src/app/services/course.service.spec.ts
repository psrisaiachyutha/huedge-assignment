import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import * as courseData from '../../assets/data/assignment_sample';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all courses', () => {
    service.getAllCourses().subscribe(
      data => {
        expect(data.length).toBe(courseData.default.length);
      }
    )
  })

  it('should return all courses in wishlist', () => {
    service.getWishList().subscribe(
      data => {
        expect(data.length).toBe(0);
      }
    )
  })

  it('should return all courses in cart', () => {
    service.getCartList().subscribe(
      data => {
        expect(data.length).toBe(0);
      }
    )
  })

  it('should move course to cart if it is present in courses', () => {
    service.moveToCartList('1');
    service.getCartList().subscribe(
      data => {
        expect(data.length).toBe(1);
        expect(data[0].title).toBe("doloribus sapiente facere sit laborum qui");
      }
    );
  })

  it('should move course to wishlist if it is present in courses', () => {
    service.moveToWishList('1');
    service.getWishList().subscribe(
      data => {
        expect(data.length).toBe(1);
        expect(data[0].title).toBe("doloribus sapiente facere sit laborum qui");
      }
    );
  })

  it('should delete course from wishlist if it is present in wishlist', () => {
    service.moveToWishList('1');
    service.deleteFromWishList('1');
    service.getWishList().subscribe(
      data => {
        expect(data.length).toBe(0);
       
      }
    );
  })

  it('should delete course from cartlist if it is present in cartlist', () => {
    service.moveToCartList('1');
    service.deleteFromCartList('1');
    service.getCartList().subscribe(
      data => {
        expect(data.length).toBe(0);    
      }
    );
  })

  it('should return course if it is present in allCourses', () => {
    service.getCourse('1').subscribe(
      data => {
        expect(data).toBeTruthy();
        expect(data.author).toBe("Arthur Hansen");
      }
    )
  })

  it('should return clear cart list', () => {
    service.moveToCartList('1');
    service.moveToCartList('2');
    service.moveToCartList('3');
    service.getCartList().subscribe(
      data => {
        expect(data.length).toBe(3);
      }
    );
    // now clearing the data in cartlist
    service.clearCartList();
    service.getCartList().subscribe(
      data => {
        expect(data.length).toBe(0);
        
      }
    );
  })

  it('should check course is already present in wish list', () => {
    service.moveToWishList('1');
    var value = service.checkCourseIsPresentInWishList('1');
    expect(value.author).toBe("Arthur Hansen");
    
  })

  it('should check course is already present in cart list', () => {
    service.moveToCartList('1');
    var value = service.checkCourseIsPresentInCart('1');
    expect(value.author).toBe("Arthur Hansen");
    
  })

});
