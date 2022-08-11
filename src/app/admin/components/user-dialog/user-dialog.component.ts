import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { PasswordConfig } from '../../../core/config/password.config';
import { predefinedJobTitles } from '../../../core/constants/job-titles.constant';
import { predefinedLocations } from '../../../core/constants/locations.constant';
import { Role } from '../../../core/enums/role.enum';
import { getPasswordValidationMessage } from '../../../core/utils/form.util';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  filteredJobTitles!: Observable<string[]>;
  filteredLocations!: Observable<string[]>;
  hidePassword: boolean = true;
  userForm: UntypedFormGroup = this.fb.group({
    role: [Role.User, Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(PasswordConfig.minLength),
        Validators.maxLength(PasswordConfig.maxLength),
        Validators.pattern(PasswordConfig.regex),
      ],
    ],
    jobTitle: ['', [Validators.required]],
    location: ['', [Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private fb: UntypedFormBuilder
  ) {}

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

  get jobTitle() {
    return this.userForm.get('jobTitle');
  }

  get location() {
    return this.userForm.get('location');
  }

  get passwordMsg() {
    return `• La contraseña debe contener mínimo 8 y máximo 30 caracteres. \n
    • La contraseña debe contener mayúsculas y minúsculas \n
    • La contraseña debe contener al menos un valor numérico \n
    • La contraseña debe contener al menos un carácter especial [$@$!%*?&.]`;
  }

  ngOnInit(): void {
    this.filteredJobTitles = this.jobTitle!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', predefinedJobTitles))
    );
    this.filteredLocations = this.location!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', predefinedLocations))
    );
  }

  private _filter(value: string, values: string[]): string[] {
    const filterValue = value.toLowerCase();

    return values.filter((option) =>
      option.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  getPasswordValidationMsg(): string | void {
    const password = this.userForm.get('password')?.value;
    if (!password) return;
    return getPasswordValidationMessage(password);
  }
}
