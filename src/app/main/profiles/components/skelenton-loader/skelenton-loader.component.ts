import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skelenton-loader',
  templateUrl: './skelenton-loader.component.html',
  styleUrls: ['./skelenton-loader.component.scss'],
})
export class SkelentonLoaderComponent implements OnInit {
  @Input() width;
  @Input() height;
  constructor() {}

  ngOnInit(): void {}

  getStyle() {
    const style = {
      'width.px': this.width ? this.width : '',
      'height.px': this.height ? this.height : '',
    };
    return style;
  }
}
