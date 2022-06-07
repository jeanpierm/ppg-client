import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { deletePropertiesByValue } from '../../../core/utils/object.util';
import { ProfessionalProfilesService } from '../../services/professional-profiles.service';
import { CountQuery } from '../../types/count-query.type';

interface TechnologyPieChart {
  title?: string;
  data?: ChartData<'pie', number[], string | string[]>;
  loading: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  static readonly PATH = 'dashboard';

  charts: Record<CountQuery, TechnologyPieChart> = {
    language: {
      title: 'Lenguajes de programación',
      loading: true,
    },
    database: {
      title: 'Bases de datos',
      loading: true,
    },
    framework: {
      title: 'Frameworks',
      loading: true,
    },
    library: {
      title: 'Librerías',
      loading: true,
    },
    paradigm: {
      title: 'Paradigmas',
      loading: true,
    },
    pattern: {
      title: 'Patrones de diseño',
      loading: true,
    },
    tool: {
      title: 'Herramientas de desarrollo',
      loading: true,
    },
    english: {
      title: 'Inglés',
      loading: true,
    },
  };

  constructor(
    private professionalProfilesService: ProfessionalProfilesService
  ) {}

  ngOnInit(): void {
    this.loadCharts();
  }

  private loadCharts(): void {
    this.loadChart('language');
    this.loadChart('database');
    this.loadChart('english');
    this.loadChart('framework');
    this.loadChart('library');
    this.loadChart('paradigm');
    this.loadChart('pattern');
    this.loadChart('tool');
  }

  private loadChart(query: CountQuery) {
    if (!this.charts[query].loading) this.charts[query].loading = true;
    this.professionalProfilesService.count(query).subscribe({
      next: (res) => {
        const chartData = mapCountResponseToChartData(res.data);
        this.charts[query].data = chartData;
        this.charts[query].loading = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}

function mapCountResponseToChartData(data: Record<string, number>) {
  const cleanedData = deletePropertiesByValue(data, 0);

  const values = Object.values(cleanedData);
  const keys = Object.keys(cleanedData);

  return {
    labels: keys,
    datasets: [{ data: values }],
  };
}
