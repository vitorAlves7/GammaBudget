// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'http://localhost:8000/',
    clientId: 're7okeDzrXFtcGFdPPupAtBinofdlsCATRHYQAGc',
    clientSecret: 'J6EpgJljdlojTF7Zp3hAPruUE5hS3cGhseSQeFPF38EzcEVobVU1eyR1XNYKIGBlrGYCABvgxEBf0EmpiNcl989ibhvSwrNUG35yvyDOF2OLBWVBd2CYS9FSnRkYDZUw',
    grantType: 'password',
    apiBaseUrl: 'http://localhost:8000',
    apiEndpoints: {
      incomingList: 'budget/v1/incoming/list',
      incomingDetail: 'budget/v1/incoming/detail',
      addItemToIncomings: 'budget/v1/incoming/create',
      updateIncomingItem: 'budget/v1/incoming/update',
      deleteIncomingItem: 'budget/v1/incoming/delete',
      expensesList: 'budget/v1/revenue/list',
      expenseDetail: 'budget/v1/revenue/detail',
      addItemToExpenses: 'budget/v1/revenue/create',
      updateExpenseItem: 'budget/v1/revenue/update',
      deleteExpenseItem: 'budget/v1/revenue/delete',
      listCategoriesExpense: 'budget/v1/revenue/list-categories',
      listCategoriesIncoming: 'budget/v1/incoming/list-categories',
      createAlert: 'budget/v1/alert/create',
      deleteAlert: 'budget/v1/alert/delete',
      listAlerts: 'budget/v1/alert/list',
      addLimit: 'budget/v1/limit/create',
      listLimit: 'budget/v1/limit/list',
      updateLimit: 'budget/v1/limit/update',
      deleteLimit: 'budget/v1/limit/delete'
    },
    userId: '3',
    email: 'gammabudgetapp@gmail.com',
    apiUrlTerms: 'https://terms-qynk.onrender.com/term/generate',
    apiURlPrivacyTerms: 'https://privacy-terms-ypsw.onrender.com/privacy/generate'
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.