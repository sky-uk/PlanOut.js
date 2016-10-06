"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _random = require("./ops/random");

var _utils = require("./lib/utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Assignment = function () {
  function Assignment(experimentSalt, overrides) {
    _classCallCheck(this, Assignment);

    if (!overrides) {
      overrides = {};
    }
    this.experimentSalt = experimentSalt;
    this._overrides = (0, _utils.shallowCopy)(overrides);
    this._data = (0, _utils.shallowCopy)(overrides);
    this.saltSeparator = '.';
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
      this._overrides = (0, _utils.shallowCopy)(overrides);
      var self = this;
      (0, _utils.forEach)(Object.keys(this._overrides), function (overrideKey) {
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
      } else if (name === 'saltSeparator') {
        this.saltSeparator = value;
        return;
      }

      if ((0, _utils.hasKey)(this._overrides, name)) {
        return;
      }
      if (value instanceof _random.PlanOutOpRandom) {
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
      } else if (name === 'saltSeparator') {
        return this.saltSeparator;
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
}();

;

exports.default = Assignment;
module.exports = exports["default"];