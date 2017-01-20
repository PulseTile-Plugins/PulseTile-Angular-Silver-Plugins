routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/search');
  console.log('routing test');
  $stateProvider
      .state('cancerMdt', {
        url: '/patients/{patientId:int}/generic-mdt-list?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<generic-mdt-list-component></generic-mdt-list-component>'}
        }
      })
      .state('cancerMdt-detail', {
        url: '/patients/{patientId:int}/generic-mdt-detail/{cancerMdtIndex}?filter&page&reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<generic-mdt-list-component></generic-mdt-list-component>'},
          detail: {template: '<generic-mdt-detail-component></generic-mdt-detail-component>'}
        }
      });
}

export default routeConfig;