import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Input() color: string = 'black';
  constructor() {}

  get filter() {
    if (this.color === 'white') return 'invert(100)';
    if (this.color === 'primary')
      return 'invert(31%) sepia(13%) saturate(5823%) hue-rotate(208deg) brightness(93%) contrast(93%)';
    return '';
  }
}
