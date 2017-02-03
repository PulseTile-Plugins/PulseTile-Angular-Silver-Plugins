routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/search');
  console.log('routing test');
  $stateProvider
    .state('genericMdt', {
      url: '/patients/{patientId:int}/generic-mdt-list?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<generic-mdt-list-component></generic-mdt-list-component>'}
      },
      breadcrumbs: [{
        title: 'Patient Listings',
        state: 'patients-list'
      }, {
        title: 'Patient Summary',
        state: 'patients-summary'
      }, {
        title: 'MDT',
        state: 'genericMdt'
      }]
    })
    .state('genericMdt-detail', {
      url: '/patients/{patientId:int}/generic-mdt-detail/{genericMdtIndex}?filter&page&reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<generic-mdt-list-component></generic-mdt-list-component>'},
        detail: {template: '<generic-mdt-detail-component></generic-mdt-detail-component>'}
      },
      params: { source: '{}' },
      breadcrumbs: [{
        title: 'Patient Listings',
        state: 'patients-list'
      }, {
        title: 'Patient Summary',
        state: 'patients-summary'
      }, {
        title: 'MDT',
        state: 'genericMdt'
      }]
    })
    .state('genericMdt-create', {
      url: '/patients/{patientId:int}/generic-mdt/create?reportType&searchString&queryType',
      views: {
        banner: {template: '<patients-banner-component></patients-banner-component>'},
        actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
        main: {template: '<generic-mdt-list-component></generic-mdt-list-component>'},
        detail: {template: '<generic-mdt-create-component></generic-mdt-create-component>'}
      },
      breadcrumbs: [{
        title: 'Patient Listings',
        state: 'patients-list'
      }, {
        title: 'Patient Summary',
        state: 'patients-summary'
      }, {
        title: 'MDT',
        state: 'genericMdt'
      }]
    });
}

export default routeConfig;