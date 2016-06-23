"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _base = require("./base");

var _libSha1 = require("../lib/sha1");

var _libSha12 = _interopRequireDefault(_libSha1);

var _libUtils = require("../lib/utils");

var PlanOutOpRandom = (function (_PlanOutOpSimple) {
  _inherits(PlanOutOpRandom, _PlanOutOpSimple);

  function PlanOutOpRandom(args) {
    _classCallCheck(this, PlanOutOpRandom);

    _get(Object.getPrototypeOf(PlanOutOpRandom.prototype), "constructor", this).call(this, args);
    this.LONG_SCALE = 0xFFFFFFFFFFFFF;
  }

  _createClass(PlanOutOpRandom, [{
    key: "compatHashCalculation",
    value: function compatHashCalculation(hash) {
      return parseInt(hash.substr(0, 13), 16);
    }
  }, {
    key: "compatZeroToOneCalculation",
    value: function compatZeroToOneCalculation(appendedUnit) {
      return this.getHash(appendedUnit) / this.LONG_SCALE;
    }
  }, {
    key: "getUnit",
    value: function getUnit(appendedUnit) {
      var unit = this.getArgMixed('unit');
      if (!(0, _libUtils.isArray)(unit)) {
        unit = [unit];
      }
      if (appendedUnit) {
        unit.push(appendedUnit);
      }
      return unit;
    }
  }, {
    key: "getUniform",
    value: function getUniform(minVal, maxVal, appendedUnit) {
      if (minVal === undefined) minVal = 0.0;
      if (maxVal === undefined) maxVal = 1.0;

      var zeroToOne = this.compatZeroToOneCalculation(appendedUnit);
      return zeroToOne * (maxVal - minVal) + minVal;
    }
  }, {
    key: "getHash",
    value: function getHash(appendedUnit) {
      var fullSalt;
      if (this.args.full_salt) {
        fullSalt = this.getArgString('full_salt');
      } else {
        var salt = this.getArgString('salt');
        fullSalt = this.mapper.get('experimentSalt') + "." + salt;
      }

      var unitStr = this.getUnit(appendedUnit).map(function (element) {
        return String(element);
      }).join('.');
      var hashStr = fullSalt + "." + unitStr;
      var hash = _libSha12["default"].hash(hashStr);
      return this.compatHashCalculation(hash);
    }
  }]);

  return PlanOutOpRandom;
})(_base.PlanOutOpSimple);

var RandomFloat = (function (_PlanOutOpRandom) {
  _inherits(RandomFloat, _PlanOutOpRandom);

  function RandomFloat() {
    _classCallCheck(this, RandomFloat);

    _get(Object.getPrototypeOf(RandomFloat.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(RandomFloat, [{
    key: "simpleExecute",
    value: function simpleExecute() {
      var minVal = this.getArgNumber('min');
      var maxVal = this.getArgNumber('max');
      return this.getUniform(minVal, maxVal);
    }
  }]);

  return RandomFloat;
})(PlanOutOpRandom);

var RandomInteger = (function (_PlanOutOpRandom2) {
  _inherits(RandomInteger, _PlanOutOpRandom2);

  function RandomInteger() {
    _classCallCheck(this, RandomInteger);

    _get(Object.getPrototypeOf(RandomInteger.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(RandomInteger, [{
    key: "compatRandomIntegerCalculation",
    value: function compatRandomIntegerCalculation(minVal, maxVal) {
      return (this.getHash() + minVal) % (maxVal - minVal + 1);
    }
  }, {
    key: "simpleExecute",
    value: function simpleExecute() {
      var minVal = this.getArgNumber('min');
      var maxVal = this.getArgNumber('max');
      return this.compatRandomIntegerCalculation(minVal, maxVal);
    }
  }]);

  return RandomInteger;
})(PlanOutOpRandom);

var BernoulliTrial = (function (_PlanOutOpRandom3) {
  _inherits(BernoulliTrial, _PlanOutOpRandom3);

  function BernoulliTrial() {
    _classCallCheck(this, BernoulliTrial);

    _get(Object.getPrototypeOf(BernoulliTrial.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(BernoulliTrial, [{
    key: "simpleExecute",
    value: function simpleExecute() {
      var p = this.getArgNumber('p');
      if (p < 0 || p > 1) {
        throw "Invalid probability";
      }

      if (this.getUniform(0.0, 1.0) <= p) {
        return 1;
      } else {
        return 0;
      }
    }
  }]);

  return BernoulliTrial;
})(PlanOutOpRandom);

var BernoulliFilter = (function (_PlanOutOpRandom4) {
  _inherits(BernoulliFilter, _PlanOutOpRandom4);

  function BernoulliFilter() {
    _classCallCheck(this, BernoulliFilter);

    _get(Object.getPrototypeOf(BernoulliFilter.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(BernoulliFilter, [{
    key: "simpleExecute",
    value: function simpleExecute() {
      var p = this.getArgNumber('p');
      var values = this.getArgList('choices');
      if (p < 0 || p > 1) {
        throw "Invalid probability";
      }
      if (values.length == 0) {
        return [];
      }
      var ret = [];
      for (var i = 0; i < values.length; i++) {
        var cur = values[i];
        if (this.getUniform(0.0, 1.0, cur) <= p) {
          ret.push(cur);
        }
      }
      return ret;
    }
  }]);

  return BernoulliFilter;
})(PlanOutOpRandom);

var UniformChoice = (function (_PlanOutOpRandom5) {
  _inherits(UniformChoice, _PlanOutOpRandom5);

  function UniformChoice() {
    _classCallCheck(this, UniformChoice);

    _get(Object.getPrototypeOf(UniformChoice.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(UniformChoice, [{
    key: "compatRandomIndexCalculation",
    value: function compatRandomIndexCalculation(choices) {
      return this.getHash() % choices.length;
    }
  }, {
    key: "simpleExecute",
    value: function simpleExecute() {
      var choices = this.getArgList('choices');
      if (choices.length === 0) {
        return [];
      }
      var randIndex = this.compatRandomIndexCalculation(choices);
      return choices[randIndex];
    }
  }]);

  return UniformChoice;
})(PlanOutOpRandom);

var WeightedChoice = (function (_PlanOutOpRandom6) {
  _inherits(WeightedChoice, _PlanOutOpRandom6);

  function WeightedChoice() {
    _classCallCheck(this, WeightedChoice);

    _get(Object.getPrototypeOf(WeightedChoice.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(WeightedChoice, [{
    key: "simpleExecute",
    value: function simpleExecute() {
      var choices = this.getArgList('choices');
      var weights = this.getArgList('weights');
      if (choices.length === 0) {
        return [];
      }
      var cumSum = 0;
      var cumWeights = weights.map(function (weight) {
        cumSum += weight;
        return cumSum;
      });
      var stopVal = this.getUniform(0.0, cumSum);
      return (0, _libUtils.reduce)(cumWeights, function (retVal, curVal, i) {
        if (retVal) {
          return retVal;
        }
        if (stopVal <= curVal) {
          return choices[i];
        }
        return retVal;
      }, null);
    }
  }]);

  return WeightedChoice;
})(PlanOutOpRandom);

var Sample = (function (_PlanOutOpRandom7) {
  _inherits(Sample, _PlanOutOpRandom7);

  function Sample() {
    _classCallCheck(this, Sample);

    _get(Object.getPrototypeOf(Sample.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Sample, [{
    key: "compatSampleIndexCalculation",
    value: function compatSampleIndexCalculation(i) {
      return this.getHash(i) % (i + 1);
    }
  }, {
    key: "compatAllowSampleStoppingPoint",
    value: function compatAllowSampleStoppingPoint() {
      return true;
    }
  }, {
    key: "sample",
    value: function sample(array, numDraws) {
      var len = array.length;
      var stoppingPoint = len - numDraws;
      var allowStoppingPoint = this.compatAllowSampleStoppingPoint();

      for (var i = len - 1; i > 0; i--) {
        var j = this.compatSampleIndexCalculation(i);

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;

        if (allowStoppingPoint && stoppingPoint === i) {
          return array.slice(i, len);
        }
      }
      return array.slice(0, numDraws);
    }
  }, {
    key: "simpleExecute",
    value: function simpleExecute() {
      var choices = (0, _libUtils.shallowCopy)(this.getArgList('choices'));
      var numDraws = 0;
      if (this.args.draws !== undefined) {
        numDraws = this.getArgNumber('draws');
      } else {
        numDraws = choices.length;
      }
      return this.sample(choices, numDraws);
    }
  }]);

  return Sample;
})(PlanOutOpRandom);

exports["default"] = { PlanOutOpRandom: PlanOutOpRandom, Sample: Sample, WeightedChoice: WeightedChoice, UniformChoice: UniformChoice, BernoulliFilter: BernoulliFilter, BernoulliTrial: BernoulliTrial, RandomInteger: RandomInteger, RandomFloat: RandomFloat };
module.exports = exports["default"];