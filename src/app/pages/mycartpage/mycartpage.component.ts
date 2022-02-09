import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-mycartpage',
  templateUrl: './mycartpage.component.html',
  styleUrls: ['./mycartpage.component.scss']
})
export class MycartpageComponent implements OnInit {

  cartAmount: number = 0;
  savedAmount: number = 0;
  cartList: any[] = [];
  allCourses: any[] = [];
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    

    this.courseService.getCartList().subscribe(
      (courses) => {
        this.cartList = courses;
        this.calculateCartCost();
      }
    );

    this.getCoursesNotPresentInCart();
  }


  private getCoursesNotPresentInCart() {
    this.allCourses = [];
    let courseIdsSet = new Set<Number>();
    this.cartList.forEach(course => {courseIdsSet.add(course.id)});
    this.courseService.getAllCourses().subscribe(
      (courses) => {
        let count = 0;
        for(let course of courses){
          if(count === 2) break;
          if(courseIdsSet.has(course.id))continue;
          this.allCourses.push(course);
          courseIdsSet.has(course.id);
          count += 1;
        }
      }
    );
  }

  /**
   *  for calculating the cart value and also the discount amout they gained or 
   *  how much amount the people are saving
   */
  private calculateCartCost(){
    let cost:number = 0;
    this.savedAmount = 0;
    this.cartList.forEach((course) => {
      cost += parseFloat(this.calculateDiscount(course.actual_price , course.discounted_price).toString());
      this.savedAmount += parseFloat(this.calculateReducedAmount(course.actual_price , course.discounted_price).toString());
    });
    this.cartAmount = parseFloat(cost.toString());
  }

  /**
   * 
   * @param originalCost real price of a thing
   * @param discount percentage on that thing
   * @returns  price after giving the discount
   */
   calculateDiscount(originalCost: number , discount: number): number{
    if(discount === 0 || discount === null){
      return originalCost;
    }
    return discount;
  }

  /**
   * 
   * @param originalCost real price of the thing
   * @param discount percentage on the thing
   * @returns amount that reduced on the original cost
   */
  calculateReducedAmount(originalCost: number , discount: number){
    if(discount === 0 || discount === null || originalCost < discount){
      return 0;
    }
    return originalCost - discount;
  }

  /**
   * 
   * @param courseId unique value for finding the course
   * 
   *  this method is used for adding the course to cart
   */
  addToCart = (courseId: string) => {
    this.courseService.moveToCartList(courseId);
    this.calculateCartCost();
    this.getCoursesNotPresentInCart();
  }

  /**
   * 
   * @param courseId unique value for finding the course
   * 
   *  this method is used for adding the course to wishlist
   */
  addToWishList = (courseId: string) => {
    this.courseService.moveToWishList(courseId);
    this.deleteFromCartList(courseId);
  }

  /**
   * 
   * @param courseId unique value for finding the course
   *  
   *  this method is for deleting the course from the wishlist
   */
  deleteFromWishList = (courseId: string) => {
    this.courseService.deleteFromWishList(courseId);
    
  }

  /**
   * 
   * @param courseId unique value for finding the course
   * 
   *  this method is used for deleting the course from the cart list
   */
  deleteFromCartList = (courseId: string) => {
    this.courseService.deleteFromCartList(courseId);
    this.calculateCartCost();
    this.getCoursesNotPresentInCart();
  }

  /**
   *  this method is for checking out the cart , for clearing the cart list
   */
  alertCheckingOut(){
    if(this.cartAmount <= 0 ){
      alert("cart is empty to order");
      return;
    }
    this.courseService.clearCartList();
    this.calculateCartCost();
    this.cartAmount = 0;
    this.cartList = [];
    alert("successfully ordered");
  }
}
