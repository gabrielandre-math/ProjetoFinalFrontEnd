import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import anime from 'animejs/lib/anime.es.js';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  
  isMenuOpen = false;
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router, private toast: ToastrService) {}

  ngAfterViewInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    
    const header = document.querySelector('.header') as HTMLElement;
    const menuButton = document.getElementById('menu-button');
    const animatedIcon = document.querySelector('.animated-icon1');
    const responsiveMenu = document.getElementById('responsive-menu');
    const brandName = document.querySelector('.brand-name') as HTMLElement;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    if (menuButton && animatedIcon && responsiveMenu && brandName) {
      const brandText = brandName.textContent;
      brandName.innerHTML = '';

      if (brandText) {
        brandText.split('').forEach(letter => {
          const span = document.createElement('span');
          span.textContent = letter;
          brandName.appendChild(span);
        });
      }

      const spans = brandName.querySelectorAll('span');

      menuButton.addEventListener('click', () => {
        this.isMenuOpen = !this.isMenuOpen;
        animatedIcon.classList.toggle('open');

        if (this.isMenuOpen) {
          anime({
            targets: spans,
            color: ['#000000', '#FF6E7F'],
            delay: anime.stagger(100, { direction: 'reverse' }),
            duration: 500,
            easing: 'easeInOutQuad',
          });

          responsiveMenu.style.display = 'block';
          anime({
            targets: responsiveMenu,
            height: ['0px', '150px'],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeInOutQuad'
          });
        } else {
          anime({
            targets: spans,
            color: ['#FF6E7F', '#000000'],
            delay: anime.stagger(100),
            duration: 500,
            easing: 'easeInOutQuad',
          });

          anime({
            targets: responsiveMenu,
            height: ['150px', '0px'],
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInOutQuad',
            complete: () => {
              responsiveMenu.style.display = 'none';
            }
          });
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    
    // Redireciona para a página de login
    this.router.navigate(['/login']).then(() => {
      // Exibe o Toastr após o redirecionamento
      this.toast.info('Você saiu do sistema!', 'Logout');
      
      // Espera 2 segundos e recarrega a página para garantir que o usuário veja o Toastr
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 milissegundos = 2 segundos
    });
  }

  goToPainel() {
    this.router.navigate(['/painel']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
