import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MirrorShapeComponent } from '../mirror-shape/mirror-shape.component';
import { FeatureCardsComponent } from '../feature-cards/feature-cards.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MirrorShapeComponent, FeatureCardsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor() {}
}
