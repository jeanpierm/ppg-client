import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tech-chip-list',
  templateUrl: './tech-chip-list.component.html',
  styles: [],
})
export class TechChipListComponent {
  @Input() technology!: string[];
  @Input() identifier!: string;
}
