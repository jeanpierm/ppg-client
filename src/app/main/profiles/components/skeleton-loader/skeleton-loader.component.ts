import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
})
export class SkeletonLoaderComponent {
  @Input() width;
  @Input() height;
  constructor() {}

  getStyle() {
    const style = {
      'width.px': this.width ? this.width : '',
      'height.px': this.height ? this.height : '',
    };
    return style;
  }
}
