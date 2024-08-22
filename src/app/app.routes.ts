import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MirrorShapeComponent } from './components/mirror-shape/mirror-shape.component';
import { FeatureCardsComponent } from './components/feature-cards/feature-cards.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent, // HomeComponent como página principal
        children: [
            { path: 'mirror-shape', component: MirrorShapeComponent },
            { path: 'feature-cards', component: FeatureCardsComponent }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' } // Redireciona qualquer rota desconhecida para a Home
];
