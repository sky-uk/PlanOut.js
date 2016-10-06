'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./lib/utils');

var globalInputArgs = {};
var experimentSpecificInputArgs = {};

var fetchInputs = function fetchInputs(args) {
  if (!args) {
    return {};
  }

  return resolveArgs((0, _utils.shallowCopy)(args));
};

var resolveArgs = function resolveArgs(args) {
  (0, _utils.forEach)(Object.keys(args), function (key) {
    if ((0, _utils.isFunction)(args[key])) {
      args[key] = args[key]();
    }
  });
  return args;
};

var registerExperimentInput = function registerExperimentInput(key, value, experimentName) {
  if (!experimentName) {
    globalInputArgs[key] = value;
  } else {
    if (!experimentSpecificInputArgs[experimentName]) {
      experimentSpecificInputArgs[experimentName] = {};
    }
    experimentSpecificInputArgs[experimentName][key] = value;
  }
};

var getExperimentInputs = function getExperimentInputs(experimentName) {
  var inputArgs = fetchInputs(globalInputArgs);
  if (experimentName && experimentSpecificInputArgs[experimentName]) {
    return (0, _utils.extend)(inputArgs, fetchInputs(experimentSpecificInputArgs[experimentName]));
  }
  return inputArgs;
};

exports.default = { registerExperimentInput: registerExperimentInput, getExperimentInputs: getExperimentInputs };
module.exports = exports['default'];