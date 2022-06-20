import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tech-chips',
  templateUrl: './tech-chips.component.html',
  styles: [],
})
export class TechChipsComponent {
  @Input() technologies!: string[];
  @Input() type!: string;
}
