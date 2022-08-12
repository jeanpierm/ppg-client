import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { PasswordConfig } from '../../../core/config/password.config';
import { predefinedJobTitles } from '../../../core/constants/job-titles.constant';
import { predefinedLocations } from '../../../core/constants/locations.constant';
import { Role } from '../../../core/enums/role.enum';
import { getPasswordValidationMessage } from '../../../core/utils/form.util';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  filteredJobTitles!: Observable<string[]>;
  filteredLocations!: Observable<string[]>;
  hidePassword: boolean = true;
  form: FormGroup = this.fb.group({
    role: [Role.User, Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      this.isEditing
        ? []
        : [
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
    @Inject(MAT_DIALOG_DATA) public data: { user?: User },
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private fb: FormBuilder
  ) {
    if (data.user) this.setFormValue(data.user);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get name() {
    return this.form.get('name');
  }

  get surname() {
    return this.form.get('surname');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get jobTitle() {
    return this.form.get('jobTitle');
  }

  get location() {
    return this.form.get('location');
  }

  get passwordMsg() {
    return `• La contraseña debe contener mínimo 8 y máximo 30 caracteres. \n
    • La contraseña debe contener mayúsculas y minúsculas \n
    • La contraseña debe contener al menos un valor numérico \n
    • La contraseña debe contener al menos un carácter especial [$@$!%*?&.]`;
  }

  get isEditing() {
    return !!this.data.user;
  }

  setFormValue(user: User) {
    this.form.patchValue({
      userId: user.userId,
      name: user.name,
      surname: user.surname,
      email: user.email,
      jobTitle: user.jobTitle,
      location: user.location,
      role: user.role.name,
    });
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
    const password = this.form.get('password')?.value;
    if (!password) return;
    return getPasswordValidationMessage(password);
  }
}
