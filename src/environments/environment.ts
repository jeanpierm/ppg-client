// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const ppgApiConfig = {
  base: 'http://127.0.0.1:3000/ppg-api/v1',
  paths: {
    downloadPreferences: {
      me: '/me/download-preferences',
    },
    auth: {
      base: '/auth',
      login: '/login',
      register: '/register',
      refresh: '/refresh',
    },
    users: '/users',
    professionalProfiles: '/professional-profiles',
    technologies: '/technologies',
    techTypes: '/tech-types',
    account: {
      base: '/account',
      password: {
        base: '/password',
        recover: '/recover',
        reset: {
          base: '/reset',
          validate: '/validate',
        },
      },
    },
  },
};

const authPaths = ppgApiConfig.paths.auth;
const accountPaths = ppgApiConfig.paths.account;
const passwordPaths = accountPaths.password;

const passwordApi = `${ppgApiConfig.base}${accountPaths.base}${passwordPaths.base}`;

export const environment = {
  production: false,
  ppgApi: {
    base: ppgApiConfig.base,
    login: `${ppgApiConfig.base}${authPaths.base}${authPaths.login}`,
    register: `${ppgApiConfig.base}${authPaths.base}${authPaths.register}`,
    refreshJwt: `${ppgApiConfig.base}${authPaths.base}${authPaths.refresh}`,
    users: `${ppgApiConfig.base}${ppgApiConfig.paths.users}`,
    professionalProfiles: `${ppgApiConfig.base}${ppgApiConfig.paths.professionalProfiles}`,
    meDownloadPreferences: `${ppgApiConfig.base}${ppgApiConfig.paths.downloadPreferences.me}`,
    technologies: `${ppgApiConfig.base}${ppgApiConfig.paths.technologies}`,
    techTypes: `${ppgApiConfig.base}${ppgApiConfig.paths.techTypes}`,
    account: `${ppgApiConfig.base}${accountPaths.base}`,
    updatePassword: passwordApi,
    recoverPassword: `${passwordApi}${passwordPaths.recover}`,
    resetPassword: `${passwordApi}${passwordPaths.reset.base}`,
    validateResetPassword: `${passwordApi}${passwordPaths.reset.base}${passwordPaths.reset.validate}`,
  },
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
