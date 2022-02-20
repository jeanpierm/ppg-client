import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal, {
  SweetAlertOptions,
  SweetAlertResult,
  SweetAlertUpdatableParameters,
} from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public myForm: FormGroup;
  public hide: boolean;
  public user: any;
  constructor(private userService: UserService, public fb: FormBuilder) {
    this.hide = true;
    this.myForm = new FormGroup({});
    this.user = {};
  }

  ngOnInit(): void {
    this.onForm();
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
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      Swal.fire({
        title: 'Por favor llene todos los campos!',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
    this.setValues();
    this.userService.save(this.user).subscribe({
      next: (res) => {
        this.user = {};
        Swal.fire({
          icon: 'success',
          title: 'Se ha registrado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.onForm();
      },
      error: (err) => console.error(err),
    });
  }

  setValues() {
    this.user.name = this.myForm.controls['name'].value;
    this.user.surname = this.myForm.controls['surname'].value;
    this.user.email = this.myForm.controls['email'].value;
    this.user.password = this.myForm.controls['password'].value;
  }
}
