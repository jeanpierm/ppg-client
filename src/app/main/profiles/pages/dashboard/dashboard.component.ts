import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { deletePropertiesByValue } from '../../../../core/utils/object.util';
import { ProfilesService } from '../../services/profiles.service';
import { RoutesService } from '../../../../core/services/routes.service';
import { TechTypesService } from '../../../../admin/services/tech-types.service';
import { EntityStatus } from '../../../../core/enums/entity-status.enum';

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

  charts: Record<string, TechnologyPieChart> = {
    english: {
      title: 'Requiere inglés',
      loading: true,
    },
  };

  constructor(
    private readonly profilesService: ProfilesService,
    private readonly techTypesService: TechTypesService,
    public readonly routes: RoutesService
  ) {}

  ngOnInit(): void {
    this.loadCharts();
  }

  private loadCharts(): void {
    this.techTypesService
      .getTechTypeNames({ status: EntityStatus.Active })
      .subscribe((techTypes) => {
        techTypes.forEach((type) => {
          // init charts object
          this.charts[type] = {
            title: getChartTitle(type),
            loading: true,
          };
          // update chart object
          this.loadChart(type);
        });
      });
    this.loadChart('english');
  }

  private loadChart(query: string) {
    if (!this.charts[query].loading) this.charts[query].loading = true;
    this.profilesService.count(query).subscribe({
      next: ({ data }) => {
        const chartData = mapCountResponseToChartData(data);
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

function getChartTitle(type: string) {
  if (type === 'language') return 'Lenguajes';
  if (type === 'database') return 'Bases de datos';
  if (type === 'framework') return 'Frameworks';
  if (type === 'library') return 'Bibliotecas';
  if (type === 'paradigm') return 'Paradigmas';
  if (type === 'pattern') return 'Patrones y arquitecturas';
  if (type === 'tool') return 'Herramientas';
  return type;
}
