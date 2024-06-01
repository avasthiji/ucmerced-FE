import { Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';
import { BeforeYouBeginComponent } from './app/components/before-you-begin/before-you-begin.component';
import { FaqComponent } from './app/components/faq/faq.component';
import { ChronicDiseaseComponent } from './app/components/chronic-disease/chronic-disease.component';

export const appRoutes: Routes = [
    {
        path: '', component: ChronicDiseaseComponent
    },
    // {
    //     path: 'home', component: HomeComponent
    // },
    // {
    //     path: 'start', component: BeforeYouBeginComponent
    // },
    // {
    //     path: 'faq', component: FaqComponent
    // },
    {
        path: 'app', component: ChronicDiseaseComponent
    }
    

]