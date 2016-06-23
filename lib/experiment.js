'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _assignment = require('./assignment');

var _assignment2 = _interopRequireDefault(_assignment);

var _libUtils = require('./lib/utils');

var Experiment = (function () {
  function Experiment(inputs) {
    _classCallCheck(this, Experiment);

    this.inputs = inputs;
    this._exposureLogged = false;
    this._salt = null;
    this._inExperiment = true;

    this.name = this.getDefaultExperimentName();
    this._autoExposureLog = true;

    this.setup();

    this._assignment = new _assignment2['default'](this.getSalt());
    this._assigned = false;
  }

  //helper function to return the class name of the current experiment class

  _createClass(Experiment, [{
    key: 'getDefaultExperimentName',
    value: function getDefaultExperimentName() {
      if ((0, _libUtils.isObject)(this) && this.constructor && this !== this.window) {
        var arr = this.constructor.toString().match(/function\s*(\w+)/);
        if (arr && arr.length === 2) {
          return arr[1];
        }
      }
      return "GenericExperiment";
    }

    /* default implementation of fetching the range of experiment parameters that this experiment can take */
  }, {
    key: 'getDefaultParamNames',
    value: function getDefaultParamNames() {
      var assignmentFxn = this.assign.toString();
      var possibleKeys = assignmentFxn.split('.set(');
      possibleKeys.splice(0, 1); //remove first index since it'll have the function definitions
      return (0, _libUtils.map)(possibleKeys, function (val) {
        var str = (0, _libUtils.trimTrailingWhitespace)(val.split(',')[0]);
        return str.substr(1, str.length - 2); //remove string chars
      });
    }
  }, {
    key: 'requireAssignment',
    value: function requireAssignment() {
      if (!this._assigned) {
        this._assign();
      }
    }
  }, {
    key: 'requireExposureLogging',
    value: function requireExposureLogging(paramName) {
      if (this.shouldLogExposure(paramName)) {
        this.logExposure();
      }
    }
  }, {
    key: '_assign',
    value: function _assign() {
      this.configureLogger();
      var assignVal = this.assign(this._assignment, this.inputs);
      if (assignVal || assignVal === undefined) {
        this._inExperiment = true;
      } else {
        this._inExperiment = false;
      }
      this._assigned = true;
    }
  }, {
    key: 'setup',
    value: function setup() {
      return;
    }
  }, {
    key: 'inExperiment',
    value: function inExperiment() {
      return this._inExperiment;
    }
  }, {
    key: 'addOverride',
    value: function addOverride(key, value) {
      this._assignment.addOverride(key, value);
    }
  }, {
    key: 'setOverrides',
    value: function setOverrides(value) {
      this._assignment.setOverrides(value);
      var o = this._assignment.getOverrides();
      var self = this;
      (0, _libUtils.forEach)(Object.keys(o), function (key) {
        if (self.inputs[key] !== undefined) {
          self.inputs[key] = o[key];
        }
      });
    }
  }, {
    key: 'getSalt',
    value: function getSalt() {
      if (this._salt) {
        return this._salt;
      } else {
        return this.name;
      }
    }
  }, {
    key: 'setSalt',
    value: function setSalt(value) {
      this._salt = value;
      if (this._assignment) {
        this._assignment.experimentSalt = value;
      }
    }
  }, {
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }, {
    key: 'assign',
    value: function assign(params, args) {
      throw "IMPLEMENT assign";
    }

    /*
    This function should return a list of the possible parameter names that the assignment procedure may assign.
    You can optionally override this function to always return this.getDefaultParamNames()
    which will analyze your program at runtime to determine what the range of possible experimental parameters are. 
    Otherwise, simply return a fixed list of the experimental parameters that your assignment procedure may assign.
    */

  }, {
    key: 'getParamNames',
    value: function getParamNames() {
      throw "IMPLEMENT getParamNames";
    }
  }, {
    key: 'shouldFetchExperimentParameter',
    value: function shouldFetchExperimentParameter(name) {
      var experimentalParams = this.getParamNames();
      return experimentalParams.indexOf(name) >= 0;
    }
  }, {
    key: 'setName',
    value: function setName(value) {
      var re = /\s+/g;
      this.name = value.replace(re, '-');
      if (this._assignment) {
        this._assignment.experimentSalt = this.getSalt();
      }
    }
  }, {
    key: '__asBlob',
    value: function __asBlob() {
      var extras = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var d = {
        'name': this.getName(),
        'time': new Date().getTime() / 1000,
        'salt': this.getSalt(),
        'inputs': this.inputs,
        'params': this._assignment.getParams()
      };
      (0, _libUtils.extend)(d, extras);
      return d;
    }
  }, {
    key: 'setAutoExposureLogging',
    value: function setAutoExposureLogging(value) {
      this._autoExposureLog = value;
    }
  }, {
    key: 'getParams',
    value: function getParams() {
      this.requireAssignment();
      this.requireExposureLogging();
      return this._assignment.getParams();
    }
  }, {
    key: 'get',
    value: function get(name, def) {
      this.requireAssignment();
      this.requireExposureLogging(name);
      return this._assignment.get(name, def);
    }
  }, {
    key: 'toString',
    value: function toString() {
      this.requireAssignment();
      this.requireExposureLogging();
      return JSON.stringify(this.__asBlob());
    }
  }, {
    key: 'logExposure',
    value: function logExposure(extras) {
      if (!this.inExperiment()) {
        return;
      }
      this._exposureLogged = true;
      this.logEvent('exposure', extras);
    }
  }, {
    key: 'shouldLogExposure',
    value: function shouldLogExposure(paramName) {
      if (paramName !== undefined && !this.shouldFetchExperimentParameter(paramName)) {
        return false;
      }
      return this._autoExposureLog && !this.previouslyLogged();
    }
  }, {
    key: 'logEvent',
    value: function logEvent(eventType, extras) {
      if (!this.inExperiment()) {
        return;
      }

      var extraPayload;

      if (extras) {
        extraPayload = { 'event': eventType, 'extra_data': (0, _libUtils.shallowCopy)(extras) };
      } else {
        extraPayload = { 'event': eventType };
      }

      this.log(this.__asBlob(extraPayload));
    }
  }, {
    key: 'configureLogger',
    value: function configureLogger() {
      throw "IMPLEMENT configureLogger";
    }
  }, {
    key: 'log',
    value: function log(data) {
      throw "IMPLEMENT log";
    }
  }, {
    key: 'previouslyLogged',
    value: function previouslyLogged() {
      throw "IMPLEMENT previouslyLogged";
    }
  }]);

  return Experiment;
})();

exports['default'] = Experiment;
module.exports = exports['default'];