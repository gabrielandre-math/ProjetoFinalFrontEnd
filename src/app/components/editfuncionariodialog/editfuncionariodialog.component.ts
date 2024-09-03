import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Funcionario } from '../../models/funcionario';
import { AuthService } from '../../services/auth.service'; // Import do AuthService

@Component({
  selector: 'app-edit-funcionario-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editfuncionariodialog.component.html',
  styleUrls: ['./editfuncionariodialog.component.css']
})
export class EditFuncionarioDialogComponent {
  editForm: FormGroup;

  perfis = [
    { value: 0, label: 'ADMIN' },
    { value: 1, label: 'CLIENTE' },
    { value: 2, label: 'FUNCIONARIO' }
  ];

  constructor(
    public dialogRef: MatDialogRef<EditFuncionarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Funcionario,
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private authService: AuthService, // Injeção do AuthService
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      nome: [data.nome, Validators.required],
      cpf: [
        data.cpf,
        [Validators.required, this.validateCPF],
        this.validateCpfNotTaken.bind(this)
      ],
      email: [
        data.email,
        [Validators.required, Validators.email],
        this.validateEmailNotTaken.bind(this)
      ],
      telefone: [data.telefone, Validators.required],
      senha: ['', Validators.minLength(6)], // Deixe em branco para não mudar a senha se não for preenchido
      perfis: [this.convertPerfisToValues(data.perfis), Validators.required] // Inicializar como lista de números
    });
  }

  validateEmailNotTaken(control: AbstractControl) {
    if (control.value === this.data.email) {
      return of(null); // Se o e-mail não foi alterado, não verificar
    }
    return this.authService.checkEmailExists(control.value).pipe( // Uso do AuthService
      map(isTaken => (isTaken ? { emailTaken: true } : null)),
      catchError(() => of(null))
    );
  }

  validateCpfNotTaken(control: AbstractControl) {
    if (control.value === this.data.cpf) {
      return of(null); // Se o CPF não foi alterado, não verificar
    }
    return this.authService.checkCpfExists(control.value).pipe( // Uso do AuthService
      map(isTaken => (isTaken ? { cpfTaken: true } : null)),
      catchError(() => of(null))
    );
  }

  validateCPF(control: any): { [key: string]: boolean } | null {
    const cpf = control.value.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return { invalidCPF: true };
    }

    let sum = 0;
    let remainder: number;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return { invalidCPF: true };

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return { invalidCPF: true };

    return null;
  }

  formatCpf(event: any) {
    let cpf = event.target.value.replace(/\D/g, '');

    if (cpf.length <= 11) {
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    event.target.value = cpf;
    this.editForm.get('cpf')?.setValue(cpf, { emitEvent: false });
  }

  onSave(): void {
    if (this.editForm.valid) {
      const perfisArray = this.editForm.value.perfis;
  
      const updatedFuncionario: Partial<Funcionario> = {
        nome: this.editForm.value.nome,
        cpf: this.editForm.value.cpf,
        email: this.editForm.value.email,
        telefone: this.editForm.value.telefone,
        senha: this.editForm.value.senha,
        perfis: perfisArray
      };
  
      this.funcionarioService.updateFuncionario(this.data.id, updatedFuncionario).subscribe({
        next: () => {
          this.toastr.success('Funcionário atualizado com sucesso!');
          this.dialogRef.close(updatedFuncionario);
        },
        error: () => {
          this.toastr.error('Erro ao atualizar o funcionário.');
        }
      });
    } else {
      this.toastr.error('Formulário inválido. Por favor, verifique os campos.');
    }
  }

  getPerfilLabel(value: number): string {
    const perfilObj = this.perfis.find(p => p.value === value);
    return perfilObj ? `ROLE_${perfilObj.label.toUpperCase()}` : null;
  }

  convertPerfisToValues(perfis: number[]): number[] {
    return perfis; // Retorna diretamente, pois os perfis já são números
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
