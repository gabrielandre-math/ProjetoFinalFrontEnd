import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { AnalyticsService } from '../../services/analytics.service';
import { MonthlyData } from '../../models/MonthlyData';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [HeaderComponent, FooterComponent]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  totalComandas: number;
  comandasEmAndamento: number;
  comandasEncerradas: number;
  comandasAbertas: number;
  labels: string[] = [];
  andamentoData: number[] = [];
  encerradasData: number[] = [];
  totalData: number[] = [];
  prioridades: number[] = [];

  lineChartDistribuicao: Chart | null = null;
  lineChartStatus: Chart | null = null;
  doughnutChartPrioridade: Chart | null = null;
  pieChartStatus: Chart | null = null;
  barChartComandasPorMes: Chart | null = null;
  radarChartPrioridadesPorMes: Chart | null = null;
  lineChartTendenciaPrioridades: Chart | null = null;

  constructor(
    private analyticsService: AnalyticsService,
    private cdr: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadAnalytics();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges(); // Detect changes manually after view initialization
  }

  loadAnalytics() {
    this.analyticsService.getAnalytics().subscribe(data => {
        console.log('Dados recebidos do backend:', data);
        this.totalComandas = data.totalComandas;
        this.comandasEmAndamento = data.comandasEmAndamento;
        this.comandasEncerradas = data.comandasEncerradas;
        this.comandasAbertas = this.totalComandas - this.comandasEmAndamento - this.comandasEncerradas;

        this.analyticsService.getMonthlyData().subscribe((monthlyData: MonthlyData) => {
            this.labels = monthlyData.labels;
            this.andamentoData = monthlyData.andamento;
            this.encerradasData = monthlyData.encerradas;
            this.totalData = monthlyData.total;

            this.analyticsService.getPriorityData().subscribe(priorityData => {
                this.prioridades = priorityData;
                // Render the charts after receiving the data
                this.renderCharts();
            });
        });
    });
  }

  renderCharts() {
    console.log('Labels:', this.labels);
    console.log('Andamento Data:', this.andamentoData);
    console.log('Encerradas Data:', this.encerradasData);
    console.log('Total Data:', this.totalData);
    console.log('Prioridades:', this.prioridades);

    if (this.labels.length && this.andamentoData.length && this.encerradasData.length) {
        this.createRoundedLineChartDistribuicao();
        this.createRoundedLineChartStatus();
    }

    if (this.prioridades.length) {
        this.createDoughnutChartPrioridade();
        this.createPieChartStatus();
        this.createBarChartComandasPorMes();
        this.createRadarChartPrioridadesPorMes();
        this.createLineChartTendenciaPrioridades();
    }
  }

  createRoundedLineChartDistribuicao() {
    const canvas = document.getElementById('lineChartDistribuicao') as HTMLCanvasElement | null;
    if (canvas) {
      if (this.lineChartDistribuicao) {
        this.lineChartDistribuicao.destroy();
      }
      this.lineChartDistribuicao = new Chart(canvas, {
        type: 'line' as ChartType,
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Comandas em Andamento',
            data: this.andamentoData,
            fill: true,
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.4,
            borderWidth: 3,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          devicePixelRatio: window.devicePixelRatio || 1,
          plugins: {
            legend: {
              position: 'top'
            }
          },
          elements: {
            line: {
              borderWidth: 3,
              borderJoinStyle: 'round',
              borderCapStyle: 'round',
            },
            point: {
              radius: 4,
              hoverRadius: 6,
              backgroundColor: '#FF6384',
            }
          },
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  createRoundedLineChartStatus() {
    const canvas = document.getElementById('lineChartStatus') as HTMLCanvasElement | null;
    if (canvas) {
      if (this.lineChartStatus) {
        this.lineChartStatus.destroy();
      }
      this.lineChartStatus = new Chart(canvas, {
        type: 'line' as ChartType,
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Total de Comandas',
            data: this.totalData,
            fill: true,
            borderColor: '#FFCE56',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            tension: 0.4,
            borderWidth: 3,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          devicePixelRatio: window.devicePixelRatio || 1,
          plugins: {
            legend: {
              position: 'top'
            }
          },
          elements: {
            line: {
              borderWidth: 3,
              borderJoinStyle: 'round',
              borderCapStyle: 'round',
            },
            point: {
              radius: 4,
              hoverRadius: 6,
              backgroundColor: '#FFCE56',
            }
          },
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  createDoughnutChartPrioridade() {
    const canvas = document.getElementById('pieChartPrioridade') as HTMLCanvasElement | null;
    if (canvas) {
      if (this.doughnutChartPrioridade) {
        this.doughnutChartPrioridade.destroy();
      }
      this.doughnutChartPrioridade = new Chart(canvas, {
        type: 'doughnut' as ChartType,
        data: {
          labels: ['Baixa', 'Média', 'Alta'],
          datasets: [{
            data: this.prioridades,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderColor: '#ffffff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          devicePixelRatio: window.devicePixelRatio || 1,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              enabled: true
            },
            title: {
              display: true,
              text: 'Comandas por Prioridade'
            }
          }
        }
      });
    }
  }

  createPieChartStatus() {
    const canvas = document.getElementById('pieChartStatus') as HTMLCanvasElement | null;
    if (canvas) {
      if (this.pieChartStatus) {
        this.pieChartStatus.destroy();
      }
      this.pieChartStatus = new Chart(canvas, {
        type: 'pie' as ChartType,
        data: {
          labels: ['Aberto', 'Em Andamento', 'Encerradas'],
          datasets: [{
            data: [this.comandasAbertas, this.comandasEmAndamento, this.comandasEncerradas],
            backgroundColor: ['#4BC0C0', '#36A2EB', '#FF9F40']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          devicePixelRatio: window.devicePixelRatio || 1,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    }
  }

  createBarChartComandasPorMes() {
    const canvas = document.getElementById('barChartComandasPorMes') as HTMLCanvasElement | null;
    if (canvas) {
      if (this.barChartComandasPorMes) {
        this.barChartComandasPorMes.destroy();
      }
      this.barChartComandasPorMes = new Chart(canvas, {
        type: 'bar' as ChartType,
        data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Comandas Abertas',
              data: this.totalData.map((total, index) => total - this.andamentoData[index] - this.encerradasData[index]),
              backgroundColor: '#4BC0C0',
            },
            {
              label: 'Comandas em Andamento',
              data: this.andamentoData,
              backgroundColor: '#36A2EB',
            },
            {
              label: 'Comandas Encerradas',
              data: this.encerradasData,
              backgroundColor: '#FF9F40',
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Comandas por Mês'
            }
          },
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  createRadarChartPrioridadesPorMes() {
    const canvas = document.getElementById('radarChartPrioridadesPorMes') as HTMLCanvasElement | null;
    if (canvas) {
      if (this.radarChartPrioridadesPorMes) {
        this.radarChartPrioridadesPorMes.destroy();
      }
      this.radarChartPrioridadesPorMes = new Chart(canvas, {
        type: 'radar' as ChartType,
        data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Baixa Prioridade',
              data: this.prioridades.map((_, i) => this.prioridades[0]), // Corrigido
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
            },
            {
              label: 'Média Prioridade',
              data: this.prioridades.map((_, i) => this.prioridades[1]), // Corrigido
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              pointBackgroundColor: 'rgba(54, 162, 235, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
            },
            {
              label: 'Alta Prioridade',
              data: this.prioridades.map((_, i) => this.prioridades[2]), // Corrigido
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              pointBackgroundColor: 'rgba(255, 99, 132, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Comparação de Prioridades'
            }
          }
        }
      });
    }
  }

  createLineChartTendenciaPrioridades() {
    const canvas = document.getElementById('lineChartTendenciaPrioridades') as HTMLCanvasElement | null;
    if (canvas) {
      if (this.lineChartTendenciaPrioridades) {
        this.lineChartTendenciaPrioridades.destroy();
      }
      this.lineChartTendenciaPrioridades = new Chart(canvas, {
        type: 'line' as ChartType,
        data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Baixa Prioridade',
              data: this.prioridades.map((_, i) => this.prioridades[0]), // Corrigido
              fill: false,
              borderColor: '#4BC0C0',
              tension: 0.1
            },
            {
              label: 'Média Prioridade',
              data: this.prioridades.map((_, i) => this.prioridades[1]), // Corrigido
              fill: false,
              borderColor: '#36A2EB',
              tension: 0.1
            },
            {
              label: 'Alta Prioridade',
              data: this.prioridades.map((_, i) => this.prioridades[2]), // Corrigido
              fill: false,
              borderColor: '#FF9F40',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Tendência de Comandas por Prioridade'
            }
          },
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

}
