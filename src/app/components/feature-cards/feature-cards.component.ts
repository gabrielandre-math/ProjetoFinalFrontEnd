import { Component, AfterViewInit, ElementRef } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-feature-cards',
  templateUrl: './feature-cards.component.html',
  styleUrls: ['./feature-cards.component.css'],
  standalone: true
})
export class FeatureCardsComponent implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const cards = this.el.nativeElement.querySelectorAll('.card-item');

    const observerOptions = {
      root: null, // Observa o viewport
      rootMargin: '0px',
      threshold: 0.2 // 20% do card visível para ativar a animação
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCard(entry.target);
          observer.unobserve(entry.target); // Para de observar após a animação
        }
      });
    }, observerOptions);

    cards.forEach((card: HTMLElement) => {
      observer.observe(card);
    });
  }

  private animateCard(card: Element): void {
    anime({
      targets: card,
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1000,
      easing: 'easeOutExpo',
    });
  }
}
