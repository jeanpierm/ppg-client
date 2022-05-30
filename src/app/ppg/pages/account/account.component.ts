import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { SweetAlert } from 'src/app/ppg/config/sweetAlert';
import { AccountService } from 'src/app/ppg/services/account.service';
import { Account } from '../../interfaces/account.interface';
import { User } from '../../models/account/user';

@Component({
  selector: 'app-user-config',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  static readonly PATH = 'cuenta';

  public myForm: FormGroup;
  public passwords: any;

  public change_password: boolean;
  public hide: boolean;
  public hide_new: boolean;
  public user: any;
  public alert: SweetAlert;
  constructor(public fb: FormBuilder, private accountService: AccountService) {
    this.myForm = new FormGroup({});
    this.passwords = {
      currentPassword: '',
      newPassword: '',
    };
    this.change_password = false;
    this.hide = true;
    this.hide_new = true;
    this.user = {};
    this.alert = new SweetAlert();
  }

  ngOnInit(): void {
    this.onForm();
    this.getUserAccount();
  }

  onForm() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)]],
      surname: ['', [Validators.required, Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async getUserAccount() {
    try {
      let user = await firstValueFrom(this.accountService.getAccount());
      this.setValues(user.data);
    } catch (err) {
      console.log(err);
    }
  }

  setValues(user: Account) {
    this.myForm.setValue({
      name: user.name,
      surname: user.surname,
      email: user.email,
    });
  }

  validErrorForm(campo: any) {
    return this.myForm.get(campo)?.errors && this.myForm.get(campo)?.dirty;
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
        next: (res) => {
          resolve(true);
        },
        error: (err) => {
          this.getUserAccount();
          reject(err);
        },
      });
    });
  }

  onUpdatePassword() {
    return new Promise((resolve, reject) => {
      this.accountService.updatePassword(this.passwords).subscribe({
        next: (res) => {
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
    this.user.name = this.myForm.controls['name'].value;
    this.user.surname = this.myForm.controls['surname'].value;
    this.user.email = this.myForm.controls['email'].value;
  }

  onSubmit() {
    let p1 = this.onUpdateAccount();
    let p2;
    if (this.change_password) {
      p2 = this.onUpdatePassword();
    }
    Promise.all([p1, p2]).then(
      (res) => this.alert.successAlert('Cambios guardados correctamente!'),
      (err) => this.alert.errorAlert(err)
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
