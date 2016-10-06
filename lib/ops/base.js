"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlanOutOpUnary = exports.PlanOutOpBinary = exports.PlanOutOpCommutative = exports.PlanOutOpSimple = exports.PlanOutOp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("../lib/utils");

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlanOutOp = function () {
  function PlanOutOp(args) {
    _classCallCheck(this, PlanOutOp);

    this.args = args;
  }

  _createClass(PlanOutOp, [{
    key: "execute",
    value: function execute(mapper) {
      throw "Implement the execute function";
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
}();

;

var PlanOutOpSimple = function (_PlanOutOp) {
  _inherits(PlanOutOpSimple, _PlanOutOp);

  function PlanOutOpSimple() {
    _classCallCheck(this, PlanOutOpSimple);

    return _possibleConstructorReturn(this, (PlanOutOpSimple.__proto__ || Object.getPrototypeOf(PlanOutOpSimple)).apply(this, arguments));
  }

  _createClass(PlanOutOpSimple, [{
    key: "execute",
    value: function execute(mapper) {
      this.mapper = mapper;
      var self = this;
      (0, _utils.forEach)(Object.keys(this.args), function (key) {
        self.args[key] = mapper.evaluate(self.args[key]);
      });
      return this.simpleExecute();
    }
  }]);

  return PlanOutOpSimple;
}(PlanOutOp);

var PlanOutOpUnary = function (_PlanOutOpSimple) {
  _inherits(PlanOutOpUnary, _PlanOutOpSimple);

  function PlanOutOpUnary() {
    _classCallCheck(this, PlanOutOpUnary);

    return _possibleConstructorReturn(this, (PlanOutOpUnary.__proto__ || Object.getPrototypeOf(PlanOutOpUnary)).apply(this, arguments));
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
      throw "implement unaryExecute";
    }
  }]);

  return PlanOutOpUnary;
}(PlanOutOpSimple);

var PlanOutOpBinary = function (_PlanOutOpSimple2) {
  _inherits(PlanOutOpBinary, _PlanOutOpSimple2);

  function PlanOutOpBinary() {
    _classCallCheck(this, PlanOutOpBinary);

    return _possibleConstructorReturn(this, (PlanOutOpBinary.__proto__ || Object.getPrototypeOf(PlanOutOpBinary)).apply(this, arguments));
  }

  _createClass(PlanOutOpBinary, [{
    key: "simpleExecute",
    value: function simpleExecute() {
      var left = this.getArgMixed('left');
      var right = this.getArgMixed('right');
      return this.binaryExecute(left, right);
    }
  }, {
    key: "getInfixString",
    value: function getInfixString() {
      return this.args.op;
    }
  }, {
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      throw "implement binaryExecute";
    }
  }]);

  return PlanOutOpBinary;
}(PlanOutOpSimple);

var PlanOutOpCommutative = function (_PlanOutOpSimple3) {
  _inherits(PlanOutOpCommutative, _PlanOutOpSimple3);

  function PlanOutOpCommutative() {
    _classCallCheck(this, PlanOutOpCommutative);

    return _possibleConstructorReturn(this, (PlanOutOpCommutative.__proto__ || Object.getPrototypeOf(PlanOutOpCommutative)).apply(this, arguments));
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
      throw "implement commutativeExecute";
    }
  }]);

  return PlanOutOpCommutative;
}(PlanOutOpSimple);

exports.PlanOutOp = PlanOutOp;
exports.PlanOutOpSimple = PlanOutOpSimple;
exports.PlanOutOpCommutative = PlanOutOpCommutative;
exports.PlanOutOpBinary = PlanOutOpBinary;
exports.PlanOutOpUnary = PlanOutOpUnary;