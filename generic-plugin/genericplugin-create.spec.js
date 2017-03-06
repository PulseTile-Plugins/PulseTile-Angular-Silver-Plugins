import GenericpluginCreateComponent from '../../../../app/rippleui/pages/generic-plugin/genericplugin-create.component';
import '../../../../app/index';

describe('Genericplugin Create', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, state;

    beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _genericpluginActions_, _serviceRequests_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;

        template = GenericpluginCreateComponent.template;
        ctrl = controller(GenericpluginCreateComponent.controller, {
            $scope: scope,
            $state: state,
            $stateParams: _$stateParams_,
            $ngRedux: _$ngRedux_,
            genericpluginActions: _genericpluginActions_,
            serviceRequests: _serviceRequests_
        });
    }));

    beforeEach(function() {
        spyOn(ctrl, 'setCurrentPageData');
        spyOn(ctrl, 'goList');
        spyOn(ctrl, 'cancel');
        spyOn(scope, 'genericpluginCreate');
        spyOn(scope, 'create');

        ctrl.setCurrentPageData();
        ctrl.goList();
        ctrl.cancel();
        scope.genericpluginCreate();
        scope.create();
    });

    it('Template exist', function() {
        expect(template).toBeDefined();
    });
    it("setCurrentPageData was called", function() {
        expect(ctrl.setCurrentPageData).toHaveBeenCalled();
    });
    it("goList was called", function() {
        expect(ctrl.goList).toHaveBeenCalled();
    });
    it("cancel was called", function() {
        expect(ctrl.cancel).toHaveBeenCalled();
    });
    it("genericpluginCreate was called", function() {
        expect(scope.genericpluginCreate).toHaveBeenCalled();
    });
    it("create was called", function() {
        expect(scope.create).toHaveBeenCalled();
    });
});