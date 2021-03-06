// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  metamodelUrl: 'https://crowd-core.fi.uncoma.edu.ar/',
  metamodelVerbalizationUrl: 'https://crowd-test.fi.uncoma.edu.ar/',
  metamodelOwlUrl: 'https://crowd.fi.uncoma.edu.ar/crowd2/reasoning/translate/metamodel2owl.php',
  reasoningUrl: 'https://crowd.fi.uncoma.edu.ar/crowd2/reasoning/querying/metamodelsat.php'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
