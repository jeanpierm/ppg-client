import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { every, of } from 'rxjs';
import { deleteObjectItemsByValue } from '../../../shared/utils';
import { ProfessionalProfilesService } from '../../services/professional-profiles.service';
import { CountQuery } from '../../types/count-query.type';

interface TechnologyPieChart {
  title?: string;
  data?: ChartData<'pie', number[], string | string[]>;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  static readonly PATH = 'dashboard';

  // readonly LANGUAGES_TITLE = 'Lenguajes de programación';
  // readonly DATABASES_TITLE = 'Bases de datos';
  // readonly ENGLISH_TITLE = 'Requiere inglés';
  // readonly FRAMEWORKS_TITLE = 'Frameworks';
  // readonly LIBRARIES_TITLE = 'Librerías';
  // readonly PARADIGMS_TITLE = 'Paradigmas';
  // readonly PATTERNS_TITLE = 'Patrones de diseño';
  // readonly TOOLS_TITLE = 'Herramientas de desarrollo';

  // cards: TechnologyPieChart[] = [];

  // languagesChartData: ChartData<'pie', number[], string | string[]> = { labels: [], datasets: [] };
  // databasesChartData: ChartData<'pie', number[], string | string[]> = { labels: [], datasets: [] };

  // languagesLoading: boolean = true;
  // databasesLoading: boolean = true;

  charts: Record<CountQuery, TechnologyPieChart> = {
    language: {
      title: 'Lenguajes de programación',
    },
    database: {
      title: 'Bases de datos',
    },
    english: {
      title: 'Inglés',
    },
    framework: {
      title: 'Frameworks',
    },
    library: {
      title: 'Librerías',
    },
    paradigm: {
      title: 'Paradigm',
    },
    pattern: {
      title: 'Patrones de diseño',
    },
    tool: {
      title: 'Herramientas de desarrollo',
    },
  };

  constructor(private professionalProfilesService: ProfessionalProfilesService) {}

  ngOnInit(): void {
    this.loadCharts();
  }

  private loadCharts(): void {
    // this.professionalProfilesService.count('language').subscribe({
    //   next: (res) => {
    //     const chartData = mapCountResponseToChartData(res.data);
    //     this.languagesChartData = chartData;
    //     this.languagesLoading = false;
    //   },
    // });

    // this.professionalProfilesService.count('database').subscribe({
    //   next: (res) => {
    //     const chartData = mapCountResponseToChartData(res.data);
    //     this.databasesChartData = chartData;
    //     this.databasesLoading = false;
    //   },
    // });
    // this.addChart('language', this.LANGUAGES_TITLE);
    // this.addChart('database', this.DATABASES_TITLE);
    // this.addChart('english', this.ENGLISH_TITLE);
    // this.addChart('framework', this.FRAMEWORKS_TITLE);
    // this.addChart('library', this.LIBRARIES_TITLE);
    // this.addChart('paradigm', this.PARADIGMS_TITLE);
    // this.addChart('pattern', this.PATTERNS_TITLE);
    // this.addChart('tool', this.TOOLS_TITLE);

    this.addChart('language');
    this.addChart('database');
    this.addChart('english');
    this.addChart('framework');
    this.addChart('library');
    this.addChart('paradigm');
    this.addChart('pattern');
    this.addChart('tool');
  }

  private addChart(query: CountQuery, title?: string) {
    this.professionalProfilesService.count(query).subscribe({
      next: (res) => {
        const chartData = mapCountResponseToChartData(res.data);
        // this.cards.push({
        //   chartData,
        //   title,
        // });
        this.charts[query].data = chartData;
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
