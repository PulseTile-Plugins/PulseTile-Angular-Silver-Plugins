let templateGenericMdtDetail= require('./generic-mdt-detail.html');

class GenericMdtDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, genericmdtActions, GenericMdtModal, usSpinnerService) {
    this.edit = function () {
      this.cancerMdt.timeOfMeeting = new Date(this.cancerMdt.timeOfMeeting);
      GenericMdtModal.openModal(this.currentPatient, {title: 'Edit MDT'}, this.cancerMdt, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.genericMdt.dataGet) {
        this.cancerMdt = data.genericMdt.dataGet;
        usSpinnerService.stop('mdtDetail-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.cancermdtLoad = genericmdtActions.get;
    this.cancermdtLoad($stateParams.patientId, $stateParams.cancerMdtIndex);
  }
}

const GenericMdtDetailComponent = {
  template: templateGenericMdtDetail,
  controller: GenericMdtDetailController
};

GenericMdtDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'genericmdtActions', 'GenericMdtModal', 'usSpinnerService'];
export default GenericMdtDetailComponent;