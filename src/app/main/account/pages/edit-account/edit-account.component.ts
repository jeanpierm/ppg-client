import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';
import {
  getAccountDataFromLocalStorage,
  setAccountDataInLocalStorage,
} from '../../../../core/utils/local-storage.util';
import { Account } from '../../../../admin/interfaces/account.interface';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css'],
})
export class EditAccountComponent implements OnInit {
  static readonly PATH = 'edit';

  form: FormGroup;
  passwords: any;
  change_password: boolean;
  hide: boolean;
  hide_new: boolean;
  user: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly accountService: AccountService,
    private readonly alertService: AlertService
  ) {
    this.form = new FormGroup({});
    this.passwords = {
      currentPassword: '',
      newPassword: '',
    };
    this.change_password = false;
    this.hide = true;
    this.hide_new = true;
    this.user = {};
  }

  get overviewRoute() {
    return ``;
  }

  cancel() {
    location.reload();
  }

  ngOnInit(): void {
    this.initForm();
    this.setAccountDataInForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)],
      ],
      surname: [
        '',
        [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async setAccountDataInForm() {
    const user =
      getAccountDataFromLocalStorage() ||
      (await firstValueFrom(this.accountService.getAccount())).data;
    this.setValues(user);
  }

  setValues(user: Account) {
    this.form.setValue({
      name: user.name,
      surname: user.surname,
      email: user.email,
    });
  }

  validErrorForm(campo: any) {
    return this.form.get(campo)?.errors && this.form.get(campo)?.dirty;
  }

  isValidForm() {
    if (this.change_password) {
      if (this.passwords.currentPassword.trim().length === 0) {
        return false;
      }

      if (this.passwords.newPassword.trim().length === 0) {
        return false;
      }
    }

    return true;
  }

  onUpdateAccount() {
    return new Promise((resolve, reject) => {
      this.setValueEntity();
      this.accountService.updateAccount(this.user).subscribe({
        next: () => {
          this.accountService.getAccount().subscribe({
            next({ data }) {
              setAccountDataInLocalStorage(data);
            },
          });
          resolve(true);
        },
        error: (err) => {
          this.setAccountDataInForm();
          reject(err);
        },
      });
    });
  }

  onUpdatePassword() {
    return new Promise((resolve, reject) => {
      this.accountService.updatePassword(this.passwords).subscribe({
        next: () => {
          this.passwords = {
            currentPassword: '',
            newPassword: '',
          };
          resolve(true);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  setValueEntity() {
    this.user.name = this.form.controls['name'].value;
    this.user.surname = this.form.controls['surname'].value;
    this.user.email = this.form.controls['email'].value;
  }

  onSubmit() {
    let p1 = this.onUpdateAccount();
    let p2;
    if (this.change_password) {
      p2 = this.onUpdatePassword();
    }
    Promise.all([p1, p2]).then(
      () => this.alertService.success('¡Cambios guardados exitosamente!'),
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.alertService.error();
        }
      }
    );
  }

  onChangeCheckBox() {
    if (!this.change_password) {
      this.passwords = {
        currentPassword: '',
        newPassword: '',
      };
    }
  }
}
