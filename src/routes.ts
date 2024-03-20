import { Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';
import { BeforeYouBeginComponent } from './app/components/before-you-begin/before-you-begin.component';
import { FaqComponent } from './app/components/faq/faq.component';
import { ChronicDiseaseComponent } from './app/chronic-disease/chronic-disease.component';

export const appRoutes: Routes = [

    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'before-you-begin', component: BeforeYouBeginComponent
    },
    {
        path: 'faq', component: FaqComponent
    },
    {
        path: 'chronic-disease', component: ChronicDiseaseComponent
    }

]