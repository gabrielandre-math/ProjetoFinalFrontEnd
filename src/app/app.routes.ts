import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent, children: [
            { path: 'home', component: HomeComponent },
            { path: 'header', component: HeaderComponent }
        ]

    }
];
