routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/search');
  console.log('routing test');
  $stateProvider

      .state('clinicalStatements', {
        url: '/patients/{patientId:int}/clinicalStatements?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<clinicalStatements-list-component></clinicalStatements-list-component>'}
        }
      })
      .state('clinicalStatements-detail', {
        url: '/patients/{patientId:int}/clinicalStatements/{clinicalStatementIndex}?filter&page&reportType&searchString&queryType&source',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<clinicalStatements-list-component></clinicalStatements-list-component>'},
          detail: {template: '<clinicalStatements-detail-component></clinicalStatements-detail-component>'}
        }
      });
}

export default routeConfig;