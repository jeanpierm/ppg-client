import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
export class AccountComponent implements OnDestroy {
  static readonly PATH = 'account';

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
  private _mobileQueryListener: (e: MediaQueryListEvent) => void;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly authService: AuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private readonly accountService: AccountService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = (e) => {
      changeDetectorRef.detectChanges();
      if (e.matches === false && this.accountService.sidenavOpened === false) {
        this.accountService.toggleSidenav();
      }
    };
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  get fullName() {
    if (!this.authService.authAccount) return;
    const { name, surname } = this.authService.authAccount;
    return `${name} ${surname}`;
  }

  get bio() {
    return this.authService.authAccount.biography;
  }

  get sidenavOpened() {
    return this.accountService.sidenavOpened;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
