import { Component, Input, OnInit } from '@angular/core';
import { JobOffer } from '../../interfaces/job-offer.interface';

@Component({
  selector: 'app-job-offer-card[jobOffer]',
  templateUrl: './job-offer-card.component.html',
  styleUrls: ['./job-offer-card.component.scss'],
})
export class JobOfferCardComponent implements OnInit {
  @Input() jobOffer!: JobOffer;

  constructor() {}

  ngOnInit(): void {}
}
