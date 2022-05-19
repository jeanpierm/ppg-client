import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserDialogComponent } from '../../components/users/user-dialog/user-dialog.component';
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
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
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

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
