import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MirrorShapeComponent } from './components/mirror-shape/mirror-shape.component';
import { FeatureCardsComponent } from './components/feature-cards/feature-cards.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuard } from './auth/auth.guard';
import { RegistroComponent } from './components/registro/registro.component';
import { ListarclientesComponent } from './components/listarclientes/listarclientes.component';
import { DashboardComponent } from './analytics/dashboard/dashboard.component';
import { ComandaListComponent } from './components/comandalist/comandalist.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegistroComponent
    },
    { 
        path: 'listarclientes', 
        component: ListarclientesComponent
    },
    {
        path: 'dashboard',  // Nova rota para o Dashboard
        component: DashboardComponent  // Protegendo a rota com o AuthGuard, se necessário
    },
    {
        path: 'comandas',
        component: ComandaListComponent
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'header', component: HeaderComponent },
            { path: 'mirror-shape', component: MirrorShapeComponent },
            { path: 'feature-cards', component: FeatureCardsComponent },
            { path: 'footer', component: FooterComponent }
        ]
    }
];
