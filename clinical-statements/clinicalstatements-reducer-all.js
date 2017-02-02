import * as types from '../../../constants/ActionTypes';

const INITIAL_STATE = {
  isFetching: false,
  error: false,
  data: null,
  dataGet: null,
  dataCreate: null,
  dataUpdate: null
};

export default function contacts(state = INITIAL_STATE, action) {
  const {payload} = action;

  var actions = {
    [types.CLINICALSTATEMENTS]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.CLINICALSTATEMENTS_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        data: payload.response
      });
    },
    [types.CLINICALSTATEMENTS_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.CLINICALSTATEMENTS_GET]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.CLINICALSTATEMENTS_GET_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataGet: payload.response
      });
    },
    [types.CLINICALSTATEMENTS_GET_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.CLINICALSTATEMENTS_CREATE]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.CLINICALSTATEMENTS_CREATE_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataCreate: payload.response
      });
    },
    [types.CLINICALSTATEMENTS_CREATE_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.CLINICALSTATEMENTS_UPDATE]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.CLINICALSTATEMENTS_UPDATE_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataUpdate: payload.response
      });
    },
    [types.CLINICALSTATEMENTS_UPDATE_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    }
  };

  return actions[action.type] ?
    actions[action.type](state) :
    state;
}