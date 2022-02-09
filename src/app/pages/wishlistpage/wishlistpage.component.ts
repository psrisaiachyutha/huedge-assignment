import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-wishlistpage',
  templateUrl: './wishlistpage.component.html',
  styleUrls: ['./wishlistpage.component.scss']
})
// export class WishlistpageComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
export class WishlistpageComponent implements OnInit {

  wishList : any[] = [];
  cartList: any[] = [];
  cartAmount: number = 0; 
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getWishList().subscribe(
      (courses) => {
        this.wishList = courses;
        // console.log('getting courses for wishlist');
      }
    );
    this.courseService.getCartList().subscribe(
      (courses) => {
        this.cartList = courses;
        this.calculateCartCost();
      }
    );
  }

  /**
   *  for calculating the cart value
   */
  private calculateCartCost(){
    // let cost:number = 0;
    // this.cartList.forEach((course) => {
    //   cost += this.calculateDiscount(course.price , course.discount);
    // });
    // this.cartAmount = cost;
    let cost:number = 0;
    this.cartList.forEach((course) => {
      cost += parseFloat(this.calculateDiscount(course.actual_price , course.discounted_price).toString());
    });
    console.log(typeof(cost),cost);
    this.cartAmount = parseFloat(cost.toString());
  }

  /**
   * 
   * @param originalCost price of the thing
   * @param discount percentage on that thing
   * @returns value of the price of thing after giving that much discount
   */
   calculateDiscount(originalCost: number , discount: number): number{
    
    if(discount === 0 || discount === null){
      return originalCost;
    }
    return discount;
  }

  /**
   * 
   * @param courseId unique value for finding the course
   * 
   *  for adding the course to the cart
   */
  addToCart = (courseId: string) => {
    this.courseService.moveToCartList(courseId);
    this.calculateCartCost();
  }

  /**
   * 
   * @param courseId unique value for finding the course
   *  
   *  for deleting the course from the wishlist
   */
  deleteFromWishList = (courseId: string) => {
    this.courseService.deleteFromWishList(courseId);
  }

  /**
   * 
   * @param event raised when we modify the option in the select tag
   * 
   *  this  method will sort the things from lowToHIgh or 
   *  from highToLow based on the selected option value
   */
  sortWishList(event: any){
   
    let value = event.target.value;
    if(value === 'lowToHigh'){
      this.wishList.sort((a,b) => (this.calculateDiscount(a.price,a.discount) > this.calculateDiscount(b.price,b.discount)) ? 1 : ((this.calculateDiscount(b.price,b.discount) > this.calculateDiscount(a.price,a.discount)) ? -1 : 0));
    }else if(value === 'highToLow'){
      this.wishList.sort((a,b) => (this.calculateDiscount(a.price,a.discount) < this.calculateDiscount(b.price,b.discount)) ? 1 : ((this.calculateDiscount(b.price,b.discount) < this.calculateDiscount(a.price,a.discount)) ? -1 : 0));

    }
  }

}
