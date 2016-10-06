'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assignment = require('./assignment');

var _assignment2 = _interopRequireDefault(_assignment);

var _utils = require('./ops/utils');

var _utils2 = require('./lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Interpreter = function () {
  function Interpreter(serialization) {
    var experimentSalt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'global_salt';
    var inputs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var environment = arguments[3];

    _classCallCheck(this, Interpreter);

    this._serialization = serialization;
    if (!environment) {
      this._env = new _assignment2.default(experimentSalt);
    } else {
      this._env = environment;
    }
    this.experimentSalt = this._experimentSalt = experimentSalt;
    this._evaluated = false;
    this._inExperiment = false;
    this._inputs = (0, _utils2.shallowCopy)(inputs);
  }

  _createClass(Interpreter, [{
    key: 'inExperiment',
    value: function inExperiment() {
      return this._inExperiment;
    }
  }, {
    key: 'setEnv',
    value: function setEnv(newEnv) {
      this._env = (0, _utils2.deepCopy)(newEnv);
      return this;
    }
  }, {
    key: 'has',
    value: function has(name) {
      return this._env[name];
    }
  }, {
    key: 'get',
    value: function get(name, defaultVal) {
      var inputVal = this._inputs[name];
      if (inputVal === null || inputVal === undefined) {
        inputVal = defaultVal;
      }
      var envVal = this._env.get(name);
      if (envVal !== undefined && envVal !== null) {
        return envVal;
      }
      return inputVal;
    }
  }, {
    key: 'getParams',
    value: function getParams() {
      if (!this._evaluated) {
        try {
          this.evaluate(this._serialization);
        } catch (err) {
          if (err instanceof _utils.StopPlanOutException) {
            this._inExperiment = err.inExperiment;
          }
        }
        this._evaluated = true;
      }
      return this._env.getParams();
    }
  }, {
    key: 'set',
    value: function set(name, value) {
      this._env.set(name, value);
      return this;
    }
  }, {
    key: 'getSaltSeparator',
    value: function getSaltSeparator() {
      return this._env.saltSeparator;
    }
  }, {
    key: 'setOverrides',
    value: function setOverrides(overrides) {
      this._env.setOverrides(overrides);
      return this;
    }
  }, {
    key: 'getOverrides',
    value: function getOverrides() {
      return this._env.getOverrides();
    }
  }, {
    key: 'hasOverride',
    value: function hasOverride(name) {
      var overrides = this.getOverrides();
      return overrides && overrides[name] !== undefined;
    }
  }, {
    key: 'registerCustomOperators',
    value: function registerCustomOperators(operators) {
      (0, _utils.registerOperators)(operators);
    }
  }, {
    key: 'evaluate',
    value: function evaluate(planoutCode) {
      if ((0, _utils2.isObject)(planoutCode) && planoutCode.op) {
        return (0, _utils.operatorInstance)(planoutCode).execute(this);
      } else if ((0, _utils2.isArray)(planoutCode)) {
        var self = this;
        return (0, _utils2.map)(planoutCode, function (obj) {
          return self.evaluate(obj);
        });
      } else {
        return planoutCode;
      }
    }
  }]);

  return Interpreter;
}();

exports.default = Interpreter;
module.exports = exports['default'];