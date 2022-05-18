import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../models/account/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  static readonly PATH = 'users';
  public displayedColumns: string[] = [
    'name',
    'surname',
    'email',
    'roles',
    'status',
  ];

  constructor(
    private readonly UsersService: UsersService,
    private spinner: NgxSpinnerService
  ) {}

  public get loading(): boolean {
    return this.UsersService.fetchLoading;
  }

  public get users(): User[] {
    return this.UsersService.users;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.UsersService.loadUsers();
  }
}
