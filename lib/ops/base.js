"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _libUtils = require("../lib/utils");

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