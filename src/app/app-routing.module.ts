import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CourseDetailPageComponent } from './pages/course-detail-page/course-detail-page.component';
import { CoursespageComponent } from './pages/coursespage/coursespage.component';
import { MycartpageComponent } from './pages/mycartpage/mycartpage.component';
import { WishlistpageComponent } from './pages/wishlistpage/wishlistpage.component';


const routes: Routes = [
  {path:'', redirectTo : 'allcourses', pathMatch:"full"},
  {path:'allcourses', component: CoursespageComponent},
  {path: 'wishlist' , component: WishlistpageComponent},
  {path:'cart', component: MycartpageComponent},
  {path: 'detailcourse/:id', component: CourseDetailPageComponent},
  {path:'**',component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }