import { Component, OnInit } from '@angular/core';
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
export class DashboardComponent implements OnInit {
  totalComandas: number;
  comandasEmAndamento: number;
  comandasEncerradas: number;
  labels: string[] = [];
  andamentoData: number[] = [];
  encerradasData: number[] = [];
  totalData: number[] = [];
  prioridades: number[] = [];

  constructor(private analyticsService: AnalyticsService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics() {
    this.analyticsService.getAnalytics().subscribe(data => {
      this.totalComandas = data.totalComandas;
      this.comandasEmAndamento = data.comandasEmAndamento;
      this.comandasEncerradas = data.comandasEncerradas;

      this.analyticsService.getMonthlyData().subscribe((monthlyData: MonthlyData) => {
        this.labels = monthlyData.labels;
        this.andamentoData = monthlyData.andamento;
        this.encerradasData = monthlyData.encerradas;
        this.totalData = monthlyData.total;

        this.analyticsService.getPriorityData().subscribe(priorityData => {
          this.prioridades = priorityData;
          this.renderCharts();
        });
      });
    });
  }

  renderCharts() {
    this.createRoundedLineChartDistribuicao();
    this.createRoundedLineChartStatus();
    this.createDoughnutChartPrioridade();
    this.createPieChartStatus();
  }

  createRoundedLineChartDistribuicao() {
    new Chart('lineChartDistribuicao', {
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

  createRoundedLineChartStatus() {
    new Chart('lineChartStatus', {
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

  createDoughnutChartPrioridade() {
    new Chart('pieChartPrioridade', {
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

  createPieChartStatus() {
    new Chart('pieChartStatus', {
      type: 'pie' as ChartType,
      data: {
        labels: ['Em Andamento', 'Encerradas'],
        datasets: [{
          data: [this.comandasEmAndamento, this.comandasEncerradas],
          backgroundColor: ['#4BC0C0', '#FF9F40']
        }]
      },
      options: {
        responsive: true,
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
