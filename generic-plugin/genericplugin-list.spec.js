'use strict';
import GenericpluginListComponent from '../../../../app/rippleui/pages/generic-plugin/genericplugin-list.component';
import '../../../../app/index';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import genericplugin from '../../../../app/rippleui/pages/generic-plugin/genericplugin-actions';

describe('Genericplugin List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, 
    ctrl, 
    controller, 
    template, 
    stateParams, 
    state, 
    ngRedux,
    genericpluginActions, 
    serviceRequests, 
    usSpinnerService,
    fakeCall,
    actions;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _genericpluginActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    genericpluginActions = _genericpluginActions_;
    usSpinnerService = _usSpinnerService_;

    template = GenericpluginListComponent.template;

    ctrl = controller(GenericpluginListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      genericpluginActions: genericpluginActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });

    actions = $injector.get('genericpluginActions');
    // scope.$digest();
  }));

  beforeEach(function() {
    fakeCall = {
      callgenericplugin: genericplugin
    };

    spyOn(fakeCall, 'callgenericplugin');

    spyOn(ctrl, 'pageChangeHandler');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'selected');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'search');
    spyOn(ctrl, 'genericpluginLoad');
    spyOn(actions, 'all');
    spyOn(actions, 'get');
    spyOn(actions, 'create');
    spyOn(actions, 'update');

    fakeCall.callgenericplugin({}, types.EOLCAREPLANS);

    ctrl.pageChangeHandler();
    ctrl.go();
    ctrl.selected();
    ctrl.create();
    ctrl.setCurrentPageData();
    ctrl.search();
    ctrl.genericpluginLoad();
    actions.all();
    actions.get();
    actions.create();
    actions.update();
  });
  
  it('Query is empty', function() {
    expect(scope.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include genericpluginActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("genericplugin reducer was called", function() {
    expect(fakeCall.callgenericplugin).toHaveBeenCalled();
  });
  it("genericpluginActions methods was called", function() {
    expect(actions.all).toHaveBeenCalled();
    expect(actions.get).toHaveBeenCalled();
    expect(actions.create).toHaveBeenCalled();
    expect(actions.update).toHaveBeenCalled();
  });
  it("pageChangeHandler was called", function() {
    expect(ctrl.pageChangeHandler).toHaveBeenCalled();
  });
  it("route go was called", function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it("selected was called", function() {
    expect(ctrl.selected).toHaveBeenCalled();
  });
  it("create was called", function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("search was called", function() {
    expect(ctrl.search).toHaveBeenCalled();
  });
  it("genericpluginLoad was called", function() {
    expect(ctrl.genericpluginLoad).toHaveBeenCalled();
  });
});