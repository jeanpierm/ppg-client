import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateTwoFormControlsAreEquals(
  controlName1: string,
  controlName2: string
) {
  return function (formGroup: AbstractControl): ValidationErrors | null {
    const control1 = formGroup.get(controlName1);
    const control2 = formGroup.get(controlName2);

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

export function getPasswordValidationMessage(password: string): string | void {
  if (
    password.toString().trim().length < 8 ||
    password.toString().trim().length > 30
  ) {
    return 'La contraseña debe contener mínimo 8 y máximo 30 caracteres';
  }
  if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])([A-Za-z]|[^ ])*$/)) {
    return 'La contraseña debe contener mayúsculas y minúsculas';
  }
  if (!password.match(/^(?=.*\d)([\d]|[^ ])*$/)) {
    return 'La contraseña debe contener al menos un valor numérico';
  }
  if (!password.match(/^(?=.*[#@$!%*?&.])([#@$!%*?&.]|[^ ])/)) {
    return 'La contraseña debe contener al menos un carácter especial [#@$!%*?&.]';
  }
}
