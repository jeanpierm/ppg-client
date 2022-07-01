import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}
}
