import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tech-chips',
  templateUrl: './tech-chips.component.html',
  styleUrls: ['./tech-chips.component.scss'],
})
export class TechChipsComponent {
  @Input() technologies!: string[];
  @Input() label!: string;
}
