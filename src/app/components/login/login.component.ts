import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cred: Credenciais = {
    email: '',
    senha: ''
  };
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private toast: ToastrService) {}

  logar(event: Event) {
    // Evita o comportamento padrão de enviar o formulário e recarregar a página
    event.preventDefault();

    if (this.email.valid && this.senha.valid) {
      this.toast.success('Login realizado com sucesso!', 'Login');
      this.cred.senha = '';
    } else {
      this.toast.error('Usuário e/ou senha inválidos!', 'Login');
      this.cred.senha = '';
    }
  }
}

export interface Credenciais {
  email: string;
  senha: string;
}
