import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { EntityStatus } from '../../../core/enums/entity-status.enum';
import { AlertService } from '../../../core/services/alert.service';
import { HelperService } from '../../../core/services/helper.service';
import { ReportsService } from '../../../core/services/reports.service';
import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';
import { CreateUserRequest } from '../../interfaces/create-user-request.interface';
import { UpdateUserRequest } from '../../interfaces/update-user-request.interface';
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
  readonly exportColumns = ['NOMBRE', 'APELLIDOS', 'CORREO', 'ROL', 'ESTADO'];
  readonly displayedColumns = [
    'name',
    'surname',
    'email',
    'role',
    'status',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') input!: ElementRef;
  statusInputValue = EntityStatus.Active;
  statusOptions = [
    { label: 'Activos', value: EntityStatus.Active },
    { label: 'Eliminados', value: EntityStatus.Inactive },
    { label: 'Todos', value: '' },
  ];

  constructor(
    public dialog: MatDialog,
    public readonly helper: HelperService,
    private readonly usersService: UsersService,
    private readonly alertService: AlertService,
    private readonly reportsService: ReportsService
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
    this.usersService.loadUsers({
      size: this.defaultPageSize,
      page: 1,
      status: this.statusInputValue,
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
      status: this.statusInputValue,
    });
  }

  openDialog(user?: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: { user },
      panelClass: 'dialog-responsive',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const resultUser: CreateUserRequest | UpdateUserRequest = result;
        const wasEdit = !!user;
        if (wasEdit) delete resultUser.password;
        const action = wasEdit
          ? this.usersService.updateUser(user.userId, resultUser)
          : this.usersService.saveUser(resultUser as CreateUserRequest);
        action.subscribe({
          next: () => {
            this.loadUsersPage();
            this.alertService.success({
              title: 'Usuario guardado exitosamente',
            });
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
            this.usersService.inactive(userId).subscribe({
              next: () => {
                this.alertService.success({
                  title: 'Usuario inactivado exitosamente',
                });
                this.loadUsersPage();
              },
              error: () => this.alertService.error(),
            });
          }
        }
      });
  }

  activate(userId: string) {
    this.alertService
      .warning('¿Está seguro de activar esta cuenta?')
      .then((result) => {
        if (result) {
          if (result.isConfirmed) {
            this.usersService.fetchLoading = true;
            this.usersService.active(userId).subscribe({
              next: (_) => {
                this.alertService.success({
                  title: 'Usuario activado exitosamente',
                });
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

  exportXlsx() {
    const data = this.users.map(({ name, surname, email, role, status }) => ({
      NOMBRE: name,
      APELLIDOS: surname,
      EMAIL: email,
      ROL: role.name,
      ESTADO: this.helper.statusResolver(status),
    }));
    const filename = `users_report_${new Date().getTime()}`;
    this.reportsService.exportXlsx(data, filename);
  }

  exportPdf() {
    const head = [this.exportColumns];
    const body = this.users.map(({ name, surname, email, role, status }) => [
      name,
      surname,
      email,
      role.name,
      this.helper.statusResolver(status),
    ]);
    const filename = `users_report_${new Date().getTime()}`;
    this.reportsService.exportPdf(head, body, filename);
  }
}
