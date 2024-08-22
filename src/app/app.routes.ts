import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MirrorShapeComponent } from './components/mirror-shape/mirror-shape.component';
import { FeatureCardsComponent } from './components/feature-cards/feature-cards.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: '',
        component: AppComponent, // HomeComponent como página principal
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'mirror-shape', component: MirrorShapeComponent },
            { path: 'feature-cards', component: FeatureCardsComponent },
            { path: 'footer', component: FooterComponent }
        ]
    },
];
