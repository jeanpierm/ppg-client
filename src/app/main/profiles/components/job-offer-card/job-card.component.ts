import { Component, Input } from '@angular/core';
import { Job } from '../../interfaces/job.interface';

@Component({
  selector: 'app-job-card[job]',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent {
  @Input() job!: Job;

  constructor() {}
}
