"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require("./base");

var _sha = require("../lib/sha1");

var _sha2 = _interopRequireDefault(_sha);

var _utils = require("../lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlanOutOpRandom = function (_PlanOutOpSimple) {
  _inherits(PlanOutOpRandom, _PlanOutOpSimple);

  function PlanOutOpRandom(args) {
    _classCallCheck(this, PlanOutOpRandom);

    var _this = _possibleConstructorReturn(this, (PlanOutOpRandom.__proto__ || Object.getPrototypeOf(PlanOutOpRandom)).call(this, args));

    _this.LONG_SCALE = 0xFFFFFFFFFFFFF;
    return _this;
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
      if (!(0, _utils.isArray)(unit)) {
        unit = [unit];
      }
      if (appendedUnit) {
        unit.push(appendedUnit);
      }
      return unit;
    }
  }, {
    key: "getUniform",
    value: function getUniform() {
      var minVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.0;
      var maxVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.0;
      var appendedUnit = arguments[2];

      var zeroToOne = this.compatZeroToOneCalculation(appendedUnit);
      return zeroToOne * (maxVal - minVal) + minVal;
    }
  }, {
    key: "getHash",
    value: function getHash(appendedUnit) {
      var fullSalt;
      if (this.args.full_salt) {
        fullSalt = this.getArgString('full_salt') + '.';
      } else {
        var salt = this.getArgString('salt');
        fullSalt = this.mapper.get('experimentSalt') + '.' + salt + this.mapper.get('saltSeparator');
      }

      var unitStr = this.getUnit(appendedUnit).map(function (element) {
        return String(element);
      }).join('.');
      var hashStr = fullSalt + unitStr;
      var hash = _sha2.default.hash(hashStr);
      return this.compatHashCalculation(hash);
    }
  }]);

  return PlanOutOpRandom;
}(_base.PlanOutOpSimple);

var RandomFloatBuilder = function RandomFloatBuilder(RandomOpsClass) {
  return function (_RandomOpsClass) {
    _inherits(_class, _RandomOpsClass);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: "simpleExecute",
      value: function simpleExecute() {
        var minVal = this.getArgNumber('min');
        var maxVal = this.getArgNumber('max');
        return this.getUniform(minVal, maxVal);
      }
    }]);

    return _class;
  }(RandomOpsClass);
};

var RandomIntegerBuilder = function RandomIntegerBuilder(RandomOpsClass) {
  return function (_RandomOpsClass2) {
    _inherits(_class2, _RandomOpsClass2);

    function _class2() {
      _classCallCheck(this, _class2);

      return _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).apply(this, arguments));
    }

    _createClass(_class2, [{
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

    return _class2;
  }(RandomOpsClass);
};

var BernoulliTrialBuilder = function BernoulliTrialBuilder(RandomOpsClass) {
  return function (_RandomOpsClass3) {
    _inherits(_class3, _RandomOpsClass3);

    function _class3() {
      _classCallCheck(this, _class3);

      return _possibleConstructorReturn(this, (_class3.__proto__ || Object.getPrototypeOf(_class3)).apply(this, arguments));
    }

    _createClass(_class3, [{
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

    return _class3;
  }(RandomOpsClass);
};

var BernoulliFilterBuilder = function BernoulliFilterBuilder(RandomOpsClass) {
  return function (_RandomOpsClass4) {
    _inherits(_class4, _RandomOpsClass4);

    function _class4() {
      _classCallCheck(this, _class4);

      return _possibleConstructorReturn(this, (_class4.__proto__ || Object.getPrototypeOf(_class4)).apply(this, arguments));
    }

    _createClass(_class4, [{
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

    return _class4;
  }(RandomOpsClass);
};

var UniformChoiceBuilder = function UniformChoiceBuilder(OpRandomClass) {
  return function (_OpRandomClass) {
    _inherits(_class5, _OpRandomClass);

    function _class5() {
      _classCallCheck(this, _class5);

      return _possibleConstructorReturn(this, (_class5.__proto__ || Object.getPrototypeOf(_class5)).apply(this, arguments));
    }

    _createClass(_class5, [{
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

    return _class5;
  }(OpRandomClass);
};

var WeightedChoiceBuilder = function WeightedChoiceBuilder(RandomOpsClass) {
  return function (_RandomOpsClass5) {
    _inherits(_class6, _RandomOpsClass5);

    function _class6() {
      _classCallCheck(this, _class6);

      return _possibleConstructorReturn(this, (_class6.__proto__ || Object.getPrototypeOf(_class6)).apply(this, arguments));
    }

    _createClass(_class6, [{
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
        return (0, _utils.reduce)(cumWeights, function (retVal, curVal, i) {
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

    return _class6;
  }(RandomOpsClass);
};

var SampleBuilder = function SampleBuilder(RandomOpsClass) {
  return function (_RandomOpsClass6) {
    _inherits(_class7, _RandomOpsClass6);

    function _class7() {
      _classCallCheck(this, _class7);

      return _possibleConstructorReturn(this, (_class7.__proto__ || Object.getPrototypeOf(_class7)).apply(this, arguments));
    }

    _createClass(_class7, [{
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
        var choices = (0, _utils.shallowCopy)(this.getArgList('choices'));
        var numDraws = 0;
        if (this.args.draws !== undefined) {
          numDraws = this.getArgNumber('draws');
        } else {
          numDraws = choices.length;
        }
        return this.sample(choices, numDraws);
      }
    }]);

    return _class7;
  }(RandomOpsClass);
};

exports.default = {
  PlanOutOpRandom: PlanOutOpRandom,
  SampleBuilder: SampleBuilder,
  Sample: SampleBuilder(PlanOutOpRandom),
  WeightedChoiceBuilder: WeightedChoiceBuilder,
  WeightedChoice: WeightedChoiceBuilder(PlanOutOpRandom),
  UniformChoiceBuilder: UniformChoiceBuilder,
  UniformChoice: UniformChoiceBuilder(PlanOutOpRandom),
  BernoulliFilterBuilder: BernoulliFilterBuilder,
  BernoulliFilter: BernoulliFilterBuilder(PlanOutOpRandom),
  BernoulliTrialBuilder: BernoulliTrialBuilder,
  BernoulliTrial: BernoulliTrialBuilder(PlanOutOpRandom),
  RandomIntegerBuilder: RandomIntegerBuilder,
  RandomInteger: RandomIntegerBuilder(PlanOutOpRandom),
  RandomFloatBuilder: RandomFloatBuilder,
  RandomFloat: RandomFloatBuilder(PlanOutOpRandom)
};
module.exports = exports["default"];