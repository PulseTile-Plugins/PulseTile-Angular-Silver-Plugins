let templateClinicalstatementsDetail = require('./clinicalstatements-detail.html');

class ClinicalstatementsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalstatementsActions, serviceRequests, ClinicalstatementsModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.edit = function () {
      ClinicalstatementsModal.openModal(this.currentPatient, {title: 'Edit Clinical Statement'}, this.clinicalStatement, this.currentUser);
    };
    
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.clinicalstatements.dataGet) {
        this.clinicalStatement = data.clinicalstatements.dataGet;
        this.dateCreated = moment(this.clinicalStatement.dateCreated).format('DD-MMM-YYYY');
        usSpinnerService.stop("clinicalStatementDetail-spinner");
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.clinicalstatementsLoad = clinicalstatementsActions.get;
    this.clinicalstatementsLoad($stateParams.patientId, $stateParams.clinicalStatementIndex, $stateParams.source);
  }
}

const ClinicalstatementsDetailComponent = {
  template: templateClinicalstatementsDetail,
  controller: ClinicalstatementsDetailController
};

ClinicalstatementsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalstatementsActions', 'serviceRequests', 'ClinicalstatementsModal', 'usSpinnerService'];
export default ClinicalstatementsDetailComponent;