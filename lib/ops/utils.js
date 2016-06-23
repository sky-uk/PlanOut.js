'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _core = require('./core');

var core = _interopRequireWildcard(_core);

var _random = require('./random');

var random = _interopRequireWildcard(_random);

var _libUtils = require('../lib/utils');

var initFactory = function initFactory() {
  return {
    'literal': core.Literal,
    'get': core.Get,
    'set': core.Set,
    'seq': core.Seq,
    'return': core.Return,
    'index': core.Index,
    'array': core.Arr,
    'equals': core.Equals,
    'and': core.And,
    'or': core.Or,
    ">": core.GreaterThan,
    "<": core.LessThan,
    ">=": core.GreaterThanOrEqualTo,
    "<=": core.LessThanOrEqualTo,
    "%": core.Mod,
    "/": core.Divide,
    "not": core.Not,
    "round": core.Round,
    "negative": core.Negative,
    "min": core.Min,
    "max": core.Max,
    "length": core.Length,
    "coalesce": core.Coalesce,
    "map": core.Map,
    "cond": core.Cond,
    "product": core.Product,
    "sum": core.Sum,
    "randomFloat": random.RandomFloat,
    "randomInteger": random.RandomInteger,
    "bernoulliTrial": random.BernoulliTrial,
    "bernoulliFilter": random.BernoulliFilter,
    "uniformChoice": random.UniformChoice,
    "weightedChoice": random.WeightedChoice,
    "sample": random.Sample
  };
};

var operators = initFactory();

var isOperator = function isOperator(op) {
  return (0, _libUtils.isObject)(op) && op.op;
};

var operatorInstance = function operatorInstance(params) {
  var op = params.op;
  if (!operators[op]) {
    throw 'Unknown Operator {op}';
  }

  return new operators[op](params);
};

var StopPlanOutException = function StopPlanOutException(inExperiment) {
  _classCallCheck(this, StopPlanOutException);

  this.inExperiment = inExperiment;
};

exports.initFactory = initFactory;
exports.isOperator = isOperator;
exports.operatorInstance = operatorInstance;
exports.StopPlanOutException = StopPlanOutException;