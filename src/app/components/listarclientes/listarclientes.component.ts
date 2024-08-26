import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service';
import { Cliente } from '../../models/cliente.model';
import { StringToDatePipe } from '../../models/StringToDatePipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteClienteDialogComponent } from '../delete-cliente-dialog/delete-cliente-dialog.component';
import { EditClienteDialogComponent } from '../edit-cliente-dialog/edit-cliente-dialog.component';
import { ToastrService } from 'ngx-toastr'; // Importando o serviço Toastr

@Component({
  selector: 'app-listarclientes',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    StringToDatePipe,
    MatDialogModule,
    DeleteClienteDialogComponent,
    EditClienteDialogComponent,
  ],
  templateUrl: './listarclientes.component.html',
  styleUrls: ['./listarclientes.component.css']
})
export class ListarclientesComponent implements OnInit {
  ELEMENT_DATA: Cliente[] = [];
  originalData: Cliente[] = [];
  paginatedData: Cliente[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageSize = 5;
  currentPage = 1;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private service: AuthService, 
    private dialog: MatDialog,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe({
      next: (response) => {
        this.ELEMENT_DATA = response.map(cliente => {
          if (typeof cliente.dataCriacao === 'string') {
            const [day, month, year] = cliente.dataCriacao.split('/');
            cliente.dataCriacao = new Date(`${year}-${month}-${day}`);
          }
          return cliente;
        });
        this.originalData = [...this.ELEMENT_DATA];
        this.totalItems = this.ELEMENT_DATA.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.updatePaginatedData();
      },
      error: (err) => {
        console.error('Erro ao carregar dados: ', err);
      }
    });
  }

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.ELEMENT_DATA.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  onPageSizeChange(event: Event) {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.updatePaginatedData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.ELEMENT_DATA = this.originalData.filter(cliente =>
      cliente.nome.toLowerCase().includes(filterValue) ||
      cliente.cpf.includes(filterValue) ||
      cliente.email.toLowerCase().includes(filterValue) ||
      cliente.telefone.includes(filterValue)
    );
    this.currentPage = 1;
    this.totalItems = this.ELEMENT_DATA.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.updatePaginatedData();
  }

  openDeleteDialog(cliente: Cliente): void {
    const dialogRef = this.dialog.open(DeleteClienteDialogComponent, {
      data: { nome: cliente.nome }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteCliente(cliente.id).subscribe({
          next: (response) => {
            this.toastr.success('Cliente excluído com sucesso!');
            this.findAll(); // Atualiza a lista de clientes após deletar
          },
          error: (err) => {
            let errorMessage = 'Erro ao excluir cliente';
  
            if (err.status === 400) { // Certifica se é o erro 400 Bad Request
              const serverMessage = err.error?.message || err.headers?.get('message');
              if (serverMessage) {
                errorMessage = serverMessage;
              }
            }
  
            this.toastr.error(errorMessage);
          }
        });
      }
    });
  }
  
  

  openEditDialog(cliente: Cliente): void {
    const dialogRef = this.dialog.open(EditClienteDialogComponent, {
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.updateCliente(cliente.id, result).subscribe(() => {
          this.findAll(); // Atualiza a lista de clientes após a edição
        });
      }
    });
  }
}
