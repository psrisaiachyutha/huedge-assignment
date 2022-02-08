import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() courseId: string = '';
  @Input() courseTitle: string = '';
  @Input() tags: string[] = [];
  @Input() courseCreater : string = '';
  @Input() isInCart: boolean = false;
  @Input() originalPrice : number = 0;
  @Input() discount: number = 0;
  @Input() showStars: boolean = true;
  @Input() showDiscount: boolean = true;
  @Input() showDelete: boolean = true;
  @Input() showArrow: boolean = true;
  @Input() showMoveToWishListText: boolean = true;
  @Input() showAddToCart: boolean = true;
  @Input() arrowLink: string = '';
  @Input() addToCartFunction : (val: string) => void = (val:string) => {this.isInCart = true;};
  @Input() addToWishListFunction: (val: string) => void = (val: string) => {this.isInCart = false;};
  @Input() deleteFromListFunction: (val : string) => void = (val: string) => {};
  displayPrice : number = 0;
  constructor() { }

  ngOnInit(): void {
    //this.calculatePriceAfterDiscount(this.originalPrice,this.discount);
    if(this.discount === null || this.discount === 0){
      this.displayPrice = this.originalPrice;
    }else{
      this.displayPrice  = this.discount;
    }
   
  }

   private calculatePriceAfterDiscount(originalCost: number ,discount : number){
      this.displayPrice = originalCost * ((100 - discount) / 100);
   }

   toggleState(){
     this.isInCart = !this.isInCart;
   }

}
