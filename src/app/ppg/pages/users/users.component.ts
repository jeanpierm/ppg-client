import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';
import { dialogAlert, showAlert, showErrorAlert } from 'src/app/shared/utils';
import { UserDialogComponent } from '../../components/users/user-dialog/user-dialog.component';
import { User } from '../../models/account/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') input!: ElementRef;
  static readonly PATH = 'usuarios';

  sizePerPage = 10;
  public displayedColumns: string[] = ['name', 'surname', 'email', 'roles', 'status'];

  constructor(
    private readonly usersService: UsersService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {}

  public get loading(): boolean {
    return this.usersService.fetchLoading;
  }

  public get users(): User[] {
    return this.usersService.users;
  }

  public get resultsLength(): number {
    return this.usersService.resultsLength;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.usersService.loadUsers(this.sizePerPage);
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadUserPage();
        })
      )
      .subscribe();

    this.paginator.page.pipe(tap(() => this.loadUserPage())).subscribe();
  }

  loadUserPage() {
    this.usersService.loadUsers(
      this.sizePerPage,
      this.paginator.pageIndex,
      this.input.nativeElement.value
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let user: User = result;
        user.roles = [result.rol];
        this.usersService.fetchLoading = true;
        this.usersService.saveUser(user).subscribe({
          next: (_) => {
            this.usersService.loadUsers(this.sizePerPage);
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
    dialogAlert('Esta seguro de desactivar esta cuenta?').then((result) => {
      if (result) {
        if (result.isConfirmed) {
          this.usersService.fetchLoading = true;
          this.usersService.inactive(userId).subscribe({
            next: (_) => this.loadUserPage(),
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
          this.usersService.fetchLoading = true;
          this.usersService.active(userId).subscribe({
            next: (_) => this.loadUserPage(),
            error: (err) => {
              showErrorAlert(err);
              this.usersService.fetchLoading = false;
            },
          });
        }
      }
    });
  }
}
