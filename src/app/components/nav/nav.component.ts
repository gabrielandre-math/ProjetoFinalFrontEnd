import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'] // Correção aqui
})
export class NavComponent implements OnInit {
  ngOnInit(): void {
    // Lógica de inicialização se necessário
  }
}
