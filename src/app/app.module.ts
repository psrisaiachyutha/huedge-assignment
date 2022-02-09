import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { CoursespageComponent } from './pages/coursespage/coursespage.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { WishlistpageComponent } from './pages/wishlistpage/wishlistpage.component';
import { MycartpageComponent } from './pages/mycartpage/mycartpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    CourseCardComponent,
    CoursespageComponent,
    PagenotfoundComponent,
    WishlistpageComponent,
    MycartpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
