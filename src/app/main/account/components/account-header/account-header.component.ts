import { Component, Input } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string = '';

  constructor(public accountService: AccountService) {}
}
