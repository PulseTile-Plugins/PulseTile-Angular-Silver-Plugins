'use strict';
import DrawingsListComponent from '../drawings-list.component';

describe('Drawings List', function() {
  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _drawingsActions_, _serviceRequests_, _usSpinnerService_, _serviceFormatted_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();

    template = DrawingsListComponent.template;

    ctrl = controller(DrawingsListComponent.controller, {
      $scope: scope,
      $state: _$state_,
      $stateParams: _$stateParams_,
      $ngRedux: _$ngRedux_,
      drawingsActions: _drawingsActions_,
      serviceRequests: _serviceRequests_,
      usSpinnerService: _usSpinnerService_,
      serviceFormatted: _serviceFormatted_
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'actionLoadList');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'setCurrentPageData');

    ctrl.actionLoadList();
    ctrl.create();
    ctrl.go();
    ctrl.setCurrentPageData();
  });

  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });

  it('actionLoadList was called', function() {
    expect(ctrl.actionLoadList).toHaveBeenCalled();
  });
  it('create was called', function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it('go was called', function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it('setCurrentPageData was called', function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});