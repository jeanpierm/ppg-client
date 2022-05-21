import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/ppg/models/account/user';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  public user_form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private fb: FormBuilder
  ) {
    this.user_form = new FormGroup({});
  }

  ngOnInit(): void {
    this.onForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get name() {
    return this.user_form.get('name');
  }

  get surname() {
    return this.user_form.get('surname');
  }

  get email() {
    return this.user_form.get('email');
  }

  get password() {
    return this.user_form.get('password');
  }

  onForm() {
    this.user_form = this.fb.group({
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
      rol: ['user', [Validators.required]],
    });
  }

  get passwordMsg() {
    return `• La contraseña debe contener mínimo 8 y máximo 30 caracteres. \n 
    • La contraseña debe contener mayúsculas y minúsculas \n 
    • La contraseña debe contener al menos un valor numérico \n
    • La contraseña debe contener al menos un carácter especial [$@$!%*?&.]`;
  }
}
