'use strict';
import GenericpluginDetailComponent from '../../../../app/rippleui/pages/generic-plugin/genericplugin-detail.component';
import '../../../../app/index';

describe('Genericplugin Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, genericpluginActions, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _genericpluginActions_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    genericpluginActions = _genericpluginActions_;
    usSpinnerService = _usSpinnerService_;

    template = GenericpluginDetailComponent.template;
    ctrl = controller(GenericpluginDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      genericpluginActions: genericpluginActions,
      usSpinnerService: usSpinnerService
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'edit');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'genericpluginLoad');

    ctrl.edit();
    ctrl.setCurrentPageData();
    ctrl.genericpluginLoad();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it("edit was called", function() {
    expect(ctrl.edit).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("genericpluginLoad was called", function() {
    expect(ctrl.genericpluginLoad).toHaveBeenCalled();
  });
});