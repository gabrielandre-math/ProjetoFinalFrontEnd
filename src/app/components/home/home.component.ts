import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { Router } from '@angular/router'
import { FooterComponent } from '../footer/footer.component';
import { MirrorShapeComponent } from '../mirror-shape/mirror-shape.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MirrorShapeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['home'])
  }
}
