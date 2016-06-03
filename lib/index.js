'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeIdx = exports.push = exports.remove = exports.merge = exports.deepmerge = exports.update = exports.set = exports.utils = exports.setIn = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _deepmerge2 = require('deepmerge');

var _deepmerge3 = _interopRequireDefault(_deepmerge2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var removeIn = function removeIn(o, t, modifier) {
  var target = Array.isArray(t) ? [].concat(_toConsumableArray(t)) : t;
  var cur = void 0;
  if (typeof target === 'string') cur = target;else {
    cur = target.shift();
  }

  if (target.length === 0 || typeof target === 'string') {
    var res = _extends({}, o);
    delete res[cur];
    return res;
  } else {
    return _extends({}, o, _defineProperty({}, cur, removeIn(o[cur], target)));
  }
};

var updateIn = function updateIn(o, t, modifier) {
  var target = Array.isArray(t) ? [].concat(_toConsumableArray(t)) : t;

  var cur = void 0;
  var targetType = typeof target === 'undefined' ? 'undefined' : _typeof(target);

  if (targetType !== 'string' && !Array.isArray(target)) return modifier(o);

  if (targetType === 'string') cur = target;else {
    cur = target.shift();
  }

  if (target.length === 0 || targetType === 'string') {
    return _extends({}, o, _defineProperty({}, cur, modifier(o[cur])));
  } else {
    return _extends({}, o, _defineProperty({}, cur, updateIn(o[cur], target, modifier)));
  }
};

var setIn = exports.setIn = function setIn(o, target, val) {
  return updateIn(o, target, function () {
    return val;
  });
};

var utils = exports.utils = {
  removeIn: removeIn,
  updateIn: updateIn,
  setIn: setIn
};

var set = exports.set = function set(target) {
  return function (state, action) {
    return setIn(state, target, action.payload);
  };
};
var update = exports.update = function update(target, updateCB) {
  return function (state, action) {
    return updateIn(state, target, function (oldValue) {
      return updateCB(oldValue, action.payload);
    });
  };
};
var deepmerge = exports.deepmerge = function deepmerge(target) {
  return function (state, action) {
    return updateIn(state, target, function (obj) {
      return (0, _deepmerge3.default)(obj, action.payload);
    });
  };
};
var merge = exports.merge = function merge(target) {
  return function (state, action) {
    return updateIn(state, target, function (obj) {
      return _extends({}, obj, action.payload);
    });
  };
};
var remove = exports.remove = function remove(target) {
  return function (state) {
    return removeIn(state, target);
  };
};

//array
var push = exports.push = function push(target) {
  return function (state, action) {
    return updateIn(state, target, function (arr) {
      return arr.concat(action.payload);
    });
  };
};
var removeIdx = exports.removeIdx = function removeIdx(target) {
  return function (state, action) {
    return updateIn(state, target, function (arr) {
      var res = [].concat(_toConsumableArray(arr));
      res.splice(action.payload, 1);
      return res;
    });
  };
};