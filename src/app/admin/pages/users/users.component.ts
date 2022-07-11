import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { AlertService } from '../../../core/services/alert.service';
import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';
import { CreateUserRequest } from '../../interfaces/create-user-request.interface';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  static readonly PATH = 'users';
  readonly defaultPageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') input!: ElementRef;

  displayedColumns: string[] = ['name', 'surname', 'email', 'role', 'status'];

  constructor(
    private readonly usersService: UsersService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private readonly alertService: AlertService
  ) {}

  get loading(): boolean {
    return this.usersService.fetchLoading;
  }

  get users(): User[] {
    return this.usersService.users;
  }

  get resultsLength(): number {
    return this.usersService.resultsLength;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.usersService.loadUsers({
      size: this.defaultPageSize,
      page: 1,
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.loadUsersPage();
        this.paginator.firstPage();
      });

    this.paginator.page.subscribe(() => this.loadUsersPage());
  }

  loadUsersPage() {
    this.usersService.loadUsers({
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex + 1, // add +1 because paginator is zero-based, and the API isn't
      search: this.input.nativeElement.value,
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const user: CreateUserRequest = result;
        this.usersService.fetchLoading = true;
        this.usersService.saveUser(user).subscribe({
          next: () => {
            this.loadUsersPage();
            this.alertService.success('¡Cuenta creada exitosamente!');
          },
          error: () => {
            this.alertService.error();
          },
        });
      }
    });
  }

  inactive(userId: string) {
    this.alertService
      .warning('¿Está seguro de desactivar esta cuenta?')
      .then((result) => {
        if (result) {
          if (result.isConfirmed) {
            this.usersService.fetchLoading = true;
            this.usersService.inactive(userId).subscribe({
              next: () => {
                this.alertService.success('Usuario inactivado exitosamente');
                this.loadUsersPage();
              },
              error: () => this.alertService.error(),
            });
          }
        }
      });
  }

  active(userId: string) {
    this.alertService
      .warning('¿Está seguro de activar esta cuenta?')
      .then((result) => {
        if (result) {
          if (result.isConfirmed) {
            this.usersService.fetchLoading = true;
            this.usersService.active(userId).subscribe({
              next: (_) => {
                this.alertService.success('Usuario activado exitosamente');
                this.loadUsersPage();
              },
              error: () => {
                this.usersService.fetchLoading = false;
                this.alertService.error();
              },
            });
          }
        }
      });
  }
}
