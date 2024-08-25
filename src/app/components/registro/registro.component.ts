import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { map, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; 

import { of } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class RegistroComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', 
        [Validators.required, Validators.email], 
        this.validateEmailNotTaken.bind(this) // Validação assíncrona
      ],
      cpf: ['', [Validators.required, this.validateCPF]], // Validação de CPF
      confirmarCpf: ['', Validators.required], // Confirmação de CPF
      telefone: [''],  // Campo opcional para telefone
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, { 
      validator: [this.matchingPasswords, this.matchingCPF] // Adicionando validação personalizada
    });
  }

  validateEmailNotTaken(control: AbstractControl) {
    return this.authService.checkEmailExists(control.value).pipe(
      map(isTaken => (isTaken ? { emailTaken: true } : null)),
      catchError(() => of(null)) // Se houver erro, retornar null
    );
  }

  matchingPasswords(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;

    return senha === confirmarSenha ? null : { notSame: true };
  }

  matchingCPF(group: FormGroup) {
    const cpf = group.get('cpf')?.value;
    const confirmarCpf = group.get('confirmarCpf')?.value;

    if (cpf !== confirmarCpf) {
      group.get('confirmarCpf')?.setErrors({ cpfNotMatch: true });
      return { cpfNotMatch: true };
    } else {
      return null;
    }
  }

  validateCPF(control: any): { [key: string]: boolean } | null {
    const cpf = control.value.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return { invalidCPF: true };
    }

    let sum = 0;
    let remainder;

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

  onSubmit() {
    console.log('Form submitted:', this.registerForm.value);  // Log para depuração
  
    if (this.registerForm.valid) {
      const newUser = {
        nome: this.registerForm.value.nome,
        email: this.registerForm.value.email,
        cpf: this.formatCpf(this.registerForm.value.cpf),  // Formatar CPF
        telefone: this.registerForm.value.telefone || '',  // Telefone opcional
        senha: this.registerForm.value.senha,
        perfis: [1]  // Sempre 1
      };
  
      this.authService.register(newUser).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);  // Log para depuração
          this.toastr.success('Registro realizado com sucesso!');

          // Temporizador de 2 segundos antes de redirecionar e recarregar
          setTimeout(() => {
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          }, 2000);
        },
        error: (error) => {
          console.error('Registration error:', error);  // Log para depuração
          this.toastr.error('Ocorreu um erro ao tentar registrar o usuário.');

          // Temporizador de 2 segundos antes de recarregar a página em caso de erro
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
    } else {
      console.log('Form is invalid');  // Log para depuração
      this.toastr.error('Formulário inválido. Verifique os campos e tente novamente.');
    }
  }

  formatCpf(cpf: string): string {
    // Formatar o CPF no formato XXX.XXX.XXX-XX
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
