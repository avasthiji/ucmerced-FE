import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { BeforeYouBeginComponent } from './components/before-you-begin/before-you-begin.component';
import { FaqComponent } from './components/faq/faq.component';
import { ChronicDiseaseComponent } from './chronic-disease/chronic-disease.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    BeforeYouBeginComponent,
    FaqComponent,
    ChronicDiseaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: "enabled", onSameUrlNavigation: 'reload' }),
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
