import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css'],
})
export class UserConfigComponent implements OnInit {
  public myForm: FormGroup;
  public passwords: any;

  public change_password: boolean;
  public hide: boolean;
  public hide_new: boolean;
  public user: any;
  constructor(
    private userService: UserService,
    public fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.myForm = new FormGroup({});
    this.passwords = {
      currentPassword: '',
      newPassword: '',
    };
    this.change_password = false;
    this.hide = true;
    this.hide_new = true;
    this.user = {};
  }

  ngOnInit(): void {
    this.onForm();
    this.getUserAccount();
  }

  onForm() {
    this.myForm = this.fb.group({
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

  async getUserAccount() {
    try {
      let user = await this.accountService.getAccount().toPromise();
      this.setValues(user.data);
    } catch (err) {
      console.log(err);
    }
  }

  setValues(user: User) {
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
      this.accountService.updateUser(this.user).subscribe({
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
    let p2 = null;
    if (this.change_password) {
      p2 = this.onUpdatePassword();
    }
    Promise.all([p1, p2]).then(
      (res) => console.log('Procesado exitosamente'),
      (err) => console.log('ERROR')
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
