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
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';
import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';
import { CreateUserRequest } from '../../interfaces/create-user-request.interface';
import { User } from '../../interfaces/user';
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
  public displayedColumns: string[] = [
    'name',
    'surname',
    'email',
    'roles',
    'status',
  ];

  constructor(
    private readonly usersService: UsersService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private readonly alertService: AlertService
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
    this.usersService.loadUsers({ sizePerPage: this.sizePerPage });
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
    this.usersService.loadUsers({
      sizePerPage: this.sizePerPage,
      pageIndex: this.paginator.pageIndex,
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
          next: (_) => {
            this.usersService.loadUsers({ sizePerPage: this.sizePerPage });
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
      .alert('¿Está seguro de desactivar esta cuenta?')
      .then((result) => {
        if (result) {
          if (result.isConfirmed) {
            this.usersService.fetchLoading = true;
            this.usersService.inactive(userId).subscribe({
              next: () => {
                this.alertService.success('Usuario inactivado exitosamente');
                this.loadUserPage();
              },
              error: () => this.alertService.error(),
            });
          }
        }
      });
  }

  active(userId: string) {
    this.alertService
      .alert('¿Está seguro de activar esta cuenta?')
      .then((result) => {
        if (result) {
          if (result.isConfirmed) {
            this.usersService.fetchLoading = true;
            this.usersService.active(userId).subscribe({
              next: (_) => {
                this.alertService.success('Usuario activado exitosamente');
                this.loadUserPage();
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
