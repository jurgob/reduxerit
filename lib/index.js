var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const getReducerName = function (reducerName) {
  return reducerName + '_SET_STATE';
};

function createReducer(initialState, handlers) {
  return function reducer() {
    let state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    let action = arguments[1];

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export const createBasicReducer = function (reducerName, initialState) {

  const _initialState = _extends({}, initialState, {
    reducerName
  });

  return createReducer(_initialState, {
    [getReducerName(reducerName)]: function (state, action) {
      return _extends({}, state, action.state);
    }

  });
};

export const getReducerState = function (store, reducerName) {
  return function () {
    const globalState = store.getState();
    const stateReducerName = Object.keys(globalState).find(function (p) {
      return globalState[p].reducerName === reducerName;
    });
    return globalState[stateReducerName];
  };
};

export const createUpdateStateAction = function (reducerName) {
  return function (state) {
    return {
      type: getReducerName(reducerName),
      state
    };
  };
};