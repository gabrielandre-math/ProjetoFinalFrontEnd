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
import { ComandaCreateComponent } from './components/comandacreatecomponent/comandacreatecomponent.component';
import { PainelComponent } from './components/painelcomponent/painelcomponent.component';
import { ListarfuncionariosComponent } from './components/listarfuncionarios/listarfuncionarios.component';

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
        component: ListarclientesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',  
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'comandas',
        component: ComandaListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'comandas/create',
        component: ComandaCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'painel',
        component: PainelComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'funcionarios',
        component: ListarfuncionariosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'header', component: HeaderComponent },
            { path: 'mirror-shape', component: MirrorShapeComponent },
            { path: 'feature-cards', component: FeatureCardsComponent },
            { path: 'footer', component: FooterComponent }
        ]
    }
];
