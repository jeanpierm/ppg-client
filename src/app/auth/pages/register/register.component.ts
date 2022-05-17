import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AccountService } from 'src/app/ppg/services/account.service';
import { GenericErrorStateMatcher } from 'src/app/shared/error-state-matcher';
import Swal from 'sweetalert2';
import { RegisterRequest } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  static readonly PATH = 'register';

  public registerForm: FormGroup;
  public hide: boolean;
  public user: any;
  matcher = new GenericErrorStateMatcher();

  constructor(
    private authService: AuthService,
    public fb: FormBuilder,
    public accountService: AccountService,
    private router: Router
  ) {
    this.hide = true;
    this.registerForm = new FormGroup({});
    this.user = {};
  }

  ngOnInit(): void {
    this.initForm();
  }

  get name() {
    return this.registerForm.get('name');
  }

  get surname() {
    return this.registerForm.get('surname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get password2() {
    return this.registerForm.get('password2');
  }

  initForm() {
    this.registerForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/),
          ],
        ],
        surname: [
          '',
          [
            Validators.required,
            Validators.pattern(/[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*/),
          ],
        ],
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
        password2: ['', Validators.required],
      },
      {
        validators: [this.equalPasswords('password', 'password2')],
      }
    );
  }

  async register() {
    if (this.registerForm.invalid) {
      Swal.fire({
        title: 'Por favor, ingrese todos los campos correctamente',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
    const newUser = this.getUserFromForm();
    this.authService.register(newUser).subscribe({
      next: async (_) => {
        Swal.fire({
          icon: 'success',
          title: 'Se ha registrado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.initForm();
        const { data } = await firstValueFrom(this.accountService.getAccount());
        this.set('name', data.name);
        this.set('surname', data.surname);
        this.set('email', data.email);
        this.router.navigate(['/home']);
      },
      error: (err) => console.error(err),
    });
  }

  getUserFromForm(): RegisterRequest {
    const { name, email, surname, password } = this.registerForm.value;
    return { name, email, surname, password };
  }

  equalPasswords(controlName1: string, controlName2: string) {
    return function (formGroup: AbstractControl): ValidationErrors | null {
      const control1 = formGroup.get(controlName1);
      const control2 = formGroup.get(controlName2);
      // debugger;
      if (control2?.errors && !control2?.errors['doNotMatch']) {
        return null;
      }
      if (control1?.value !== control2?.value) {
        const errors = { doNotMatch: true };
        control2?.setErrors({ ...control2?.errors, ...errors });
        return errors;
      }
      control2?.setErrors(null);
      return null;
    };
  }

  set(key: string, data: string) {
    try {
      localStorage.setItem(key, data);
    } catch (e) {
      console.log(e);
    }
  }

  validatePassword(controlName: string): String {
    let error: String = '';
    const control = this.registerForm.get(controlName)?.value;
    if (
      control.toString().trim().length < 8 ||
      control.toString().trim().length > 15
    ) {
      error = 'La contraseña debe contener mínimo 8 y máximo 15 caracteres';
    } else if (!control.match(/^(?=.*[a-z])(?=.*[A-Z])([A-Za-z]|[^ ])*$/)) {
      error = 'La contraseña debe contener mayúsculas y munúsculas';
    } else if (!control.match(/^(?=.*\d)([\d]|[^ ])*$/)) {
      error = 'La contraseña debe contener al menos un valor numérico';
    } else if (!control.match(/^(?=.*[$@$!%*?&.])([$@$!%*?&.]|[^ ])*$/)) {
      error =
        'La contraseña debe contener al menos un caracter especial [$@$!%*?&.]';
    }

    return error;
  }
}
