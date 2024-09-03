import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { FuncionarioService } from '../../services/funcionario.service';
import { StringToDatePipe } from '../../models/StringToDatePipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Funcionario } from '../../models/funcionario';
import { DeleteFuncionarioDialogComponent } from '../deletefuncionariodialog/deletefuncionariodialog.component';
import { EditFuncionarioDialogComponent } from '../editfuncionariodialog/editfuncionariodialog.component';

@Component({
  selector: 'app-listarfuncionarios',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    StringToDatePipe,
    MatDialogModule,
    DeleteFuncionarioDialogComponent,
    EditFuncionarioDialogComponent,
  ],
  templateUrl: './listarfuncionarios.component.html',
  styleUrls: ['./listarfuncionarios.component.css']
})
export class ListarfuncionariosComponent implements OnInit {
  ELEMENT_DATA: Funcionario[] = [];
  originalData: Funcionario[] = [];
  paginatedData: Funcionario[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageSize = 5;
  currentPage = 1;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private service: FuncionarioService, 
    private dialog: MatDialog,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe({
      next: (response) => {
        this.ELEMENT_DATA = response.map(funcionario => {
          if (typeof funcionario.dataCriacao === 'string') {
            const [day, month, year] = funcionario.dataCriacao.split('/');
            funcionario.dataCriacao = new Date(`${year}-${month}-${day}`);
          }
          return funcionario;
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
    this.ELEMENT_DATA = this.originalData.filter(funcionario =>
      funcionario.nome.toLowerCase().includes(filterValue) ||
      funcionario.cpf.includes(filterValue) ||
      funcionario.email.toLowerCase().includes(filterValue) ||
      funcionario.telefone.includes(filterValue)
    );
    this.currentPage = 1;
    this.totalItems = this.ELEMENT_DATA.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.updatePaginatedData();
  }

  openDeleteDialog(funcionario: Funcionario): void {
    const dialogRef = this.dialog.open(DeleteFuncionarioDialogComponent, {
      data: { nome: funcionario.nome }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteFuncionario(funcionario.id).subscribe({
          next: () => {
            this.toastr.success('Funcionário excluído com sucesso!');
            this.findAll(); // Atualiza a lista de funcionários após deletar
          },
          error: (err) => {
            let errorMessage = 'Erro ao excluir funcionário';
  
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

  openEditDialog(funcionario: Funcionario): void {
    const dialogRef = this.dialog.open(EditFuncionarioDialogComponent, {
      data: funcionario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.updateFuncionario(funcionario.id, result).subscribe(() => {
          this.findAll(); // Atualiza a lista de funcionários após a edição
        });
      }
    });
  }
}
