"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _random = require("./random");

var _bignumberJs = require("bignumber.js");

var _bignumberJs2 = _interopRequireDefault(_bignumberJs);

var PlanOutOpRandomCoreCompatible = (function (_PlanOutOpRandom) {
  _inherits(PlanOutOpRandomCoreCompatible, _PlanOutOpRandom);

  function PlanOutOpRandomCoreCompatible(args) {
    _classCallCheck(this, PlanOutOpRandomCoreCompatible);

    _get(Object.getPrototypeOf(PlanOutOpRandomCoreCompatible.prototype), "constructor", this).call(this, args);
    this.LONG_SCALE = new _bignumberJs2["default"]("FFFFFFFFFFFFFFF", 16);
  }

  _createClass(PlanOutOpRandomCoreCompatible, [{
    key: "compatHashCalculation",
    value: function compatHashCalculation(hash) {
      return new _bignumberJs2["default"](hash.substr(0, 15), 16);
    }
  }, {
    key: "compatZeroToOneCalculation",
    value: function compatZeroToOneCalculation(appendedUnit) {
      return this.getHash(appendedUnit).dividedBy(this.LONG_SCALE).toNumber();
    }
  }]);

  return PlanOutOpRandomCoreCompatible;
})(_random.PlanOutOpRandom);

var RandomIntegerCoreCompatible = (function (_RandomInteger) {
  _inherits(RandomIntegerCoreCompatible, _RandomInteger);

  function RandomIntegerCoreCompatible() {
    _classCallCheck(this, RandomIntegerCoreCompatible);

    _get(Object.getPrototypeOf(RandomIntegerCoreCompatible.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(RandomIntegerCoreCompatible, [{
    key: "compatRandomIntegerCalculation",
    value: function compatRandomIntegerCalculation(minVal, maxVal) {
      return this.getHash().plus(minVal).modulo(maxVal - minVal + 1).toNumber();
    }
  }]);

  return RandomIntegerCoreCompatible;
})(_random.RandomInteger);

var UniformChoiceCoreCompatible = (function (_UniformChoice) {
  _inherits(UniformChoiceCoreCompatible, _UniformChoice);

  function UniformChoiceCoreCompatible() {
    _classCallCheck(this, UniformChoiceCoreCompatible);

    _get(Object.getPrototypeOf(UniformChoiceCoreCompatible.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(UniformChoiceCoreCompatible, [{
    key: "compatRandomIndexCalculation",
    value: function compatRandomIndexCalculation(choices) {
      this.getHash().modulo(choices.length).toNumber();
    }
  }]);

  return UniformChoiceCoreCompatible;
})(_random.UniformChoice);

var SampleCoreCompatible = (function (_Sample) {
  _inherits(SampleCoreCompatible, _Sample);

  function SampleCoreCompatible() {
    _classCallCheck(this, SampleCoreCompatible);

    _get(Object.getPrototypeOf(SampleCoreCompatible.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(SampleCoreCompatible, [{
    key: "compatSampleIndexCalculation",
    value: function compatSampleIndexCalculation(i) {
      return this.getHash(i).modulo(i + 1).toNumber();
    }
  }, {
    key: "compatAllowSampleStoppingPoint",
    value: function compatAllowSampleStoppingPoint() {
      return false;
    }
  }]);

  return SampleCoreCompatible;
})(_random.Sample);

exports["default"] = {
  PlanOutOpRandom: PlanOutOpRandomCoreCompatible,
  Sample: SampleCoreCompatible,
  WeightedChoice: _random.WeightedChoice,
  UniformChoice: UniformChoiceCoreCompatible,
  BernoulliFilter: _random.BernoulliFilter,
  BernoulliTrial: _random.BernoulliTrial,
  RandomInteger: RandomIntegerCoreCompatible,
  RandomFloat: _random.RandomFloat
};
module.exports = exports["default"];