import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  isMenuOpen = false;

  ngAfterViewInit() {
    const menuButton = document.getElementById('menu-button');
    const animatedIcon = document.querySelector('.animated-icon1');
    const responsiveMenu = document.getElementById('responsive-menu');

    if (menuButton && animatedIcon && responsiveMenu) {
      menuButton.addEventListener('click', () => {
        this.isMenuOpen = !this.isMenuOpen;
        animatedIcon.classList.toggle('open'); // Alterna a animação do ícone

        if (this.isMenuOpen) {
          // Animação de entrada do menu responsivo
          responsiveMenu.style.display = 'block';
          anime({
            targets: responsiveMenu,
            height: ['0px', '150px'],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeInOutQuad'
          });
        } else {
          // Animação de saída do menu responsivo
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
}
