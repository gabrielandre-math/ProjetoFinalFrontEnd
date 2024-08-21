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
    const brandName = document.querySelector('.brand-name') as HTMLElement;

    if (menuButton && animatedIcon && responsiveMenu && brandName) {
      // Separar cada letra do brandName em spans para animá-las individualmente
      const brandText = brandName.textContent;
      brandName.innerHTML = ''; // Limpa o texto original

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
        animatedIcon.classList.toggle('open'); // Alterna a animação do ícone

        if (this.isMenuOpen) {
          // Animação das letras da direita para a esquerda
          anime({
            targets: spans,
            color: ['#000000', '#FF6E7F'],
            delay: anime.stagger(100, { direction: 'reverse' }), // Anima da direita para a esquerda
            duration: 500,
            easing: 'easeInOutQuad',
          });

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
          // Animação das letras da esquerda para a direita
          anime({
            targets: spans,
            color: ['#FF6E7F', '#000000'],
            delay: anime.stagger(100), // Anima da esquerda para a direita
            duration: 500,
            easing: 'easeInOutQuad',
          });

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
