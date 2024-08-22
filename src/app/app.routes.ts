import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MirrorShapeComponent } from './components/mirror-shape/mirror-shape.component';
import { FeatureCardsComponent } from './components/feature-cards/feature-cards.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redireciona a rota raiz para 'home'
    { path: 'home', component: HomeComponent },
    { path: 'mirror-shape', component: MirrorShapeComponent },
    { path: 'feature-cards', component: FeatureCardsComponent },
    { path: 'footer', component: FooterComponent },
    { path: '**', redirectTo: 'home' } // Redireciona rotas desconhecidas para 'home'
];
