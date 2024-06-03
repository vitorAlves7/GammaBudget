// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
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
      listCategoriesIncoming: 'budget/v1/incoming/list-categories'

    },
    userId: '0'
    

  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.