// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://127.0.0.1:3000/ppg-api/v1',
  meDownloadPreferencesPath: '/me/download-preferences',
  techTypesPath: '/tech-types',
  accountPath: '/account',
  updatePasswordPath: '/account/password',
  recoverPasswordPath: '/account/recover-password',
  resetPasswordPath: '/account/reset-password',
  validateResetPasswordTokenPath: '/account/reset-password/validate',
  cloudinaryApi: 'https://api.cloudinary.com/v1_1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
