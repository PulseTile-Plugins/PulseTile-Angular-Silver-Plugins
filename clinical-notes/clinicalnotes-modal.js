export default function ClinicalnotesModal($uibModal, clinicalnotesActions, $stateParams) {
  var isModalClosed = true;

  var openModal = function (patient, modal, clinicalNote, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./clinicalnotes-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {

          $scope.currentUser = currentUser;
          $scope.clinicalNote = clinicalNote;
          $scope.patient = patient;
          $scope.modal = modal;

          if (modal.title === 'Edit Clinical Note') {
            $scope.isEdit = true;
            $scope.clinicalNote.dateCreated = new Date($scope.clinicalNote.dateCreated).toISOString().slice(0, 10);
          }
          else {
            $scope.isEdit = false;
            $scope.clinicalNote.dateCreated = new Date().toISOString().slice(0, 10);
          }

          $scope.ok = function (clinicalNoteForm, clinicalNote) {
            $scope.formSubmitted = true;

            if (clinicalNoteForm.$valid) {
              $uibModalInstance.close(clinicalNote);
            }

            let toAdd = {
              type: clinicalNote.type,
              note: clinicalNote.note,
              dateCreated: clinicalNote.dateCreated,
              author: clinicalNote.author,
              source: 'openehr'
            };

            if (clinicalNoteForm.$valid) {

              $uibModalInstance.close(clinicalNote);

              if ($scope.isEdit) {
                let toUpdate = {
                  type: clinicalNote.type,
                  note: clinicalNote.note,
                  author: clinicalNote.author,
                  source: clinicalNote.source,
                  sourceId: clinicalNote.sourceId
                };
                
                $scope.clinicalnotesUpdate($scope.patient.id, toUpdate);
                setTimeout(function () {
                  $state.go('clinicalNotes-detail', {
                    patientId: $scope.patient.id,
                    clinicalNoteIndex: clinicalNote.sourceId
                  });
                }, 1000);
              } else {
                $scope.clinicalnotesCreate($scope.patient.id, toAdd);
                setTimeout(function () {
                  $state.go('clinicalNotes', {
                    patientId: $scope.patient.id,
                    filter: $scope.query,
                    page: $scope.currentPage,
                    reportType: $stateParams.reportType,
                    searchString: $stateParams.searchString,
                    queryType: $stateParams.queryType
                  });
                }, 1000);
              }
            }
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.clinicalnotesCreate = clinicalnotesActions.create;
          $scope.clinicalnotesUpdate = clinicalnotesActions.update;
        }
      });
    }

    modalInstance.result.then(function() {
      isModalClosed = true;
    }, function() {
      isModalClosed = true;
    });

  };

  return {
    isModalClosed: isModalClosed,
    openModal: openModal
  };
}
ClinicalnotesModal.$inject = ['$uibModal', 'clinicalnotesActions', '$stateParams'];