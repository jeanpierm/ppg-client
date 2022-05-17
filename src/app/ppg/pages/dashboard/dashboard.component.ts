import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { deleteObjectItemsByValue } from '../../../shared/utils';
import { ProfessionalProfilesService } from '../../services/professional-profiles.service';
import { CountQuery } from '../../types/count-query.type';

interface TechnologyPieChart {
  title?: string;
  chartData: ChartData<'pie', number[], string | string[]>;
  loading: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  static readonly PATH = 'dashboard';

  readonly LANGUAGES_TITLE = 'Lenguajes de programación';
  readonly DATABASES_TITLE = 'Bases de datos';
  readonly ENGLISH_TITLE = 'Requiere inglés';
  readonly FRAMEWORKS_TITLE = 'Frameworks';
  readonly LIBRARIES_TITLE = 'Librerías';
  readonly PARADIGMS_TITLE = 'Paradigmas';
  readonly PATTERNS_TITLE = 'Patrones de diseño';
  readonly TOOLS_TITLE = 'Herramientas de desarrollo';

  cards: TechnologyPieChart[] = [];

  constructor(private professionalProfilesService: ProfessionalProfilesService) {}

  ngOnInit(): void {
    this.loadCharts();
  }

  private loadCharts(): void {
    this.addChart('language', this.LANGUAGES_TITLE);
    this.addChart('database', this.DATABASES_TITLE);
    this.addChart('english', this.ENGLISH_TITLE);
    this.addChart('framework', this.FRAMEWORKS_TITLE);
    this.addChart('library', this.LIBRARIES_TITLE);
    this.addChart('paradigm', this.PARADIGMS_TITLE);
    this.addChart('pattern', this.PATTERNS_TITLE);
    this.addChart('tool', this.TOOLS_TITLE);
  }

  private addChart(query: CountQuery, title: string): void {
    this.professionalProfilesService.count(query).subscribe({
      next: (res) => {
        const chartData = mapCountResponseToChartData(res.data);
        this.cards.push({
          loading: false,
          chartData,
          title,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}

function mapCountResponseToChartData(data: Record<string, number>) {
  const cleanedData = deleteObjectItemsByValue(data, 0);

  const values = Object.values(cleanedData);
  const keys = Object.keys(cleanedData);

  return {
    labels: keys,
    datasets: [{ data: values }],
  };
}
