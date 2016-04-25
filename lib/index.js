var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const removeIn = function (o, target) {
  if (target.length === 0) return _extends({}, o);
  let cur = target.shift();
  if (target.length === 0) {
    const newO = _extends({}, o);
    delete newO[cur];
    return newO;
  } else {
    return _extends({}, o, { [cur]: setIn(o[cur], target) });
  }
};

const updateIn = function (o, target, modifier) {
  let cur;
  if (typeof target === 'string') cur = target;else {
    if (target.length === 0) return _extends({}, o);
    cur = target.shift();
  }

  if (target.length === 0 || typeof target === 'string') {
    return _extends({}, o, { [cur]: modifier(o(cur)) });
  } else {
    return _extends({}, o, { [cur]: updateIn(o[cur], target, modifier) });
  }
};

export const setIn = function (o, target, val) {
  return updateIn(o, target, function () {
    return val;
  });
};

export const utils = {
  removeIn,
  updateIn,
  setIn
};

export const set = function (state, action) {
  return function (target) {
    return setIn(state, target, action.payload);
  };
};
export const update = function (state, action) {
  return function (target, updateCB) {
    return updateIn(state, target, function (oldValue) {
      return updateCB(oldValue, action.payload);
    });
  };
};
export const merge = function (state, action) {
  return function (target) {
    return updateIn(state, target, function (obj) {
      return _extends({}, obj, action.payload);
    });
  };
};
export const remove = function (state) {
  return function (target) {
    return removeIn(state, target);
  };
};

//array
export const push = function (state, action) {
  return function (target) {
    return updateIn(state, target, function (arr) {
      return arr.push(action.payload);
    });
  };
};
export const removeIdx = function (state, action) {
  return function (target) {
    return updateIn(state, target, function (arr) {
      const res = [].concat(arr);
      res.splice(action.payload, 1);
      return res;
    });
  };
};