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
