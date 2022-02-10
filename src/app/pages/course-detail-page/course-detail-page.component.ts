import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-detail-page',
  templateUrl: './course-detail-page.component.html',
  styleUrls: ['./course-detail-page.component.scss']
})
export class CourseDetailPageComponent implements OnInit {

  courseId: string = '';
  course: any;
  currentURL: string = '';
  previousURL: string = '';
  safeURL : any;

  constructor(
    private courseService: CourseService,
    private route : ActivatedRoute,
    private router: Router,
    private _sanitizer:  DomSanitizer ) {
      
      let youtubeLink : string = 'https://www.youtube.com/watch?v=k5E2AVpwsko';
      youtubeLink = youtubeLink.replace('watch?v=','embed/');
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(youtubeLink);
     }

     /**
      *  for getting the course id from the url 
      */
  ngOnInit(): void {
    this.route.params.subscribe( params =>
      this.courseId = params['id']
    );

    this.courseService.getCourse(this.courseId).subscribe(
      (course) => {
        this.course = course;
      }
    );

    this.currentURL = this.router.url;
  }

  /**
   * 
   * @param originalPrice original cost of a thing
   * @param discount discount percentage for that thing
   * @returns price of thing after giving that discount on that
   */
  calculateDiscountPrice(originalPrice: number , discount: number) {
    if(discount ===0 || discount === null)
      return originalPrice;
    else
      return discount;
  }

  /**
   * 
   * @param courseId unique name for finding the course
   *  
   *  this method is used to place the course into the cart
   */
  addToCart(courseId: string){
    if(this.courseService.checkCourseIsPresentInWishList(courseId)){
      this.courseService.deleteFromWishList(courseId);
    }
    this.courseService.moveToCartList(courseId);
  }

  /**
   * 
   * @param courseId unique name for finding the course
   * 
   *  this method is used to place the course into the wishlist
   */
  addToWishList(courseId: string){
    if(this.courseService.checkCourseIsPresentInCart(courseId)){
      this.courseService.deleteFromCartList(courseId);
    }
    this.courseService.moveToWishList(courseId);
  }
}
