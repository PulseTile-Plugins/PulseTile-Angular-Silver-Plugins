let templateClinicalnotesDetail = require('./clinicalnotes-detail.html');

class ClinicalnotesDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalnotesActions, serviceRequests, ClinicalnotesModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.edit = function () {
      ClinicalnotesModal.openModal(this.currentPatient, {title: 'Edit Clinical Note'}, this.clinicalNote, this.currentUser);
    };
    
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.clinicalnotes.dataGet) {
        this.clinicalNote = data.clinicalnotes.dataGet;
        this.dateCreated = moment(this.clinicalNote.dateCreated).format('DD-MMM-YYYY');
        usSpinnerService.stop("clinicalNoteDetail-spinner");
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.clinicalnotesLoad = clinicalnotesActions.get;
    this.clinicalnotesLoad($stateParams.patientId, $stateParams.clinicalNoteIndex, $stateParams.source);
  }
}

const ClinicalnotesDetailComponent = {
  template: templateClinicalnotesDetail,
  controller: ClinicalnotesDetailController
};

ClinicalnotesDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalnotesActions', 'serviceRequests', 'ClinicalnotesModal', 'usSpinnerService'];
export default ClinicalnotesDetailComponent;