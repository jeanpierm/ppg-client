export class PasswordConfig {
  static readonly regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&.])([A-Za-z\d#@$!%*?&.]|[^ ])/;
  static readonly minLength = 8;
  static readonly maxLength = 30;
}
