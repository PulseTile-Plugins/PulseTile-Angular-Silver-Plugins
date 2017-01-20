routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/search');
  console.log('routing test');
  $stateProvider
      .state('transferOfCare', {
        url: '/patients/{patientId:int}/transfer-of-care-list?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<transfer-of-care-list-component></transfer-of-care-list-component>'}
        }
      })
      .state('transferOfCare-detail', {
        url: '/patients/{patientId:int}/transfer-of-care-detail/{transferOfCareIndex}?filter&page&reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<transfer-of-care--list-component></transfer-of-care--list-component>'},
          detail: {template: '<transfer-of-care--detail-component></transfer-of-care--detail-component>'}
        }
      });
}

export default routeConfig;