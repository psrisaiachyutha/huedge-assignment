import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
@Component({
  selector: 'app-coursespage',
  templateUrl: './coursespage.component.html',
  styleUrls: ['./coursespage.component.scss']
})
// export class CoursespageComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
export class CoursespageComponent implements OnInit {

  allCourses : any[] = [];
  cartList : any[] = [];
  cartAmount : number = 0;
  searchList: any[] = [];
  searchValue : string = '';
  displayList: any[] = [];
  coursesPerPage : number = 4;
  currentPage : number = 1;
  paginationIndexes: number[] = [];

  constructor(private courseService : CourseService) { }

  /**
   *  for getting the data
   */
  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(
      (courses) => {
        this.allCourses = courses;
        this.makeDisplayList(1);
        this.currentPage = 1;
        this.paginationIndexes = [];
        for(let i=0;i<Math.ceil(this.allCourses.length/this.coursesPerPage);i++){
          this.paginationIndexes.push(i+1);
        }
        // console.log(this.allCourses)
      }
    );

    this.courseService.getCartList().subscribe(
      (courses) => {
        this.cartList = courses;
        this.calculateCartCost();
        console.log('cart list is',this.cartList);
      }
    );

    
  }

  /**
   * 
   * @param val : val is the pagenumber to visit
   * @returns void or undefined
   *  
   *  this method is used to for placing what courses to be shown in the given page number
   */
  makeDisplayList(val: number){
    // console.log(` iam beging called ${val}`);
    if(val === -1 || val === Math.ceil(this.allCourses.length/this.coursesPerPage) + 1){return;}
    let start = (val - 1) * this.coursesPerPage;
    this.currentPage = val;
    this.displayList = this.allCourses.slice(start,start + this.coursesPerPage);
  }

  /**
   *  this method is used for calculating the cart value
   */
  private calculateCartCost(){
    let cost:number = 0;
    this.cartList.forEach((course) => {
      cost += parseFloat(this.calculateDiscount(course.actual_price , course.discounted_price).toString());
    });
    console.log(typeof(cost),cost);
    this.cartAmount = parseFloat(cost.toString());
  }

  /**
   * 
   * @param originalCost price of original product
   * @param discount discount percentage value
   * @returns  cost of the price after giving discount
   * 
   */
   calculateDiscount(originalCost: number , discount: number): number{
    // console.log(originalCost * ((100 - discount)/100));
    //return originalCost * ((100 - discount)/100);
    if(discount === 0 || discount === null){
      return originalCost;
    }
    return discount;
  }

  /**
   * 
   * @param courseId unique name of the course for finding it
   * 
   *  this method is used for adding the course to cart
   */
  addToCart = (courseId: string) => {
    this.courseService.moveToCartList(courseId);
    this.calculateCartCost();
    // console.log("adding to cart ",courseId);
  }

  /**
   * 
   * @param courseId unique name for finding the course
   * 
   *  this method is used for adding the course into the wish list
   */
  addToWishList = (courseId: string) => {
    this.courseService.moveToWishList(courseId);
  }
  
  /**
   * 
   * @param courseId unique name for finding the course
   * 
   *  this method i sused for deleting the course from wishlist
   */
  deleteFromWishList = (courseId: string) => {
    this.courseService.deleteFromWishList(courseId);
  }

  /**
   * 
   * @param index of the iterating course
   * @param course object
   * @returns unique value from that object
   */
  courseTracking(index: number,course: any){
    return course.id;
  }

  /**
   * 
   * @param event it is the event generated when we change the value in the select option
   * 
   *  this method is used to make the courses sorted based on their prices from lowToHigh
   *  or from highToLow
   */
  sortAllCourses(event: any){
   
    let value = event.target.value;
    if(value === 'lowToHigh'){
      this.allCourses.sort((a,b) => (this.calculateDiscount(a.actual_price,a.discounted_price) > this.calculateDiscount(b.actual_price,b.discounted_price)) ? 1 : ((this.calculateDiscount(b.actual_price,b.discounted_price) > this.calculateDiscount(a.actual_price,a.discounted_price)) ? -1 : 0));
    }else if(value === 'highToLow'){
      this.allCourses.sort((a,b) => (this.calculateDiscount(a.actual_price,a.discounted_price) < this.calculateDiscount(b.actual_price,b.discounted_price)) ? 1 : ((this.calculateDiscount(b.actual_price,b.discounted_price) < this.calculateDiscount(a.actual_price,a.discounted_price)) ? -1 : 0));

    }
    this.currentPage = 1;
    this.makeDisplayList(this.currentPage);
  }

  /**
   * 
   * @param event thsi is the event raised when we type in the input field text
   * 
   *  this method uses that event.target.value and searches those value in the courses tags
   *  to show those courses
   */
  search(event: any){
    let value: string = event.target.value;
    value = value.toLowerCase();
    this.searchValue = value;
    // console.log(value);
    this.searchList = [];
    for(let index = 0;index < this.allCourses.length; index++ ){
      let tags = this.allCourses[index].tags;
      let present: boolean = false;
      // console.log(tags)
      for(let tagIndex = 0; tagIndex < tags.length ; tagIndex++){
        if(tags[tagIndex].toLowerCase().indexOf(value) !== -1){
          present = true;
          // console.log(tags[tagIndex])
          break;
        }
      }
      if(present){
        this.searchList.push(this.allCourses[index]);
      }
    }
    // console.log(this.searchList);
  }

}

