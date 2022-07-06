import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  public userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private fb: FormBuilder
  ) {
    this.userForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.onForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get name() {
    return this.userForm.get('name');
  }

  get surname() {
    return this.userForm.get('surname');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  onForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])([A-Za-z\d$@$!%*?&.]|[^ ]){8,15}$/
          ),
        ],
      ],
      role: ['user', Validators.required],
    });
  }

  get passwordMsg() {
    return `• La contraseña debe contener mínimo 8 y máximo 30 caracteres. \n
    • La contraseña debe contener mayúsculas y minúsculas \n
    • La contraseña debe contener al menos un valor numérico \n
    • La contraseña debe contener al menos un carácter especial [$@$!%*?&.]`;
  }

  getPasswordValidationMessage(): string | void {
    const control = this.userForm.get('password')?.value;
    if (!control) return;
    if (
      control.toString().trim().length < 8 ||
      control.toString().trim().length > 30
    ) {
      return 'La contraseña debe contener mínimo 8 y máximo 30 caracteres';
    }
    if (!control.match(/^(?=.*[a-z])(?=.*[A-Z])([A-Za-z]|[^ ])*$/)) {
      return 'La contraseña debe contener mayúsculas y minúsculas';
    }
    if (!control.match(/^(?=.*\d)([\d]|[^ ])*$/)) {
      return 'La contraseña debe contener al menos un valor numérico';
    }
    if (!control.match(/^(?=.*[$@$!%*?&.])([$@$!%*?&.]|[^ ])*$/)) {
      return 'La contraseña debe contener al menos un carácter especial [$@$!%*?&.]';
    }
  }
}
