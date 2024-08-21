import { Component, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-mirror-shape',
  standalone: true,
  templateUrl: './mirror-shape.component.html',
  styleUrls: ['./mirror-shape.component.css']
})
export class MirrorShapeComponent implements AfterViewInit {
  mouseX = 0;
  mouseY = 0;
  xp = 0;
  yp = 0;
  blobs: HTMLElement[] = [];
  floatingBlobs: HTMLElement[] = [];

  ngAfterViewInit() {
    this.blobs = Array.from(document.querySelectorAll('.blob-follow'));

    const positions = [
      { x: 0, y: 0 }, // canto superior esquerdo
      { x: window.innerWidth - 250, y: 0 }, // canto superior direito
      { x: 0, y: window.innerHeight - 250 }, // canto inferior esquerdo
    ];

    this.blobs.forEach((blob, index) => {
      blob.style.transform = `translate(${positions[index].x}px, ${positions[index].y}px)`;
    });

    this.floatingBlobs = Array.from(document.querySelectorAll('.blob-float'));

    this.animateBlobs();
    this.animateFloatingBlobs();
    this.initTypewriterEffect(); // Inicialize o efeito de máquina de escrever
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX - 125;
    this.mouseY = event.clientY - 125;
  }

  animateBlobs() {
    setInterval(() => {
      this.xp += (this.mouseX - this.xp) / 6;
      this.yp += (this.mouseY - this.yp) / 6;

      this.blobs.forEach((blob, index) => {
        const rect = blob.getBoundingClientRect();
        let newX = this.xp;
        let newY = this.yp;

        this.blobs.forEach((otherBlob, otherIndex) => {
          if (index !== otherIndex) {
            const otherRect = otherBlob.getBoundingClientRect();
            const dx = rect.left - otherRect.left;
            const dy = rect.top - otherRect.top;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 250) { // Se as blobs estiverem muito próximas
              const angle = Math.atan2(dy, dx);
              newX += Math.cos(angle) * 10; // Empurre a blob na direção oposta
              newY += Math.sin(angle) * 10;
            }
          }
        });

        const containerRect = document.querySelector('.glass-container').getBoundingClientRect();

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX + rect.width > containerRect.width) newX = containerRect.width - rect.width;
        if (newY + rect.height > containerRect.height) newY = containerRect.height - rect.height;

        blob.style.transform = `translate(${newX}px, ${newY}px)`;
      });
    }, 20);
  }

  animateFloatingBlobs() {
    this.floatBlob(this.floatingBlobs[0], { x: 50, y: window.innerHeight - 300 }, { x: 50, y: 50 }, 5000);

    this.floatBlob(this.floatingBlobs[1], { x: window.innerWidth - 300, y: window.innerHeight - 100 }, { x: 50, y: window.innerHeight - 100 }, 7000);

    this.floatBlob(this.floatingBlobs[2], { x: window.innerWidth - 300, y: 50 }, { x: window.innerWidth - 300, y: window.innerHeight - 300 }, 7000);
  }

  floatBlob(blob: HTMLElement, start: { x: number; y: number }, end: { x: number; y: number }, duration: number) {
    let direction = 1;

    const move = () => {
      const containerRect = document.querySelector('.glass-container').getBoundingClientRect();

      let { x, y } = direction === 1 ? end : start;

      const rect = blob.getBoundingClientRect();
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x + rect.width > containerRect.width) x = containerRect.width - rect.width;
      if (y + rect.height > containerRect.height) y = containerRect.height - rect.height;

      blob.style.transition = `transform ${duration}ms ease-in-out`;
      blob.style.transform = `translate(${x}px, ${y}px)`;

      direction *= -1;

      setTimeout(move, duration);
    };

    move();
  }

  initTypewriterEffect() {
    const element = document.querySelector('.main-text') as HTMLElement;
    const text = element.textContent;
    element.textContent = '';

    let i = 0;
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100); // A velocidade de digitação
      } else {
        setTimeout(() => eraseText(), 2000); // Pausa antes de apagar
      }
    };

    const eraseText = () => {
      let j = text.length;
      const erase = () => {
        if (j > 0) {
          element.textContent = text.substring(0, j - 1);
          j--;
          setTimeout(erase, 50); // A velocidade de apagar
        } else {
          i = 0; // Reiniciar o índice do texto
          setTimeout(type, 500); // Pausa antes de recomeçar
        }
      };
      erase();
    };

    type();
  }
}
