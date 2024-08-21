import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './components/footer/footer.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent, children: [
            { path: 'home', component: HomeComponent },
            { path: 'header', component: HeaderComponent },
            { path: 'footer', component: FooterComponent}
        ]

    }
];
