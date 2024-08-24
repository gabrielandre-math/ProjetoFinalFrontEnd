import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent, 
    FooterComponent, 
    ReactiveFormsModule
  ],
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

  constructor(private toast: ToastrService, private service: AuthService, private router: Router) {}

  logar(event: Event) {
    event.preventDefault();
    this.service.authenticate(this.cred).subscribe(resposta => {
      const authToken = resposta.headers.get('Authorization');
      if (authToken) {
        console.log("Token recebido:", authToken);
        this.service.successfulLogin(authToken.substring(7));
        this.toast.success("Login bem-sucedido");

        // Temporizador de 3 segundos antes de redirecionar e recarregar
        setTimeout(() => {
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
        }, 3000);
      } else {
        this.toast.error("Erro ao autenticar. Tente novamente.");

        // Temporizador de 3 segundos antes de recarregar a página em caso de erro
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }, () => {
      this.toast.error("Usuário e/ou senha inválidos");

      // Temporizador de 3 segundos antes de recarregar a página em caso de erro
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }
}

export interface Credenciais {
  email: string;
  senha: string;
}
