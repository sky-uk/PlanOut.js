"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleNamespace = exports.Namespace = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _experiment = require("./experiment.js");

var _experiment2 = _interopRequireDefault(_experiment);

var _assignment = require("./assignment.js");

var _assignment2 = _interopRequireDefault(_assignment);

var _random = require("./ops/random.js");

var _utils = require("./lib/utils.js");

var _experimentSetup = require("./experimentSetup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultExperiment = function (_Experiment) {
  _inherits(DefaultExperiment, _Experiment);

  function DefaultExperiment() {
    _classCallCheck(this, DefaultExperiment);

    return _possibleConstructorReturn(this, (DefaultExperiment.__proto__ || Object.getPrototypeOf(DefaultExperiment)).apply(this, arguments));
  }

  _createClass(DefaultExperiment, [{
    key: "configureLogger",
    value: function configureLogger() {
      return;
    }
  }, {
    key: "setup",
    value: function setup() {
      this.name = 'test_name';
    }
  }, {
    key: "log",
    value: function log(data) {
      return;
    }
  }, {
    key: "getParamNames",
    value: function getParamNames() {
      return this.getDefaultParamNames();
    }
  }, {
    key: "previouslyLogged",
    value: function previouslyLogged() {
      return true;
    }
  }, {
    key: "assign",
    value: function assign(params, args) {
      return;
    }
  }]);

  return DefaultExperiment;
}(_experiment2.default);

var Namespace = function () {
  function Namespace() {
    _classCallCheck(this, Namespace);
  }

  _createClass(Namespace, [{
    key: "addExperiment",
    value: function addExperiment(name, obj, segments) {
      throw "IMPLEMENT addExperiment";
    }
  }, {
    key: "removeExperiment",
    value: function removeExperiment(name) {
      throw "IMPLEMENT removeExperiment";
    }
  }, {
    key: "setAutoExposureLogging",
    value: function setAutoExposureLogging(value) {
      throw "IMPLEMENT setAutoExposureLogging";
    }
  }, {
    key: "inExperiment",
    value: function inExperiment() {
      throw "IMPLEMENT inExperiment";
    }
  }, {
    key: "get",
    value: function get(name, defaultVal) {
      throw "IMPLEMENT get";
    }
  }, {
    key: "logExposure",
    value: function logExposure(extras) {
      throw "IMPLEMENT logExposure";
    }
  }, {
    key: "logEvent",
    value: function logEvent(eventType, extras) {
      throw "IMPLEMENT logEvent";
    }
  }, {
    key: "requireExperiment",
    value: function requireExperiment() {
      if (!this._experiment) {
        this._assignExperiment();
      }
    }
  }, {
    key: "requireDefaultExperiment",
    value: function requireDefaultExperiment() {
      if (!this._defaultExperiment) {
        this._assignDefaultExperiment();
      }
    }
  }]);

  return Namespace;
}();

var SimpleNamespace = function (_Namespace) {
  _inherits(SimpleNamespace, _Namespace);

  function SimpleNamespace(args) {
    _classCallCheck(this, SimpleNamespace);

    var _this2 = _possibleConstructorReturn(this, (SimpleNamespace.__proto__ || Object.getPrototypeOf(SimpleNamespace)).call(this, args));

    _this2.name = _this2.getDefaultNamespaceName();
    _this2.inputs = args || {};
    _this2.numSegments = 1;
    _this2.segmentAllocations = {};
    _this2.currentExperiments = {};

    _this2._experiment = null;
    _this2._defaultExperiment = null;
    _this2.defaultExperimentClass = DefaultExperiment;
    _this2._inExperiment = false;

    _this2.setupDefaults();
    _this2.setup();
    _this2.availableSegments = (0, _utils.range)(_this2.numSegments);

    _this2.setupExperiments();
    return _this2;
  }

  _createClass(SimpleNamespace, [{
    key: "setupDefaults",
    value: function setupDefaults() {
      return;
    }
  }, {
    key: "setup",
    value: function setup() {
      throw "IMPLEMENT setup";
    }
  }, {
    key: "setupExperiments",
    value: function setupExperiments() {
      throw "IMPLEMENT setupExperiments";
    }
  }, {
    key: "getPrimaryUnit",
    value: function getPrimaryUnit() {
      return this._primaryUnit;
    }
  }, {
    key: "allowedOverride",
    value: function allowedOverride() {
      return false;
    }
  }, {
    key: "getOverrides",
    value: function getOverrides() {
      return {};
    }
  }, {
    key: "setPrimaryUnit",
    value: function setPrimaryUnit(value) {
      this._primaryUnit = value;
    }
  }, {
    key: "addExperiment",
    value: function addExperiment(name, expObject, segments) {
      var numberAvailable = this.availableSegments.length;
      if (numberAvailable < segments) {
        return false;
      } else if (this.currentExperiments[name] !== undefined) {
        return false;
      }
      var a = new _assignment2.default(this.name);
      a.set('sampled_segments', new _random.Sample({ 'choices': this.availableSegments, 'draws': segments, 'unit': name }));
      var sample = a.get('sampled_segments');
      for (var i = 0; i < sample.length; i++) {
        this.segmentAllocations[sample[i]] = name;
        var currentIndex = this.availableSegments.indexOf(sample[i]);
        this.availableSegments[currentIndex] = this.availableSegments[numberAvailable - 1];
        this.availableSegments.splice(numberAvailable - 1, 1);
        numberAvailable -= 1;
      }
      this.currentExperiments[name] = expObject;
    }
  }, {
    key: "removeExperiment",
    value: function removeExperiment(name) {
      var _this3 = this;

      if (this.currentExperiments[name] === undefined) {
        return false;
      }

      (0, _utils.forEach)(Object.keys(this.segmentAllocations), function (cur) {
        if (_this3.segmentAllocations[cur] === name) {
          delete _this3.segmentAllocations[cur];
          _this3.availableSegments.push(cur);
        }
      });

      delete this.currentExperiments[name];
      return true;
    }
  }, {
    key: "getSegment",
    value: function getSegment() {
      var a = new _assignment2.default(this.name);
      var segment = new _random.RandomInteger({ 'min': 0, 'max': this.numSegments - 1, 'unit': this.inputs[this.getPrimaryUnit()] });
      a.set('segment', segment);
      return a.get('segment');
    }
  }, {
    key: "_assignExperiment",
    value: function _assignExperiment() {
      this.inputs = (0, _utils.extend)(this.inputs, (0, _experimentSetup.getExperimentInputs)(this.getName()));
      var segment = this.getSegment();

      if (this.segmentAllocations[segment] !== undefined) {
        var experimentName = this.segmentAllocations[segment];
        this._assignExperimentObject(experimentName);
      }
    }
  }, {
    key: "_assignExperimentObject",
    value: function _assignExperimentObject(experimentName) {
      var experiment = new this.currentExperiments[experimentName](this.inputs);
      experiment.setName(this.getName() + "-" + experimentName);
      experiment.setSalt(this.getName() + "-" + experimentName);
      this._experiment = experiment;
      this._inExperiment = experiment.inExperiment();
      if (!this._inExperiment) {
        this._assignDefaultExperiment();
      }
    }
  }, {
    key: "_assignDefaultExperiment",
    value: function _assignDefaultExperiment() {
      this._defaultExperiment = new this.defaultExperimentClass(this.inputs);
    }
  }, {
    key: "defaultGet",
    value: function defaultGet(name, default_val) {
      _get(SimpleNamespace.prototype.__proto__ || Object.getPrototypeOf(SimpleNamespace.prototype), "requireDefaultExperiment", this).call(this);
      return this._defaultExperiment.get(name, default_val);
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this.name = name;
    }
  }, {
    key: "previouslyLogged",
    value: function previouslyLogged() {
      if (this._experiment) {
        return this._experiment.previouslyLogged();
      }
      return null;
    }
  }, {
    key: "inExperiment",
    value: function inExperiment() {
      _get(SimpleNamespace.prototype.__proto__ || Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
      return this._inExperiment;
    }
  }, {
    key: "setAutoExposureLogging",
    value: function setAutoExposureLogging(value) {
      this._autoExposureLoggingSet = value;
      if (this._defaultExperiment) {
        this._defaultExperiment.setAutoExposureLogging(value);
      }
      if (this._experiment) {
        this._experiment.setAutoExposureLogging(value);
      }
    }
  }, {
    key: "setGlobalOverride",
    value: function setGlobalOverride(name) {
      var globalOverrides = this.getOverrides();
      if (globalOverrides && (0, _utils.hasKey)(globalOverrides, name)) {
        var overrides = globalOverrides[name];
        if (overrides && (0, _utils.hasKey)(this.currentExperiments, overrides.experimentName)) {
          this._assignExperimentObject(overrides.experimentName);
          this._experiment.addOverride(name, overrides.value);
        }
      }
    }
  }, {
    key: "setLocalOverride",
    value: function setLocalOverride(name) {
      var experimentName = (0, _utils.getParameterByName)('experimentOverride');
      if (experimentName && (0, _utils.hasKey)(this.currentExperiments, experimentName)) {
        this._assignExperimentObject(experimentName);
        if ((0, _utils.getParameterByName)(name)) {
          this._experiment.addOverride(name, (0, _utils.getParameterByName)(name));
        }
      }
    }
  }, {
    key: "getParams",
    value: function getParams(experimentName) {
      _get(SimpleNamespace.prototype.__proto__ || Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
      if (this._experiment && this.getOriginalExperimentName() === experimentName) {
        return this._experiment.getParams();
      } else {
        return null;
      }
    }
  }, {
    key: "getOriginalExperimentName",
    value: function getOriginalExperimentName() {
      if (this._experiment) {
        return this._experiment.getName().split('-')[1];
      }
      return null;
    }
  }, {
    key: "get",
    value: function get(name, defaultVal) {
      _get(SimpleNamespace.prototype.__proto__ || Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
      if (this.allowedOverride()) {
        this.setGlobalOverride(name);
      }
      this.setLocalOverride(name);

      if (!this._experiment) {
        return this.defaultGet(name, defaultVal);
      } else {
        if (this._autoExposureLoggingSet !== undefined) {
          this._experiment.setAutoExposureLogging(this._autoExposureLoggingSet);
        }
        return this._experiment.get(name, this.defaultGet(name, defaultVal));
      }
    }
  }, {
    key: "logExposure",
    value: function logExposure(extras) {
      _get(SimpleNamespace.prototype.__proto__ || Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
      if (!this._experiment) {
        return;
      }
      this._experiment.logExposure(extras);
    }
  }, {
    key: "logEvent",
    value: function logEvent(eventType, extras) {
      _get(SimpleNamespace.prototype.__proto__ || Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
      if (!this._experiment) {
        return;
      }
      this._experiment.logEvent(eventType, extras);
    }

    //helper function to return the class name of the current experiment class

  }, {
    key: "getDefaultNamespaceName",
    value: function getDefaultNamespaceName() {
      if ((0, _utils.isObject)(this) && this.constructor && this !== this.window) {
        var arr = this.constructor.toString().match(/function\s*(\w+)/);
        if (arr && arr.length === 2) {
          return arr[1];
        }
      }
      return "GenericNamespace";
    }
  }]);

  return SimpleNamespace;
}(Namespace);

exports.Namespace = Namespace;
exports.SimpleNamespace = SimpleNamespace;