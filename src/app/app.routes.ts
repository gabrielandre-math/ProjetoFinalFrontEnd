import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MirrorShapeComponent } from './components/mirror-shape/mirror-shape.component';
import { FeatureCardsComponent } from './components/feature-cards/feature-cards.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { Component } from '@angular/core';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: '', component: HomeComponent, children:
            [
                { path: 'home', component: HomeComponent },
                { path: 'header', component: HeaderComponent },
                { path: 'mirror-shape', component: MirrorShapeComponent },
                { path: 'feature-cards', component: FeatureCardsComponent },
                { path: 'footer', component: FooterComponent }
            ]
    }

];
