(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["PlanOut"] = factory();
	else
		root["PlanOut"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _es6Experiment = __webpack_require__(1);

	var _es6Experiment2 = _interopRequireDefault(_es6Experiment);

	var _es6Interpreter = __webpack_require__(2);

	var _es6Interpreter2 = _interopRequireDefault(_es6Interpreter);

	var _es6OpsRandom = __webpack_require__(3);

	var _es6OpsRandom2 = _interopRequireDefault(_es6OpsRandom);

	var _es6OpsCore = __webpack_require__(4);

	var _es6OpsCore2 = _interopRequireDefault(_es6OpsCore);

	var _es6Namespace = __webpack_require__(5);

	var Namespace = _interopRequireWildcard(_es6Namespace);

	var _es6Assignment = __webpack_require__(6);

	var _es6Assignment2 = _interopRequireDefault(_es6Assignment);

	var _es6ExperimentSetup = __webpack_require__(7);

	var _es6ExperimentSetup2 = _interopRequireDefault(_es6ExperimentSetup);

	exports['default'] = {
	  Namespace: Namespace,
	  Assignment: _es6Assignment2['default'],
	  Interpreter: _es6Interpreter2['default'],
	  Experiment: _es6Experiment2['default'],
	  ExperimentSetup: _es6ExperimentSetup2['default'],
	  Ops: {
	    Random: _es6OpsRandom2['default'],
	    Core: _es6OpsCore2['default']
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _assignment = __webpack_require__(6);

	var _assignment2 = _interopRequireDefault(_assignment);

	var _libUtils = __webpack_require__(9);

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _assignment = __webpack_require__(6);

	var _assignment2 = _interopRequireDefault(_assignment);

	var _opsUtils = __webpack_require__(10);

	var _libUtils = __webpack_require__(9);

	var Interpreter = (function () {
	  function Interpreter(serialization, experimentSalt, inputs, environment) {
	    if (experimentSalt === undefined) experimentSalt = 'global_salt';
	    if (inputs === undefined) inputs = {};

	    _classCallCheck(this, Interpreter);

	    this._serialization = serialization;
	    if (!environment) {
	      this._env = new _assignment2['default'](experimentSalt);
	    } else {
	      this._env = environment;
	    }
	    this.experimentSalt = this._experimentSalt = experimentSalt;
	    this._evaluated = false;
	    this._inExperiment = false;
	    this._inputs = (0, _libUtils.shallowCopy)(inputs);
	  }

	  _createClass(Interpreter, [{
	    key: 'inExperiment',
	    value: function inExperiment() {
	      return this._inExperiment;
	    }
	  }, {
	    key: 'setEnv',
	    value: function setEnv(newEnv) {
	      this._env = (0, _libUtils.deepCopy)(newEnv);
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
	      if (!inputVal) {
	        inputVal = defaultVal;
	      }
	      var envVal = this._env.get(name);
	      if (envVal) {
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
	          if (err instanceof _opsUtils.StopPlanOutException) {
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
	    key: 'evaluate',
	    value: function evaluate(planoutCode) {
	      if ((0, _libUtils.isObject)(planoutCode) && planoutCode.op) {
	        return (0, _opsUtils.operatorInstance)(planoutCode).execute(this);
	      } else if ((0, _libUtils.isArray)(planoutCode)) {
	        var self = this;
	        return (0, _libUtils.map)(planoutCode, function (obj) {
	          return self.evaluate(obj);
	        });
	      } else {
	        return planoutCode;
	      }
	    }
	  }]);

	  return Interpreter;
	})();

	exports['default'] = Interpreter;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _base = __webpack_require__(11);

	var _libSha1 = __webpack_require__(12);

	var _libSha12 = _interopRequireDefault(_libSha1);

	var _libUtils = __webpack_require__(9);

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _base = __webpack_require__(11);

	var _utils = __webpack_require__(10);

	var _libUtils = __webpack_require__(9);

	var Literal = (function (_PlanOutOp) {
	  _inherits(Literal, _PlanOutOp);

	  function Literal() {
	    _classCallCheck(this, Literal);

	    _get(Object.getPrototypeOf(Literal.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Literal, [{
	    key: "execute",
	    value: function execute(mapper) {
	      return this.getArgMixed('value');
	    }
	  }]);

	  return Literal;
	})(_base.PlanOutOp);

	var Get = (function (_PlanOutOp2) {
	  _inherits(Get, _PlanOutOp2);

	  function Get() {
	    _classCallCheck(this, Get);

	    _get(Object.getPrototypeOf(Get.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Get, [{
	    key: "execute",
	    value: function execute(mapper) {
	      return mapper.get(this.getArgString('var'));
	    }
	  }]);

	  return Get;
	})(_base.PlanOutOp);

	var Seq = (function (_PlanOutOp3) {
	  _inherits(Seq, _PlanOutOp3);

	  function Seq() {
	    _classCallCheck(this, Seq);

	    _get(Object.getPrototypeOf(Seq.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Seq, [{
	    key: "execute",
	    value: function execute(mapper) {
	      (0, _libUtils.forEach)(this.getArgList('seq'), function (op) {
	        mapper.evaluate(op);
	      });
	    }
	  }]);

	  return Seq;
	})(_base.PlanOutOp);

	var Return = (function (_PlanOutOp4) {
	  _inherits(Return, _PlanOutOp4);

	  function Return() {
	    _classCallCheck(this, Return);

	    _get(Object.getPrototypeOf(Return.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Return, [{
	    key: "execute",
	    value: function execute(mapper) {
	      var value = mapper.evaluate(this.getArgMixed('value'));
	      var inExperiment = false;
	      if (value) {
	        inExperiment = true;
	      }
	      throw new _utils.StopPlanOutException(inExperiment);
	    }
	  }]);

	  return Return;
	})(_base.PlanOutOp);

	var Set = (function (_PlanOutOp5) {
	  _inherits(Set, _PlanOutOp5);

	  function Set() {
	    _classCallCheck(this, Set);

	    _get(Object.getPrototypeOf(Set.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Set, [{
	    key: "execute",
	    value: function execute(mapper) {
	      var variable = this.getArgString('var');
	      var value = this.getArgMixed('value');
	      if (mapper.hasOverride(variable)) {
	        return;
	      }

	      if ((0, _utils.isOperator)(value) && !value.salt) {
	        value.salt = variable;
	      }

	      if (variable == "experimentSalt") {
	        mapper.experimentSalt = value;
	      }
	      mapper.set(variable, mapper.evaluate(value));
	    }
	  }]);

	  return Set;
	})(_base.PlanOutOp);

	var Arr = (function (_PlanOutOp6) {
	  _inherits(Arr, _PlanOutOp6);

	  function Arr() {
	    _classCallCheck(this, Arr);

	    _get(Object.getPrototypeOf(Arr.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Arr, [{
	    key: "execute",
	    value: function execute(mapper) {
	      return (0, _libUtils.map)(this.getArgList('values'), function (value) {
	        return mapper.evaluate(value);
	      });
	    }
	  }]);

	  return Arr;
	})(_base.PlanOutOp);

	var Coalesce = (function (_PlanOutOp7) {
	  _inherits(Coalesce, _PlanOutOp7);

	  function Coalesce() {
	    _classCallCheck(this, Coalesce);

	    _get(Object.getPrototypeOf(Coalesce.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Coalesce, [{
	    key: "execute",
	    value: function execute(mapper) {
	      var values = this.getArgList('values');
	      for (var i = 0; i < values.length; i++) {
	        var x = values[i];
	        var evalX = mapper.evaluate(x);
	        if (evalX !== null && evalX !== undefined) {
	          return evalX;
	        }
	      }
	      return null;
	    }
	  }]);

	  return Coalesce;
	})(_base.PlanOutOp);

	var Index = (function (_PlanOutOpSimple) {
	  _inherits(Index, _PlanOutOpSimple);

	  function Index() {
	    _classCallCheck(this, Index);

	    _get(Object.getPrototypeOf(Index.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Index, [{
	    key: "simpleExecute",
	    value: function simpleExecute() {
	      var base = this.getArgIndexish('base');
	      var index = this.getArgMixed('index');
	      if (typeof index === "number") {
	        if (index >= 0 && index < base.length) {
	          return base[index];
	        } else {
	          return undefined;
	        }
	      } else {
	        return base[index];
	      }
	    }
	  }]);

	  return Index;
	})(_base.PlanOutOpSimple);

	var Cond = (function (_PlanOutOp8) {
	  _inherits(Cond, _PlanOutOp8);

	  function Cond() {
	    _classCallCheck(this, Cond);

	    _get(Object.getPrototypeOf(Cond.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Cond, [{
	    key: "execute",
	    value: function execute(mapper) {
	      var list = this.getArgList('cond');
	      for (var i in list) {
	        var ifClause = list[i]['if'];
	        var thenClause = list[i]['then'];
	        if (mapper.evaluate(ifClause)) {
	          return mapper.evaluate(thenClause);
	        }
	      }
	      return null;
	    }
	  }]);

	  return Cond;
	})(_base.PlanOutOp);

	var And = (function (_PlanOutOp9) {
	  _inherits(And, _PlanOutOp9);

	  function And() {
	    _classCallCheck(this, And);

	    _get(Object.getPrototypeOf(And.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(And, [{
	    key: "execute",
	    value: function execute(mapper) {
	      return (0, _libUtils.reduce)(this.getArgList('values'), function (ret, clause) {
	        if (!ret) {
	          return ret;
	        }

	        return Boolean(mapper.evaluate(clause));
	      }, true);
	    }
	  }]);

	  return And;
	})(_base.PlanOutOp);

	var Or = (function (_PlanOutOp10) {
	  _inherits(Or, _PlanOutOp10);

	  function Or() {
	    _classCallCheck(this, Or);

	    _get(Object.getPrototypeOf(Or.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Or, [{
	    key: "execute",
	    value: function execute(mapper) {
	      return (0, _libUtils.reduce)(this.getArgList('values'), function (ret, clause) {
	        if (ret) {
	          return ret;
	        }

	        return Boolean(mapper.evaluate(clause));
	      }, false);
	    }
	  }]);

	  return Or;
	})(_base.PlanOutOp);

	var Product = (function (_PlanOutOpCommutative) {
	  _inherits(Product, _PlanOutOpCommutative);

	  function Product() {
	    _classCallCheck(this, Product);

	    _get(Object.getPrototypeOf(Product.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Product, [{
	    key: "commutativeExecute",
	    value: function commutativeExecute(values) {
	      return (0, _libUtils.reduce)(values, function (memo, value) {
	        return memo * value;
	      }, 1);
	    }
	  }]);

	  return Product;
	})(_base.PlanOutOpCommutative);

	var Sum = (function (_PlanOutOpCommutative2) {
	  _inherits(Sum, _PlanOutOpCommutative2);

	  function Sum() {
	    _classCallCheck(this, Sum);

	    _get(Object.getPrototypeOf(Sum.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Sum, [{
	    key: "commutativeExecute",
	    value: function commutativeExecute(values) {
	      return (0, _libUtils.reduce)(values, function (memo, value) {
	        return memo + value;
	      }, 0);
	    }
	  }]);

	  return Sum;
	})(_base.PlanOutOpCommutative);

	var Equals = (function (_PlanOutOpBinary) {
	  _inherits(Equals, _PlanOutOpBinary);

	  function Equals() {
	    _classCallCheck(this, Equals);

	    _get(Object.getPrototypeOf(Equals.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Equals, [{
	    key: "getInfixString",
	    value: function getInfixString() {
	      return "==";
	    }
	  }, {
	    key: "binaryExecute",
	    value: function binaryExecute(left, right) {
	      return left === right;
	    }
	  }]);

	  return Equals;
	})(_base.PlanOutOpBinary);

	var GreaterThan = (function (_PlanOutOpBinary2) {
	  _inherits(GreaterThan, _PlanOutOpBinary2);

	  function GreaterThan() {
	    _classCallCheck(this, GreaterThan);

	    _get(Object.getPrototypeOf(GreaterThan.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(GreaterThan, [{
	    key: "binaryExecute",
	    value: function binaryExecute(left, right) {
	      return left > right;
	    }
	  }]);

	  return GreaterThan;
	})(_base.PlanOutOpBinary);

	var LessThan = (function (_PlanOutOpBinary3) {
	  _inherits(LessThan, _PlanOutOpBinary3);

	  function LessThan() {
	    _classCallCheck(this, LessThan);

	    _get(Object.getPrototypeOf(LessThan.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(LessThan, [{
	    key: "binaryExecute",
	    value: function binaryExecute(left, right) {
	      return left < right;
	    }
	  }]);

	  return LessThan;
	})(_base.PlanOutOpBinary);

	var LessThanOrEqualTo = (function (_PlanOutOpBinary4) {
	  _inherits(LessThanOrEqualTo, _PlanOutOpBinary4);

	  function LessThanOrEqualTo() {
	    _classCallCheck(this, LessThanOrEqualTo);

	    _get(Object.getPrototypeOf(LessThanOrEqualTo.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(LessThanOrEqualTo, [{
	    key: "binaryExecute",
	    value: function binaryExecute(left, right) {
	      return left <= right;
	    }
	  }]);

	  return LessThanOrEqualTo;
	})(_base.PlanOutOpBinary);

	var GreaterThanOrEqualTo = (function (_PlanOutOpBinary5) {
	  _inherits(GreaterThanOrEqualTo, _PlanOutOpBinary5);

	  function GreaterThanOrEqualTo() {
	    _classCallCheck(this, GreaterThanOrEqualTo);

	    _get(Object.getPrototypeOf(GreaterThanOrEqualTo.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(GreaterThanOrEqualTo, [{
	    key: "binaryExecute",
	    value: function binaryExecute(left, right) {
	      return left >= right;
	    }
	  }]);

	  return GreaterThanOrEqualTo;
	})(_base.PlanOutOpBinary);

	var Mod = (function (_PlanOutOpBinary6) {
	  _inherits(Mod, _PlanOutOpBinary6);

	  function Mod() {
	    _classCallCheck(this, Mod);

	    _get(Object.getPrototypeOf(Mod.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Mod, [{
	    key: "binaryExecute",
	    value: function binaryExecute(left, right) {
	      return left % right;
	    }
	  }]);

	  return Mod;
	})(_base.PlanOutOpBinary);

	var Divide = (function (_PlanOutOpBinary7) {
	  _inherits(Divide, _PlanOutOpBinary7);

	  function Divide() {
	    _classCallCheck(this, Divide);

	    _get(Object.getPrototypeOf(Divide.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Divide, [{
	    key: "binaryExecute",
	    value: function binaryExecute(left, right) {
	      return parseFloat(left) / parseFloat(right);
	    }
	  }]);

	  return Divide;
	})(_base.PlanOutOpBinary);

	var Round = (function (_PlanOutOpBinary8) {
	  _inherits(Round, _PlanOutOpBinary8);

	  function Round() {
	    _classCallCheck(this, Round);

	    _get(Object.getPrototypeOf(Round.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Round, [{
	    key: "unaryExecute",
	    value: function unaryExecute(value) {
	      return Math.round(value);
	    }
	  }]);

	  return Round;
	})(_base.PlanOutOpBinary);

	var Not = (function (_PlanOutOpUnary) {
	  _inherits(Not, _PlanOutOpUnary);

	  function Not() {
	    _classCallCheck(this, Not);

	    _get(Object.getPrototypeOf(Not.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Not, [{
	    key: "getUnaryString",
	    value: function getUnaryString() {
	      return '!';
	    }
	  }, {
	    key: "unaryExecute",
	    value: function unaryExecute(value) {
	      return !value;
	    }
	  }]);

	  return Not;
	})(_base.PlanOutOpUnary);

	var Negative = (function (_PlanOutOpUnary2) {
	  _inherits(Negative, _PlanOutOpUnary2);

	  function Negative() {
	    _classCallCheck(this, Negative);

	    _get(Object.getPrototypeOf(Negative.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Negative, [{
	    key: "getUnaryString",
	    value: function getUnaryString() {
	      return '-';
	    }
	  }, {
	    key: "unaryExecute",
	    value: function unaryExecute(value) {
	      return 0 - value;
	    }
	  }]);

	  return Negative;
	})(_base.PlanOutOpUnary);

	var Min = (function (_PlanOutOpCommutative3) {
	  _inherits(Min, _PlanOutOpCommutative3);

	  function Min() {
	    _classCallCheck(this, Min);

	    _get(Object.getPrototypeOf(Min.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Min, [{
	    key: "commutativeExecute",
	    value: function commutativeExecute(values) {
	      return Math.min.apply(null, values);
	    }
	  }]);

	  return Min;
	})(_base.PlanOutOpCommutative);

	var Max = (function (_PlanOutOpCommutative4) {
	  _inherits(Max, _PlanOutOpCommutative4);

	  function Max() {
	    _classCallCheck(this, Max);

	    _get(Object.getPrototypeOf(Max.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Max, [{
	    key: "commutativeExecute",
	    value: function commutativeExecute(values) {
	      return Math.max.apply(null, values);
	    }
	  }]);

	  return Max;
	})(_base.PlanOutOpCommutative);

	var Length = (function (_PlanOutOpUnary3) {
	  _inherits(Length, _PlanOutOpUnary3);

	  function Length() {
	    _classCallCheck(this, Length);

	    _get(Object.getPrototypeOf(Length.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Length, [{
	    key: "unaryExecute",
	    value: function unaryExecute(value) {
	      return value.length;
	    }
	  }]);

	  return Length;
	})(_base.PlanOutOpUnary);

	var Map = (function (_PlanOutOpSimple2) {
	  _inherits(Map, _PlanOutOpSimple2);

	  function Map() {
	    _classCallCheck(this, Map);

	    _get(Object.getPrototypeOf(Map.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Map, [{
	    key: "simpleExecute",
	    value: function simpleExecute() {
	      var copy = (0, _libUtils.deepCopy)(this.args);
	      delete copy.op;
	      delete copy.salt;
	      return copy;
	    }
	  }]);

	  return Map;
	})(_base.PlanOutOpSimple);

	exports.Literal = Literal;
	exports.Get = Get;
	exports.Seq = Seq;
	exports.Set = Set;
	exports.Arr = Arr;
	exports.Map = Map;
	exports.Coalesce = Coalesce;
	exports.Index = Index;
	exports.Cond = Cond;
	exports.And = And;
	exports.Or = Or;
	exports.Product = Product;
	exports.Sum = Sum;
	exports.Equals = Equals;
	exports.GreaterThan = GreaterThan;
	exports.LessThan = LessThan;
	exports.LessThanOrEqualTo = LessThanOrEqualTo;
	exports.GreaterThanOrEqualTo = GreaterThanOrEqualTo;
	exports.Mod = Mod;
	exports.Divide = Divide;
	exports.Round = Round;
	exports.Not = Not;
	exports.Negative = Negative;
	exports.Min = Min;
	exports.Max = Max;
	exports.Length = Length;
	exports.Return = Return;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _experimentJs = __webpack_require__(1);

	var _experimentJs2 = _interopRequireDefault(_experimentJs);

	var _assignmentJs = __webpack_require__(6);

	var _assignmentJs2 = _interopRequireDefault(_assignmentJs);

	var _opsRandomJs = __webpack_require__(3);

	var _libUtilsJs = __webpack_require__(9);

	var _experimentSetup = __webpack_require__(7);

	var DefaultExperiment = (function (_Experiment) {
	  _inherits(DefaultExperiment, _Experiment);

	  function DefaultExperiment() {
	    _classCallCheck(this, DefaultExperiment);

	    _get(Object.getPrototypeOf(DefaultExperiment.prototype), "constructor", this).apply(this, arguments);
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
	})(_experimentJs2["default"]);

	var Namespace = (function () {
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
	})();

	var SimpleNamespace = (function (_Namespace) {
	  _inherits(SimpleNamespace, _Namespace);

	  function SimpleNamespace(args) {
	    _classCallCheck(this, SimpleNamespace);

	    _get(Object.getPrototypeOf(SimpleNamespace.prototype), "constructor", this).call(this, args);
	    this.name = this.getDefaultNamespaceName();
	    this.inputs = args || {};
	    this.numSegments = 1;
	    this.segmentAllocations = {};
	    this.currentExperiments = {};

	    this._experiment = null;
	    this._defaultExperiment = null;
	    this.defaultExperimentClass = DefaultExperiment;
	    this._inExperiment = false;

	    this.setupDefaults();
	    this.setup();
	    this.availableSegments = (0, _libUtilsJs.range)(this.numSegments);

	    this.setupExperiments();
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
	      var a = new _assignmentJs2["default"](this.name);
	      a.set('sampled_segments', new _opsRandomJs.Sample({ 'choices': this.availableSegments, 'draws': segments, 'unit': name }));
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
	      var _this = this;

	      if (this.currentExperiments[name] === undefined) {
	        return false;
	      }

	      (0, _libUtilsJs.forEach)(Object.keys(this.segmentAllocations), function (cur) {
	        if (_this.segmentAllocations[cur] === name) {
	          delete _this.segmentAllocations[cur];
	          _this.availableSegments.push(cur);
	        }
	      });

	      delete this.currentExperiments[name];
	      return true;
	    }
	  }, {
	    key: "getSegment",
	    value: function getSegment() {
	      var a = new _assignmentJs2["default"](this.name);
	      var segment = new _opsRandomJs.RandomInteger({ 'min': 0, 'max': this.numSegments - 1, 'unit': this.inputs[this.getPrimaryUnit()] });
	      a.set('segment', segment);
	      return a.get('segment');
	    }
	  }, {
	    key: "_assignExperiment",
	    value: function _assignExperiment() {
	      this.inputs = (0, _libUtilsJs.extend)(this.inputs, (0, _experimentSetup.getExperimentInputs)(this.getName()));
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
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "requireDefaultExperiment", this).call(this);
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
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
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
	      if (globalOverrides && (0, _libUtilsJs.hasKey)(globalOverrides, name)) {
	        var overrides = globalOverrides[name];
	        if (overrides && (0, _libUtilsJs.hasKey)(this.currentExperiments, overrides.experimentName)) {
	          this._assignExperimentObject(overrides.experimentName);
	          this._experiment.addOverride(name, overrides.value);
	        }
	      }
	    }
	  }, {
	    key: "setLocalOverride",
	    value: function setLocalOverride(name) {
	      var experimentName = (0, _libUtilsJs.getParameterByName)('experimentOverride');
	      if (experimentName && (0, _libUtilsJs.hasKey)(this.currentExperiments, experimentName)) {
	        this._assignExperimentObject(experimentName);
	        if ((0, _libUtilsJs.getParameterByName)(name)) {
	          this._experiment.addOverride(name, (0, _libUtilsJs.getParameterByName)(name));
	        }
	      }
	    }
	  }, {
	    key: "getParams",
	    value: function getParams(experimentName) {
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
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
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
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
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
	      if (!this._experiment) {
	        return;
	      }
	      this._experiment.logExposure(extras);
	    }
	  }, {
	    key: "logEvent",
	    value: function logEvent(eventType, extras) {
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
	      if (!this._experiment) {
	        return;
	      }
	      this._experiment.logEvent(eventType, extras);
	    }

	    //helper function to return the class name of the current experiment class
	  }, {
	    key: "getDefaultNamespaceName",
	    value: function getDefaultNamespaceName() {
	      if ((0, _libUtilsJs.isObject)(this) && this.constructor && this !== this.window) {
	        var arr = this.constructor.toString().match(/function\s*(\w+)/);
	        if (arr && arr.length === 2) {
	          return arr[1];
	        }
	      }
	      return "GenericNamespace";
	    }
	  }]);

	  return SimpleNamespace;
	})(Namespace);

	exports.Namespace = Namespace;
	exports.SimpleNamespace = SimpleNamespace;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _opsRandom = __webpack_require__(3);

	var _libUtils = __webpack_require__(9);

	var Assignment = (function () {
	  function Assignment(experimentSalt, overrides) {
	    _classCallCheck(this, Assignment);

	    if (!overrides) {
	      overrides = {};
	    }
	    this.experimentSalt = experimentSalt;
	    this._overrides = (0, _libUtils.shallowCopy)(overrides);
	    this._data = (0, _libUtils.shallowCopy)(overrides);
	  }

	  _createClass(Assignment, [{
	    key: "evaluate",
	    value: function evaluate(value) {
	      return value;
	    }
	  }, {
	    key: "getOverrides",
	    value: function getOverrides() {
	      return this._overrides;
	    }
	  }, {
	    key: "addOverride",
	    value: function addOverride(key, value) {
	      this._overrides[key] = value;
	      this._data[key] = value;
	    }
	  }, {
	    key: "setOverrides",
	    value: function setOverrides(overrides) {
	      this._overrides = (0, _libUtils.shallowCopy)(overrides);
	      var self = this;
	      (0, _libUtils.forEach)(Object.keys(this._overrides), function (overrideKey) {
	        self._data[overrideKey] = self._overrides[overrideKey];
	      });
	    }
	  }, {
	    key: "set",
	    value: function set(name, value) {
	      if (name === '_data') {
	        this._data = value;
	        return;
	      } else if (name === '_overrides') {
	        this._overrides = value;
	        return;
	      } else if (name === 'experimentSalt') {
	        this.experimentSalt = value;
	        return;
	      }

	      if ((0, _libUtils.hasKey)(this._overrides, name)) {
	        return;
	      }
	      if (value instanceof _opsRandom.PlanOutOpRandom) {
	        if (!value.args.salt) {
	          value.args.salt = name;
	        }
	        this._data[name] = value.execute(this);
	      } else {
	        this._data[name] = value;
	      }
	    }
	  }, {
	    key: "get",
	    value: function get(name) {
	      if (name === '_data') {
	        return this._data;
	      } else if (name === '_overrides') {
	        return this._overrides;
	      } else if (name === 'experimentSalt') {
	        return this.experimentSalt;
	      } else {
	        return this._data[name];
	      }
	    }
	  }, {
	    key: "getParams",
	    value: function getParams() {
	      return this._data;
	    }
	  }, {
	    key: "del",
	    value: function del(name) {
	      delete this._data[name];
	    }
	  }, {
	    key: "toString",
	    value: function toString() {
	      return String(this._data);
	    }
	  }, {
	    key: "length",
	    value: function length() {
	      return Object.keys(this._data).length;
	    }
	  }]);

	  return Assignment;
	})();

	;

	exports["default"] = Assignment;
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _libUtils = __webpack_require__(9);

	var globalInputArgs = {};
	var experimentSpecificInputArgs = {};

	var fetchInputs = function fetchInputs(args) {
	  if (!args) {
	    return {};
	  }

	  return resolveArgs((0, _libUtils.shallowCopy)(args));
	};

	var resolveArgs = function resolveArgs(args) {
	  (0, _libUtils.forEach)(Object.keys(args), function (key) {
	    if ((0, _libUtils.isFunction)(args[key])) {
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
	    return (0, _libUtils.extend)(inputArgs, fetchInputs(experimentSpecificInputArgs[experimentName]));
	  }
	  return inputArgs;
	};

	exports['default'] = { registerExperimentInput: registerExperimentInput, getExperimentInputs: getExperimentInputs };
	module.exports = exports['default'];

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*  Most of these functions are from the wonderful Underscore package http://underscorejs.org/  
	    This file exists so that the planoutjs library doesn't depend on a few unneeded third party dependencies
	    so that consumers of the library don't have to include dependencies such as underscore. As well, this helps reduce
	    the file size of the resulting library.
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var trimTrailingWhitespace = function trimTrailingWhitespace(str) {
	  return str.replace(/^\s+|\s+$/g, '');
	};

	var getParameterByName = function getParameterByName(name) {
	  var hasLocation = typeof location !== 'undefined';
	  var hasWindow = typeof window !== 'undefined';
	  var queryParamVal;

	  if (hasLocation) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    queryParamVal = results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	  } else {
	    queryParamVal = "";
	  }

	  if (queryParamVal === null || queryParamVal === undefined || queryParamVal.length === 0) {
	    if (hasWindow && window.localStorage !== undefined && window.localStorage !== null) {
	      return window.localStorage.getItem(name);
	    }
	  }
	  return queryParamVal;
	};

	var deepCopy = function deepCopy(obj) {
	  var newObj = obj;
	  if (obj && typeof obj === 'object') {
	    newObj = Object.prototype.toString.call(obj) === "[object Array]" ? [] : {};
	    for (var i in obj) {
	      newObj[i] = deepCopy(obj[i]);
	    }
	  }
	  return newObj;
	};

	var isObject = function isObject(obj) {
	  var type = typeof obj;
	  return type === 'function' || type === 'object' && !!obj;
	};

	var isArray = function isArray(object) {
	  if (Array.isArray) {
	    return Array.isArray(object);
	  } else {
	    return Object.prototype.toString.call(planout_code) === '[object Array]';
	  }
	};

	var isFunction = function isFunction(obj) {
	  return typeof obj == 'function' || false;
	};

	//extend helpers

	var keys = function keys(obj) {
	  if (!isObject(obj)) return [];
	  if (Object.keys) return Object.keys(obj);
	  var keys = [];
	  for (var key in obj) if (has(obj, key)) keys.push(key);

	  if (hasEnumBug) collectNonEnumProps(obj, keys);

	  return keys;
	};

	var allKeys = function allKeys(obj) {
	  if (!isObject(obj)) return [];
	  var keys = [];
	  for (var key in obj) keys.push(key);

	  if (hasEnumBug) collectNonEnumProps(obj, keys);

	  return keys;
	};

	var extendHolder = function extendHolder(keysFunc, undefinedOnly) {
	  return function (obj) {
	    var length = arguments.length;
	    if (length < 2 || obj == null) return obj;
	    for (var index = 1; index < length; index++) {
	      var source = arguments[index],
	          keys = keysFunc(source),
	          l = keys.length;
	      for (var i = 0; i < l; i++) {
	        var key = keys[i];
	        if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	      }
	    }
	    return obj;
	  };
	};

	//extend functionality from underscore
	var extend = extendHolder(allKeys);
	var extendOwn = extendHolder(keys);

	/* underscore helpers */
	var identity = function identity(value) {
	  return value;
	};

	var isMatch = function isMatch(object, attrs) {
	  var keys = keys(attrs),
	      length = keys.length;
	  if (object == null) return !length;
	  var obj = Object(object);
	  for (var i = 0; i < length; i++) {
	    var key = keys[i];
	    if (attrs[key] !== obj[key] || !(key in obj)) return false;
	  }
	  return true;
	};

	var matcher = function matcher(attrs) {
	  attrs = extendOwn({}, attrs);
	  return function (obj) {
	    return isMatch(obj, attrs);
	  };
	};

	var cb = function cb(value, context, argCount) {
	  if (value == null) return identity;
	  if (isFunction(value)) return optimizeCb(value, context, argCount);
	  if (isObject(value)) return matcher(value);
	  return property(value);
	};

	var optimizeCb = function optimizeCb(func, context, argCount) {
	  if (context === void 0) return func;
	  switch (argCount == null ? 3 : argCount) {
	    case 1:
	      return function (value) {
	        return func.call(context, value);
	      };
	    case 2:
	      return function (value, other) {
	        return func.call(context, value, other);
	      };
	    case 3:
	      return function (value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	    case 4:
	      return function (accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	  }
	  return function () {
	    return func.apply(context, arguments);
	  };
	};

	//from underscore
	var forEach = function forEach(obj, iteratee, context) {
	  iteratee = optimizeCb(iteratee, context);
	  var i, length;
	  if (isArrayLike(obj)) {
	    for (i = 0, length = obj.length; i < length; i++) {
	      iteratee(obj[i], i, obj);
	    }
	  } else {
	    var keys = keys(obj);
	    for (i = 0, length = keys.length; i < length; i++) {
	      iteratee(obj[keys[i]], keys[i], obj);
	    }
	  }
	  return obj;
	};

	//map functionality from underscore
	var map = function map(obj, iteratee, context) {
	  iteratee = cb(iteratee, context);
	  var keys = !isArrayLike(obj) && keys(obj),
	      length = (keys || obj).length,
	      results = Array(length);
	  for (var index = 0; index < length; index++) {
	    var currentKey = keys ? keys[index] : index;
	    results[index] = iteratee(obj[currentKey], currentKey, obj);
	  }
	  return results;
	};

	//reduce functionality from underscore
	var reduce = function reduce(obj, iteratee, memo, context) {
	  iteratee = optimizeCb(iteratee, context, 4);
	  var keys = !isArrayLike(obj) && keys(obj),
	      length = (keys || obj).length,
	      index = 0;

	  if (arguments.length < 3) {
	    memo = obj[keys ? keys[index] : index];
	    index += 1;
	  }
	  for (; index >= 0 && index < length; index++) {
	    var currentKey = keys ? keys[index] : index;
	    memo = iteratee(memo, obj[currentKey], currentKey, obj);
	  }
	  return memo;
	};

	//clone functionality from underscore
	var shallowCopy = function shallowCopy(obj) {
	  if (!isObject(obj)) return obj;
	  return isArray(obj) ? obj.slice() : extend({}, obj);
	};

	/* helper functions from underscore */
	var property = function property(key) {
	  return function (obj) {
	    return obj == null ? void 0 : obj[key];
	  };
	};

	var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	var getLength = property('length');
	var isArrayLike = function isArrayLike(collection) {
	  var length = getLength(collection);
	  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	};

	var has = function has(obj, key) {
	  return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
	};

	/* All these are helper functions to deal with older versions of IE  :(*/
	var hasEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
	var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	function collectNonEnumProps(obj, keys) {
	  var nonEnumIdx = nonEnumerableProps.length;
	  var constructor = obj.constructor;
	  var proto = isFunction(constructor) && constructor.prototype || Object.Prototype;

	  var prop = 'constructor';
	  if (has(obj, prop) && !contains(keys, prop)) keys.push(prop);

	  while (nonEnumIdx--) {
	    prop = nonEnumerableProps[nonEnumIdx];
	    if (prop in obj && obj[prop] !== proto[prop] && !contains(keys, prop)) {
	      keys.push(prop);
	    }
	  }
	}
	var contains = function contains(obj, item, fromIndex, guard) {
	  if (!isArrayLike(obj)) obj = values(obj);
	  if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	  return obj.indexOf(item) >= 0;
	};

	var vals = function vals(obj) {
	  var keys = _.keys(obj);
	  var length = keys.length;
	  var values = Array(length);
	  for (var i = 0; i < length; i++) {
	    values[i] = obj[keys[i]];
	  }
	  return values;
	};

	var range = function range(max) {
	  var l = [];
	  for (var i = 0; i < max; i++) {
	    l.push(i);
	  }
	  return l;
	};

	var hasKey = function hasKey(obj, key) {
	  return typeof obj[key] !== 'undefined';
	};

	exports['default'] = { deepCopy: deepCopy, map: map, reduce: reduce, getParameterByName: getParameterByName, forEach: forEach, isFunction: isFunction, trimTrailingWhitespace: trimTrailingWhitespace, hasKey: hasKey, shallowCopy: shallowCopy, extend: extend, isObject: isObject, isArray: isArray, range: range };
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _core = __webpack_require__(4);

	var core = _interopRequireWildcard(_core);

	var _random = __webpack_require__(3);

	var random = _interopRequireWildcard(_random);

	var _libUtils = __webpack_require__(9);

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

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _libUtils = __webpack_require__(9);

	var PlanOutOp = (function () {
	  function PlanOutOp(args) {
	    _classCallCheck(this, PlanOutOp);

	    this.args = args;
	  }

	  _createClass(PlanOutOp, [{
	    key: "execute",
	    value: function execute(mapper) {
	      throw "Implement this function";
	    }
	  }, {
	    key: "dumpArgs",
	    value: function dumpArgs() {
	      console.log(this.args);
	    }
	  }, {
	    key: "getArgMixed",
	    value: function getArgMixed(name) {
	      if (this.args[name] === undefined) {
	        throw "Missing argument " + name;
	      }
	      return this.args[name];
	    }
	  }, {
	    key: "getArgNumber",
	    value: function getArgNumber(name) {
	      var cur = this.getArgMixed(name);
	      if (typeof cur !== "number") {
	        throw name + " is not a number.";
	      }
	      return cur;
	    }
	  }, {
	    key: "getArgString",
	    value: function getArgString(name) {
	      var cur = this.getArgMixed(name);
	      if (typeof cur !== "string") {
	        throw name + " is not a string.";
	      }
	      return cur;
	    }
	  }, {
	    key: "getArgList",
	    value: function getArgList(name) {
	      var cur = this.getArgMixed(name);
	      if (Object.prototype.toString.call(cur) !== '[object Array]') {
	        throw name + " is not a list";
	      }
	      return cur;
	    }
	  }, {
	    key: "getArgObject",
	    value: function getArgObject(name) {
	      var cur = this.getArgMixed(name);
	      if (Object.prototype.toString.call(cur) !== '[object Object]') {
	        throw name + " is not an object.";
	      }
	      return cur;
	    }
	  }, {
	    key: "getArgIndexish",
	    value: function getArgIndexish(name) {
	      var cur = this.getArgMixed(name);
	      var type = Object.prototype.toString.call(cur);
	      if (type !== '[object Object]' && type !== '[object Array]') {
	        throw name + " is not an list or object.";
	      }
	      return cur;
	    }
	  }]);

	  return PlanOutOp;
	})();

	;

	var PlanOutOpSimple = (function (_PlanOutOp) {
	  _inherits(PlanOutOpSimple, _PlanOutOp);

	  function PlanOutOpSimple() {
	    _classCallCheck(this, PlanOutOpSimple);

	    _get(Object.getPrototypeOf(PlanOutOpSimple.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(PlanOutOpSimple, [{
	    key: "execute",
	    value: function execute(mapper) {
	      this.mapper = mapper;
	      var self = this;
	      (0, _libUtils.forEach)(Object.keys(this.args), function (key) {
	        self.args[key] = mapper.evaluate(self.args[key]);
	      });
	      return this.simpleExecute();
	    }
	  }]);

	  return PlanOutOpSimple;
	})(PlanOutOp);

	var PlanOutOpUnary = (function (_PlanOutOpSimple) {
	  _inherits(PlanOutOpUnary, _PlanOutOpSimple);

	  function PlanOutOpUnary() {
	    _classCallCheck(this, PlanOutOpUnary);

	    _get(Object.getPrototypeOf(PlanOutOpUnary.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(PlanOutOpUnary, [{
	    key: "simpleExecute",
	    value: function simpleExecute() {
	      return this.unaryExecute(this.getArgMixed('value'));
	    }
	  }, {
	    key: "getUnaryString",
	    value: function getUnaryString() {
	      return this.args.op;
	    }
	  }, {
	    key: "unaryExecute",
	    value: function unaryExecute(value) {
	      throw "implement this";
	    }
	  }]);

	  return PlanOutOpUnary;
	})(PlanOutOpSimple);

	var PlanOutOpBinary = (function (_PlanOutOpSimple2) {
	  _inherits(PlanOutOpBinary, _PlanOutOpSimple2);

	  function PlanOutOpBinary() {
	    _classCallCheck(this, PlanOutOpBinary);

	    _get(Object.getPrototypeOf(PlanOutOpBinary.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(PlanOutOpBinary, [{
	    key: "simpleExecute",
	    value: function simpleExecute() {
	      var left = this.getArgMixed('left');
	      return this.binaryExecute(this.getArgMixed('left'), this.getArgMixed('right'));
	    }
	  }, {
	    key: "getInfixString",
	    value: function getInfixString() {
	      return this.args.op;
	    }
	  }, {
	    key: "binaryExecute",
	    value: function binaryExecute(left, right) {
	      throw "implement this";
	    }
	  }]);

	  return PlanOutOpBinary;
	})(PlanOutOpSimple);

	var PlanOutOpCommutative = (function (_PlanOutOpSimple3) {
	  _inherits(PlanOutOpCommutative, _PlanOutOpSimple3);

	  function PlanOutOpCommutative() {
	    _classCallCheck(this, PlanOutOpCommutative);

	    _get(Object.getPrototypeOf(PlanOutOpCommutative.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(PlanOutOpCommutative, [{
	    key: "simpleExecute",
	    value: function simpleExecute() {
	      return this.commutativeExecute(this.getArgList('values'));
	    }
	  }, {
	    key: "getCommutativeString",
	    value: function getCommutativeString() {
	      return this.args.op;
	    }
	  }, {
	    key: "commutativeExecute",
	    value: function commutativeExecute(values) {
	      throw "implement this";
	    }
	  }]);

	  return PlanOutOpCommutative;
	})(PlanOutOpSimple);

	exports.PlanOutOp = PlanOutOp;
	exports.PlanOutOpSimple = PlanOutOpSimple;
	exports.PlanOutOpCommutative = PlanOutOpCommutative;
	exports.PlanOutOpBinary = PlanOutOpBinary;
	exports.PlanOutOpUnary = PlanOutOpUnary;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
	/*  SHA-1 implementation in JavaScript                  (c) Chris Veness 2002-2014 / MIT Licence  */
	/*                                                                                                */
	/*  - see http://csrc.nist.gov/groups/ST/toolkit/secure_hashing.html                              */
	/*        http://csrc.nist.gov/groups/ST/toolkit/examples.html                                    */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

	/* jshint node:true */ /* global define, escape, unescape */
	'use strict';

	/**
	 * SHA-1 hash function reference implementation.
	 *
	 * @namespace
	 */
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Sha1 = {};

	/**
	 * Generates SHA-1 hash of string.
	 *
	 * @param   {string} msg - (Unicode) string to be hashed.
	 * @returns {string} Hash of msg as hex character string.
	 */
	Sha1.hash = function (msg) {
	    // convert string to UTF-8, as SHA only deals with byte-streams
	    msg = unescape(encodeURIComponent(msg));

	    // constants [§4.2.1]
	    var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];

	    // PREPROCESSING

	    msg += String.fromCharCode(0x80); // add trailing '1' bit (+ 0's padding) to string [§5.1.1]

	    // convert string msg into 512-bit/16-integer blocks arrays of ints [§5.2.1]
	    var l = msg.length / 4 + 2; // length (in 32-bit integers) of msg + ‘1’ + appended length
	    var N = Math.ceil(l / 16); // number of 16-integer-blocks required to hold 'l' ints
	    var M = new Array(N);

	    for (var i = 0; i < N; i++) {
	        M[i] = new Array(16);
	        for (var j = 0; j < 16; j++) {
	            // encode 4 chars per integer, big-endian encoding
	            M[i][j] = msg.charCodeAt(i * 64 + j * 4) << 24 | msg.charCodeAt(i * 64 + j * 4 + 1) << 16 | msg.charCodeAt(i * 64 + j * 4 + 2) << 8 | msg.charCodeAt(i * 64 + j * 4 + 3);
	        } // note running off the end of msg is ok 'cos bitwise ops on NaN return 0
	    }
	    // add length (in bits) into final pair of 32-bit integers (big-endian) [§5.1.1]
	    // note: most significant word would be (len-1)*8 >>> 32, but since JS converts
	    // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
	    M[N - 1][14] = (msg.length - 1) * 8 / Math.pow(2, 32);M[N - 1][14] = Math.floor(M[N - 1][14]);
	    M[N - 1][15] = (msg.length - 1) * 8 & 0xffffffff;

	    // set initial hash value [§5.3.1]
	    var H0 = 0x67452301;
	    var H1 = 0xefcdab89;
	    var H2 = 0x98badcfe;
	    var H3 = 0x10325476;
	    var H4 = 0xc3d2e1f0;

	    // HASH COMPUTATION [§6.1.2]

	    var W = new Array(80);var a, b, c, d, e;
	    for (var i = 0; i < N; i++) {

	        // 1 - prepare message schedule 'W'
	        for (var t = 0; t < 16; t++) W[t] = M[i][t];
	        for (var t = 16; t < 80; t++) W[t] = Sha1.ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);

	        // 2 - initialise five working variables a, b, c, d, e with previous hash value
	        a = H0;b = H1;c = H2;d = H3;e = H4;

	        // 3 - main loop
	        for (var t = 0; t < 80; t++) {
	            var s = Math.floor(t / 20); // seq for blocks of 'f' functions and 'K' constants
	            var T = Sha1.ROTL(a, 5) + Sha1.f(s, b, c, d) + e + K[s] + W[t] & 0xffffffff;
	            e = d;
	            d = c;
	            c = Sha1.ROTL(b, 30);
	            b = a;
	            a = T;
	        }

	        // 4 - compute the new intermediate hash value (note 'addition modulo 2^32')
	        H0 = H0 + a & 0xffffffff;
	        H1 = H1 + b & 0xffffffff;
	        H2 = H2 + c & 0xffffffff;
	        H3 = H3 + d & 0xffffffff;
	        H4 = H4 + e & 0xffffffff;
	    }

	    return Sha1.toHexStr(H0) + Sha1.toHexStr(H1) + Sha1.toHexStr(H2) + Sha1.toHexStr(H3) + Sha1.toHexStr(H4);
	};

	/**
	 * Function 'f' [§4.1.1].
	 * @private
	 */
	Sha1.f = function (s, x, y, z) {
	    switch (s) {
	        case 0:
	            return x & y ^ ~x & z; // Ch()
	        case 1:
	            return x ^ y ^ z; // Parity()
	        case 2:
	            return x & y ^ x & z ^ y & z; // Maj()
	        case 3:
	            return x ^ y ^ z; // Parity()
	    }
	};

	/**
	 * Rotates left (circular left shift) value x by n positions [§3.2.5].
	 * @private
	 */
	Sha1.ROTL = function (x, n) {
	    return x << n | x >>> 32 - n;
	};

	/**
	 * Hexadecimal representation of a number.
	 * @private
	 */
	Sha1.toHexStr = function (n) {
	    // note can't use toString(16) as it is implementation-dependant,
	    // and in IE returns signed numbers when used on full words
	    var s = "",
	        v;
	    for (var i = 7; i >= 0; i--) {
	        v = n >>> i * 4 & 0xf;s += v.toString(16);
	    }
	    return s;
	};

	exports["default"] = Sha1;
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;