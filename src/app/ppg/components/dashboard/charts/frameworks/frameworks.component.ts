import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
// import {
//   SingleDataSet,
//   Label,
//   monkeyPatchChartJsLegend,
//   monkeyPatchChartJsTooltip,
// } from 'ng2-charts';
import { ProfessionalProfilesService } from 'src/app/ppg/services/professional-profiles.service';

@Component({
  selector: 'app-frameworks',
  templateUrl: './frameworks.component.html',
  styleUrls: ['./frameworks.component.css'],
})
export class FrameworksComponent {
  // public pieChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // public pieChartLabels: Label[] = [
  //   ['Download', 'Sales'],
  //   ['In', 'Store', 'Sales'],
  //   'Mail Sales',
  // ];
  // public pieChartData: SingleDataSet = [300, 500, 100];
  // public pieChartType: ChartType = 'pie';
  // public pieChartLegend = true;
  // public pieChartPlugins = [];
  // public loading: boolean;
  // constructor(
  //   private professionalProfilesService: ProfessionalProfilesService
  // ) {
  //   monkeyPatchChartJsTooltip();
  //   monkeyPatchChartJsLegend();
  //   this.loading = false;
  // }
  // ngOnInit(): void {
  //   this.loading = true;
  //   this.getFrameworks().then(
  //     (res) => (this.loading = false),
  //     (err) => (this.loading = false)
  //   );
  // }
  // getFrameworks(): Promise<void> {
  //   this.pieChartLabels = [];
  //   this.pieChartData = [];
  //   return new Promise((resolve, reject) => {
  //     this.professionalProfilesService.getFrameworks().subscribe({
  //       next: (res) => {
  //         let data: any = res.data;
  //         const keys_aux = Object.keys(data);
  //         keys_aux.forEach((k) => {
  //           if (data[k] == 0) delete data[k];
  //         });
  //         const values: Array<any> = Object.values(data);
  //         const keys = Object.keys(data);
  //         this.pieChartLabels = keys;
  //         this.pieChartData = values;
  //         resolve();
  //       },
  //       error: (err) => {
  //         reject(err);
  //       },
  //     });
  //   });
  // }
}
