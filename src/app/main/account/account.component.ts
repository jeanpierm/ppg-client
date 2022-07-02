import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Account } from '../../admin/interfaces/account.interface';
import { AlertService } from '../../core/services/alert.service';
import { CloudinaryService } from '../../core/services/cloudinary.service';
import { MenuOption } from '../../shared/interfaces/menu-option.interface';
import { AuthService } from '../auth/services/auth.service';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { PasswordComponent } from './pages/password/password.component';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnDestroy, AfterViewInit {
  static readonly PATH = 'account';

  account: Account = this.authService.authAccount;
  menuOptions: MenuOption[] = [
    {
      icon: 'home',
      label: 'Vista general de mi cuenta',
      path: OverviewComponent.PATH,
    },
    {
      icon: 'edit',
      label: 'Editar cuenta',
      path: EditAccountComponent.PATH,
    },
    {
      icon: 'lock',
      label: 'Cambiar contraseña',
      path: PasswordComponent.PATH,
    },
  ];
  mobileQuery: MediaQueryList;
  @ViewChild('photo') photo!: ElementRef<HTMLDivElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private _mobileQueryListener: (e: MediaQueryListEvent) => void;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly authService: AuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private readonly accountService: AccountService,
    private readonly router: Router,
    private readonly cloudinaryService: CloudinaryService,
    private readonly alertService: AlertService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngAfterViewInit(): void {
    // this.photo.nativeElement.addEventListener('mouseenter', () => {
    //   this.photo.nativeElement.innerText = 'Cambiar photo';
    // });
  }

  get fullName() {
    if (!this.authService.authAccount) return;
    const { name, surname } = this.authService.authAccount;
    return `${name} ${surname}`;
  }

  get sidenavOpened() {
    return this.accountService.sidenavOpened;
  }

  uploadAccountPhoto() {
    const { files } = this.fileInput.nativeElement;
    if (!files?.length) return;
    const file = files[0];
    this.cloudinaryService.uploadFile(file).subscribe((url) => {
      this.account.photo = url;
      firstValueFrom(this.accountService.updateAccount({ photo: url })).then(
        () => {
          this.alertService.success(
            '¡Foto de perfil actualizada exitosamente!'
          );
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  closeSidenav() {
    if (this.accountService.sidenavOpened) this.accountService.toggleSidenav();
  }
}
