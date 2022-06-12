import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  static readonly PATH = 'admin';

  constructor() {}

  ngOnInit(): void {
    console.log('');
  }
}
