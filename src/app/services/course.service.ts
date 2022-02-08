import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as courseData from '../../assets/data/assignment_sample';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private allCourses : any;

  private wishList : any[] = [];

  private cartList : any[] = [];

  constructor() {
    this.allCourses = courseData.default;
   }

   /**
    * 
    * @returns all courses as an array of observable
    */
  getAllCourses() {
    return of(this.allCourses);
  }

  /**
   * 
   * @returns wishlist data as an array of observable
   */
  getWishList() {
    return of(this.wishList);
  }

  /**
   * 
   * @returns cartlist data as an array of observable
   */
  getCartList() {
    return of(this.cartList);
  }

  /**
   * 
   * @param courseId this  is the parameter send to it to find the particular course
   * @returns this doesnot returns anything
   * 
   *  the use of this function is to add a course to the cartList
   */
  moveToCartList(courseId : string) {
    if(this.checkCoursePresentInList(this.cartList , courseId)){
      alert('course already present in cart list')
      return;
    }
    this.cartList.push(this.getCourseFromAllCourses(courseId));
    alert('course added to cart list')

  }

  /**
   * 
   * @param courseId this is to identify the course 
   * @returns ( void ) nothing is returned
   *  the use of this method is placing a course into wishlist
   */
  moveToWishList(courseId : string) {
    
    if(this.checkCoursePresentInList(this.wishList , courseId)){
      alert('course is already present in wishlist');
      return;
    }
    this.wishList.push(this.getCourseFromAllCourses(courseId));
    alert('course added to wish list');
  }

  /**
   * 
   * @param courseId this is to identify course before deleting it
   * 
   *  the use of this method is to delete the course from the wish list
   */
  deleteFromWishList(courseId: string) {
    for( let index = 0; index < this.wishList.length; index++){ 
      if ( this.wishList[index].id === courseId) { 
          this.wishList.splice(index, 1); 
          index--;
          break;
      }}
      alert('deleting course from wishlist');
  }

  /**
   * 
   * @param courseId this is to identify the course before deleting it
   *  
   *  the use of this method is to deleter the course from cart list
   */
  deleteFromCartList(courseId: string) {
    for( let index = 0; index < this.cartList.length; index++){ 
      if ( this.cartList[index].id === courseId) { 
          this.cartList.splice(index, 1); 
          index--;
          break;
      }}
      alert('deleting course from cartlist')
  }

  /**
   * 
   * @param list this is an array of course objects
   * @param courseId this is to find the course
   * @returns true or false
   *  
   *  the use of this method is to find a course present in the passed list
   *  based on the courseId parameter present in the object
   */
  private checkCoursePresentInList(list: any[] , courseId : string): boolean{
    let ans: boolean = false;
    list.forEach((course) =>{
      if(course.id === courseId){
        ans = true;
      }
    } );
    return ans;
  }

  /**
   * 
   * @param courseId name of the course id
   * @returns a course object or returns undefined
   * 
   *  this method will try to find the course from the all courses present
   *  if it finds it will return that course else it will return undefined
   */
  private getCourseFromAllCourses(courseId: string){
    for(let index = 0 ; index < this.allCourses.length ; index++){
      if(this.allCourses[index].id === courseId){
        return this.allCourses[index];
      }
    }
    return undefined;
  }

  /**
   * 
   * @param courseId for finding the course
   * @returns  a course object in the form of  an observable
   */
  getCourse(courseId: string) {
   return of(this.getCourseFromAllCourses(courseId));
  }

  /**
   *  this method is to clear cart entirely
   */
  clearCartList() {
    this.cartList = [];
  }
}