import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  valorGasto: number;
}

const CLIENTE_DATA: Cliente[] = [
  {id: 1, nome: 'Cliente 1', email: 'cliente1@example.com', valorGasto: 150.00},
  {id: 2, nome: 'Cliente 2', email: 'cliente2@example.com', valorGasto: 250.00},
  {id: 3, nome: 'Cliente 3', email: 'cliente3@example.com', valorGasto: 350.00},
  // Adicione mais dados conforme necessário
];

@Component({
  selector: 'app-listarclientes',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './listarclientes.component.html',
  styleUrls: ['./listarclientes.component.css']
})
export class ListarclientesComponent {
  dataSource = { data: CLIENTE_DATA };
  displayedColumns: string[] = ['id', 'nome', 'email', 'valorGasto', 'acao'];
}
