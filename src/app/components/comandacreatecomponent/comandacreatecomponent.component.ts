import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComandaService } from '../../services/comanda.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Produto } from '../../models/Produto';
import { ProdutoService } from '../../services/produto.service';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/funcionario';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-comanda-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent], // standalone
  templateUrl: './comandacreatecomponent.component.html',
  styleUrls: ['./comandacreatecomponent.component.css']
})
export class ComandaCreateComponent implements OnInit {
  comandaForm: FormGroup;
  produtos: Produto[] = [];
  clientes: Cliente[] = [];
  funcionarios: Funcionario[] = [];

  constructor(
    private fb: FormBuilder,
    private comandaService: ComandaService,
    private produtoService: ProdutoService,
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.comandaForm = this.fb.group({
      titulo: ['', Validators.required],
      observacoes: ['', Validators.required],
      mesa: ['', Validators.required],
      produtosSelecionados: [[], Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      prioridade: [0, Validators.required],
      cliente: [null, Validators.required],
      funcionario: [null, Validators.required],
      status: [0, Validators.required]  // Adiciona o campo de status com valor padrão 0 (ABERTO)
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarClientes();
    this.carregarFuncionarios();
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe({
      next: (data: Produto[]) => {
        this.produtos = data;
      },
      error: (err) => {
        this.toastr.error('Erro ao carregar os produtos');
        console.error(err);
      }
    });
  }

  carregarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
      },
      error: (err) => {
        this.toastr.error('Erro ao carregar os clientes');
        console.error(err);
      }
    });
  }

  carregarFuncionarios(): void {
    this.funcionarioService.findAll().subscribe({
      next: (data: Funcionario[]) => {
        this.funcionarios = data;
      },
      error: (err) => {
        this.toastr.error('Erro ao carregar os funcionários');
        console.error(err);
      }
    });
  }
  

  onSubmit(): void {
    if (this.comandaForm.valid) {
      this.comandaService.createComanda(this.comandaForm.value).subscribe({
        next: () => {
          this.toastr.success('Comanda criada com sucesso!');
          this.router.navigate(['/comandas']);
        },
        error: (err) => {
          this.toastr.error('Erro ao criar a comanda');
          console.error(err);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/comandas']);
  }
}
