"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _random = require("./random");

var _bignumber = require("bignumber.js");

var _bignumber2 = _interopRequireDefault(_bignumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlanOutOpRandomCoreCompatible = function (_PlanOutOpRandom) {
  _inherits(PlanOutOpRandomCoreCompatible, _PlanOutOpRandom);

  function PlanOutOpRandomCoreCompatible(args) {
    _classCallCheck(this, PlanOutOpRandomCoreCompatible);

    var _this = _possibleConstructorReturn(this, (PlanOutOpRandomCoreCompatible.__proto__ || Object.getPrototypeOf(PlanOutOpRandomCoreCompatible)).call(this, args));

    _this.LONG_SCALE = new _bignumber2.default("FFFFFFFFFFFFFFF", 16);
    return _this;
  }

  _createClass(PlanOutOpRandomCoreCompatible, [{
    key: "compatHashCalculation",
    value: function compatHashCalculation(hash) {
      return new _bignumber2.default(hash.substr(0, 15), 16);
    }
  }, {
    key: "compatZeroToOneCalculation",
    value: function compatZeroToOneCalculation(appendedUnit) {
      return this.getHash(appendedUnit).dividedBy(this.LONG_SCALE).toNumber();
    }
  }]);

  return PlanOutOpRandomCoreCompatible;
}(_random.PlanOutOpRandom);

var RandomIntegerCoreCompatible = function (_RandomIntegerBuilder) {
  _inherits(RandomIntegerCoreCompatible, _RandomIntegerBuilder);

  function RandomIntegerCoreCompatible() {
    _classCallCheck(this, RandomIntegerCoreCompatible);

    return _possibleConstructorReturn(this, (RandomIntegerCoreCompatible.__proto__ || Object.getPrototypeOf(RandomIntegerCoreCompatible)).apply(this, arguments));
  }

  _createClass(RandomIntegerCoreCompatible, [{
    key: "compatRandomIntegerCalculation",
    value: function compatRandomIntegerCalculation(minVal, maxVal) {
      return this.getHash().plus(minVal).modulo(maxVal - minVal + 1).toNumber();
    }
  }]);

  return RandomIntegerCoreCompatible;
}((0, _random.RandomIntegerBuilder)(PlanOutOpRandomCoreCompatible));

var UniformChoiceCoreCompatible = function (_UniformChoiceBuilder) {
  _inherits(UniformChoiceCoreCompatible, _UniformChoiceBuilder);

  function UniformChoiceCoreCompatible() {
    _classCallCheck(this, UniformChoiceCoreCompatible);

    return _possibleConstructorReturn(this, (UniformChoiceCoreCompatible.__proto__ || Object.getPrototypeOf(UniformChoiceCoreCompatible)).apply(this, arguments));
  }

  _createClass(UniformChoiceCoreCompatible, [{
    key: "compatRandomIndexCalculation",
    value: function compatRandomIndexCalculation(choices) {
      return this.getHash().modulo(choices.length).toNumber();
    }
  }]);

  return UniformChoiceCoreCompatible;
}((0, _random.UniformChoiceBuilder)(PlanOutOpRandomCoreCompatible));

var SampleCoreCompatible = function (_SampleBuilder) {
  _inherits(SampleCoreCompatible, _SampleBuilder);

  function SampleCoreCompatible() {
    _classCallCheck(this, SampleCoreCompatible);

    return _possibleConstructorReturn(this, (SampleCoreCompatible.__proto__ || Object.getPrototypeOf(SampleCoreCompatible)).apply(this, arguments));
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
}((0, _random.SampleBuilder)(PlanOutOpRandomCoreCompatible));

exports.default = {
  PlanOutOpRandom: PlanOutOpRandomCoreCompatible,
  Sample: SampleCoreCompatible,
  WeightedChoice: (0, _random.WeightedChoiceBuilder)(PlanOutOpRandomCoreCompatible),
  UniformChoice: UniformChoiceCoreCompatible,
  BernoulliFilter: (0, _random.BernoulliFilterBuilder)(PlanOutOpRandomCoreCompatible),
  BernoulliTrial: (0, _random.BernoulliTrialBuilder)(PlanOutOpRandomCoreCompatible),
  RandomInteger: RandomIntegerCoreCompatible,
  RandomFloat: (0, _random.RandomFloatBuilder)(PlanOutOpRandomCoreCompatible)
};
module.exports = exports["default"];