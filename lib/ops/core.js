"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _base = require("./base");

var _utils = require("./utils");

var _libUtils = require('../lib/utils');

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