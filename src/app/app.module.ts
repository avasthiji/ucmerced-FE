import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { BeforeYouBeginComponent } from './components/before-you-begin/before-you-begin.component';
import { FaqComponent } from './components/faq/faq.component';
import { ChronicDiseaseComponent } from './components/chronic-disease/chronic-disease.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule,} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import {ConfirmationDialog} from './components/dialog/confirmation-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import { RoiResultsComponent } from './components/chronic-disease/roi-results/roi-results.component';
import { UtilityCostComponent } from './components/chronic-disease/utility-cost/utility-cost.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    BeforeYouBeginComponent,
    FaqComponent,
    ChronicDiseaseComponent,
    ConfirmationDialog,
    RoiResultsComponent,
    UtilityCostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: "enabled", onSameUrlNavigation: 'reload' }),
    MatRadioModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    HttpClientModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }