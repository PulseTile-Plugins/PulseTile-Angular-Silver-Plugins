let templateClinicalstatementsList = require('./clinicalstatements-list.html');

class ClinicalstatementsListController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalstatementsActions, serviceRequests, ClinicalstatementsModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;
    $scope.query = '';

    this.create = function () {
      ClinicalstatementsModal.openModal(this.currentPatient, {title: 'Create Clinical Statement'}, {}, this.currentUser);
    };
    
    this.go = function (id, clinicalStatementSource) {
      $state.go('clinicalStatements-detail', {
        patientId: $stateParams.patientId,
        clinicalStatementIndex: id,
        filter: $scope.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType,
        source: clinicalStatementSource
      });
    };

    this.pageChangeHandler = function (newPage) {
      $scope.currentPage = newPage;
    };

    if ($stateParams.page) {
      $scope.currentPage = $stateParams.page;
    }

    this.search = function (row) {
      return (
        row.type.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.author.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.dateCreated.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.source.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
      );
    };

    if ($stateParams.filter) {
      $scope.query = $stateParams.filter;
    }


    this.selected = function (clinicalStatementIndex) {
      return clinicalStatementIndex === $stateParams.clinicalStatementIndex;
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.clinicalstatements.data) {
        this.clinicalStatements = data.clinicalstatements.data;
        for (var i = 0; i < this.clinicalStatements.length; i++) {
          this.clinicalStatements[i].dateCreated = moment(this.clinicalStatements[i].dateCreated).format('DD-MMM-YYYY');
        }
        usSpinnerService.stop("patientSummary-spinner");
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.clinicalstatementsLoad = clinicalstatementsActions.all;
    this.clinicalstatementsLoad($stateParams.patientId);
  }
}

const ClinicalstatementsListComponent = {
  template: templateClinicalstatementsList,
  controller: ClinicalstatementsListController
};

ClinicalstatementsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalstatementsActions', 'serviceRequests', 'ClinicalstatementsModal', 'usSpinnerService'];
export default ClinicalstatementsListComponent;