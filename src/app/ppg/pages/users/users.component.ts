import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { dialogAlert, showAlert, showErrorAlert } from 'src/app/shared/utils';
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
      if (result) {
        let user: User = result;
        user.roles = [result.rol];
        this.UsersService.saveUser(user).subscribe({
          next: (_) => {
            this.UsersService.loadUsers();
            showAlert('Cuenta creada correctamente!');
          },
          error: (err) => {
            showErrorAlert(err);
          },
        });
      }
    });
  }

  inactive(userId: string) {
    dialogAlert('Esta seguro de inactivar esta cuenta?').then((result) => {
      if (result) {
        if (result.isConfirmed) {
          this.UsersService.fetchLoading = true;
          this.UsersService.inactive(userId).subscribe({
            next: (_) => this.UsersService.loadUsers(),
            error: (err) => showErrorAlert(err),
          });
        }
      }
    });
  }

  active(userId: string) {
    dialogAlert('Esta seguro de activar esta cuenta?').then((result) => {
      if (result) {
        if (result.isConfirmed) {
          this.UsersService.fetchLoading = true;
          this.UsersService.active(userId).subscribe({
            next: (_) => this.UsersService.loadUsers(),
            error: (err) => {
              showErrorAlert(err);
              this.UsersService.fetchLoading = false;
            },
          });
        }
      }
    });
  }
}
