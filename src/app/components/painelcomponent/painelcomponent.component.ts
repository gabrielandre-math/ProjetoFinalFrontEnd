import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service'; 
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './painelcomponent.component.html',  
  styleUrls: ['./painelcomponent.component.css']   
})
export class PainelComponent {
  items = [
    { label: 'Adicionar pratos', icon: 'pencil-square', route: 'comandas/create' },
    { label: 'Clientes', icon: 'person', route: 'listarclientes' },
    { label: 'Funcionários', icon: 'person-square', route: 'funcionarios' },
    { label: 'Financeiro', icon: 'bar-chart', route: 'dashboard' },
    { label: 'Comandas', icon: 'journal', route: 'comandas' },
    { label: 'Sair', icon: 'door-closed', route: 'login' }
  ];

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {}

  navigateTo(route: string): void {
    if (route === 'login') {
      this.logout();
    } else {
      this.router.navigate([route]);
    }
  }

  logout() {
    this.authService.logout();

    // Redireciona para a página de login
    this.router.navigate(['/login']).then(() => {
      // Exibe o Toastr após o redirecionamento
      this.toastr.info('Você saiu do sistema!', 'Logout');
      
      // Espera 2 segundos e recarrega a página para garantir que o usuário veja o Toastr
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 milissegundos = 2 segundos
    });
  }
}
