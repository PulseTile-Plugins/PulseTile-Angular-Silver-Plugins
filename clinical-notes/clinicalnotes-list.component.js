let templateClinicalnotesList = require('./clinicalnotes-list.html');

class ClinicalnotesListController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalnotesActions, serviceRequests, ClinicalnotesModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;
    $scope.query = '';

    this.create = function () {
      ClinicalnotesModal.openModal(this.currentPatient, {title: 'Create Clinical Note'}, {}, this.currentUser);
    };
    
    this.go = function (id, clinicalNoteSource) {
      $state.go('clinicalNotes-detail', {
        patientId: $stateParams.patientId,
        clinicalNoteIndex: id,
        filter: $scope.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType,
        source: clinicalNoteSource
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


    this.selected = function (clinicalNoteIndex) {
      return clinicalNoteIndex === $stateParams.clinicalNoteIndex;
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.clinicalnotes.data) {
        this.clinicalNotes = data.clinicalnotes.data;
        for (var i = 0; i < this.clinicalNotes.length; i++) {
          this.clinicalNotes[i].dateCreated = moment(this.clinicalNotes[i].dateCreated).format('DD-MMM-YYYY');
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

    this.clinicalnotesLoad = clinicalnotesActions.all;
    this.clinicalnotesLoad($stateParams.patientId);
  }
}

const ClinicalnotesListComponent = {
  template: templateClinicalnotesList,
  controller: ClinicalnotesListController
};

ClinicalnotesListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalnotesActions', 'serviceRequests', 'ClinicalnotesModal', 'usSpinnerService'];
export default ClinicalnotesListComponent;