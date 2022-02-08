import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CoursespageComponent } from './pages/coursespage/coursespage.component';


const routes: Routes = [
  {path:'', redirectTo : 'allcourses', pathMatch:"full"},
  {path:'allcourses', component: CoursespageComponent},
  {path:'**',component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }