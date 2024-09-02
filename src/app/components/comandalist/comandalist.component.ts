import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ComandaService } from '../../services/comanda.service';
import { CommonModule } from '@angular/common';
import { Comanda } from '../../models/Comanda';
import { Subscription, interval } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-comandalist',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './comandalist.component.html',
  styleUrls: ['./comandalist.component.css']
})
export class ComandaListComponent implements OnInit, OnDestroy, AfterViewChecked {
  comandas: Comanda[] = [];
  paginatedComandas: Comanda[] = [];
  filteredComandas: Comanda[] = [];
  ultimaAtualizacao: Date = new Date();
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  pages: number[] = [];
  private autoUpdateSubscription: Subscription | undefined;

  constructor(
    private comandaService: ComandaService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.atualizarComandas();
    this.startAutoUpdate();
  }

  ngOnDestroy(): void {
    this.stopAutoUpdate();
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  startAutoUpdate(): void {
    this.autoUpdateSubscription = interval(30000).subscribe(() => {
      this.atualizarComandas(false);
    });
  }

  stopAutoUpdate(): void {
    if (this.autoUpdateSubscription) {
      this.autoUpdateSubscription.unsubscribe();
    }
  }

  atualizarComandas(showSuccessToast: boolean = true): void {
    this.comandaService.getComandas().subscribe({
      next: (data: Comanda[]) => {
        console.log(`Total de comandas recebidas: ${data.length}`);

        // Mapeia os status numéricos para texto antes de armazenar as comandas
        this.comandas = data.map(comanda => ({
          ...comanda,
          status: this.mapStatusToText(parseInt(comanda.status, 10)),
          produtoId: this.extractProdutoId(comanda)
        }));

        // Ordena as comandas pela ordem: "Em Andamento", "Aberto", "Encerrado"
        this.comandas.sort((a, b) => this.compareStatus(a.status, b.status));

        this.filteredComandas = [...this.comandas];
        this.totalPages = Math.ceil(this.filteredComandas.length / this.itemsPerPage);
        this.pages = Array.from({ length: this.totalPages }, (v, k) => k + 1);
        this.paginateComandas();
        this.ultimaAtualizacao = new Date();

        if (showSuccessToast) {
          this.toastr.success('Comandas atualizadas com sucesso!');
        }
      },
      error: (err) => {
        this.toastr.error('Erro ao atualizar as comandas');
        console.error(err);
      }
    });
  }

  extractProdutoId(comanda: Comanda): number {
    return comanda.produtoId || 1; // Ajuste conforme necessário
  }

  mapStatusToText(status: number): string {
    switch (status) {
      case 0:
        return 'ABERTO';
      case 1:
        return 'ANDAMENTO';
      case 2:
        return 'ENCERRADO';
      default:
        return 'DESCONHECIDO';
    }
  }

  compareStatus(statusA: string, statusB: string): number {
    const priority = { 'ANDAMENTO': 1, 'ABERTO': 2, 'ENCERRADO': 3 };
    return priority[statusA] - priority[statusB];
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase().trim();
    
    const keywords = filterValue.split(/\s+/);
  
    this.filteredComandas = this.comandas.filter(comanda =>
      keywords.every(keyword =>
        comanda.titulo.toLowerCase().includes(keyword) ||
        comanda.nomeCliente.toLowerCase().includes(keyword) ||
        comanda.mesa.toString().toLowerCase().includes(keyword) ||
        comanda.status.toLowerCase().includes(keyword)
      )
    );
  
    this.totalPages = Math.ceil(this.filteredComandas.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (v, k) => k + 1);
    this.currentPage = 1; 
    this.paginateComandas();
  }

  paginateComandas(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedComandas = this.filteredComandas.slice(start, end);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginateComandas();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateComandas();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateComandas();
    }
  }
}
