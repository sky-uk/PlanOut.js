"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Return = exports.Length = exports.Max = exports.Min = exports.Negative = exports.Not = exports.Round = exports.Divide = exports.Mod = exports.GreaterThanOrEqualTo = exports.LessThanOrEqualTo = exports.LessThan = exports.GreaterThan = exports.Equals = exports.Sum = exports.Product = exports.Or = exports.And = exports.Cond = exports.Index = exports.Coalesce = exports.Map = exports.Arr = exports.Set = exports.Seq = exports.Get = exports.Literal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require("./base");

var _utils = require("./utils");

var _utils2 = require("../lib/utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Literal = function (_PlanOutOp) {
  _inherits(Literal, _PlanOutOp);

  function Literal() {
    _classCallCheck(this, Literal);

    return _possibleConstructorReturn(this, (Literal.__proto__ || Object.getPrototypeOf(Literal)).apply(this, arguments));
  }

  _createClass(Literal, [{
    key: "execute",
    value: function execute(mapper) {
      return this.getArgMixed('value');
    }
  }]);

  return Literal;
}(_base.PlanOutOp);

var Get = function (_PlanOutOp2) {
  _inherits(Get, _PlanOutOp2);

  function Get() {
    _classCallCheck(this, Get);

    return _possibleConstructorReturn(this, (Get.__proto__ || Object.getPrototypeOf(Get)).apply(this, arguments));
  }

  _createClass(Get, [{
    key: "execute",
    value: function execute(mapper) {
      return mapper.get(this.getArgString('var'));
    }
  }]);

  return Get;
}(_base.PlanOutOp);

var Seq = function (_PlanOutOp3) {
  _inherits(Seq, _PlanOutOp3);

  function Seq() {
    _classCallCheck(this, Seq);

    return _possibleConstructorReturn(this, (Seq.__proto__ || Object.getPrototypeOf(Seq)).apply(this, arguments));
  }

  _createClass(Seq, [{
    key: "execute",
    value: function execute(mapper) {
      (0, _utils2.forEach)(this.getArgList('seq'), function (op) {
        mapper.evaluate(op);
      });
    }
  }]);

  return Seq;
}(_base.PlanOutOp);

var Return = function (_PlanOutOp4) {
  _inherits(Return, _PlanOutOp4);

  function Return() {
    _classCallCheck(this, Return);

    return _possibleConstructorReturn(this, (Return.__proto__ || Object.getPrototypeOf(Return)).apply(this, arguments));
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
}(_base.PlanOutOp);

var Set = function (_PlanOutOp5) {
  _inherits(Set, _PlanOutOp5);

  function Set() {
    _classCallCheck(this, Set);

    return _possibleConstructorReturn(this, (Set.__proto__ || Object.getPrototypeOf(Set)).apply(this, arguments));
  }

  _createClass(Set, [{
    key: "execute",
    value: function execute(mapper) {
      var variable = this.getArgString('var');
      var value = this.getArgMixed('value');

      if (mapper.hasOverride(variable)) {
        return;
      }

      if (value && (0, _utils.isOperator)(value) && !value.salt) {
        value.salt = variable;
      }

      if (variable == "experimentSalt") {
        mapper.experimentSalt = value;
      }

      mapper.set(variable, mapper.evaluate(value));
    }
  }]);

  return Set;
}(_base.PlanOutOp);

var Arr = function (_PlanOutOp6) {
  _inherits(Arr, _PlanOutOp6);

  function Arr() {
    _classCallCheck(this, Arr);

    return _possibleConstructorReturn(this, (Arr.__proto__ || Object.getPrototypeOf(Arr)).apply(this, arguments));
  }

  _createClass(Arr, [{
    key: "execute",
    value: function execute(mapper) {
      return (0, _utils2.map)(this.getArgList('values'), function (value) {
        return mapper.evaluate(value);
      });
    }
  }]);

  return Arr;
}(_base.PlanOutOp);

var Coalesce = function (_PlanOutOp7) {
  _inherits(Coalesce, _PlanOutOp7);

  function Coalesce() {
    _classCallCheck(this, Coalesce);

    return _possibleConstructorReturn(this, (Coalesce.__proto__ || Object.getPrototypeOf(Coalesce)).apply(this, arguments));
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
}(_base.PlanOutOp);

var Index = function (_PlanOutOpSimple) {
  _inherits(Index, _PlanOutOpSimple);

  function Index() {
    _classCallCheck(this, Index);

    return _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).apply(this, arguments));
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
}(_base.PlanOutOpSimple);

var Cond = function (_PlanOutOp8) {
  _inherits(Cond, _PlanOutOp8);

  function Cond() {
    _classCallCheck(this, Cond);

    return _possibleConstructorReturn(this, (Cond.__proto__ || Object.getPrototypeOf(Cond)).apply(this, arguments));
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
}(_base.PlanOutOp);

var And = function (_PlanOutOp9) {
  _inherits(And, _PlanOutOp9);

  function And() {
    _classCallCheck(this, And);

    return _possibleConstructorReturn(this, (And.__proto__ || Object.getPrototypeOf(And)).apply(this, arguments));
  }

  _createClass(And, [{
    key: "execute",
    value: function execute(mapper) {
      return (0, _utils2.reduce)(this.getArgList('values'), function (ret, clause) {
        if (!ret) {
          return ret;
        }

        return Boolean(mapper.evaluate(clause));
      }, true);
    }
  }]);

  return And;
}(_base.PlanOutOp);

var Or = function (_PlanOutOp10) {
  _inherits(Or, _PlanOutOp10);

  function Or() {
    _classCallCheck(this, Or);

    return _possibleConstructorReturn(this, (Or.__proto__ || Object.getPrototypeOf(Or)).apply(this, arguments));
  }

  _createClass(Or, [{
    key: "execute",
    value: function execute(mapper) {
      return (0, _utils2.reduce)(this.getArgList('values'), function (ret, clause) {
        if (ret) {
          return ret;
        }

        return Boolean(mapper.evaluate(clause));
      }, false);
    }
  }]);

  return Or;
}(_base.PlanOutOp);

var Product = function (_PlanOutOpCommutative) {
  _inherits(Product, _PlanOutOpCommutative);

  function Product() {
    _classCallCheck(this, Product);

    return _possibleConstructorReturn(this, (Product.__proto__ || Object.getPrototypeOf(Product)).apply(this, arguments));
  }

  _createClass(Product, [{
    key: "commutativeExecute",
    value: function commutativeExecute(values) {
      return (0, _utils2.reduce)(values, function (memo, value) {
        return memo * value;
      }, 1);
    }
  }]);

  return Product;
}(_base.PlanOutOpCommutative);

var Sum = function (_PlanOutOpCommutative2) {
  _inherits(Sum, _PlanOutOpCommutative2);

  function Sum() {
    _classCallCheck(this, Sum);

    return _possibleConstructorReturn(this, (Sum.__proto__ || Object.getPrototypeOf(Sum)).apply(this, arguments));
  }

  _createClass(Sum, [{
    key: "commutativeExecute",
    value: function commutativeExecute(values) {
      return (0, _utils2.reduce)(values, function (memo, value) {
        return memo + value;
      }, 0);
    }
  }]);

  return Sum;
}(_base.PlanOutOpCommutative);

var Equals = function (_PlanOutOpBinary) {
  _inherits(Equals, _PlanOutOpBinary);

  function Equals() {
    _classCallCheck(this, Equals);

    return _possibleConstructorReturn(this, (Equals.__proto__ || Object.getPrototypeOf(Equals)).apply(this, arguments));
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
}(_base.PlanOutOpBinary);

var GreaterThan = function (_PlanOutOpBinary2) {
  _inherits(GreaterThan, _PlanOutOpBinary2);

  function GreaterThan() {
    _classCallCheck(this, GreaterThan);

    return _possibleConstructorReturn(this, (GreaterThan.__proto__ || Object.getPrototypeOf(GreaterThan)).apply(this, arguments));
  }

  _createClass(GreaterThan, [{
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      return left > right;
    }
  }]);

  return GreaterThan;
}(_base.PlanOutOpBinary);

var LessThan = function (_PlanOutOpBinary3) {
  _inherits(LessThan, _PlanOutOpBinary3);

  function LessThan() {
    _classCallCheck(this, LessThan);

    return _possibleConstructorReturn(this, (LessThan.__proto__ || Object.getPrototypeOf(LessThan)).apply(this, arguments));
  }

  _createClass(LessThan, [{
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      return left < right;
    }
  }]);

  return LessThan;
}(_base.PlanOutOpBinary);

var LessThanOrEqualTo = function (_PlanOutOpBinary4) {
  _inherits(LessThanOrEqualTo, _PlanOutOpBinary4);

  function LessThanOrEqualTo() {
    _classCallCheck(this, LessThanOrEqualTo);

    return _possibleConstructorReturn(this, (LessThanOrEqualTo.__proto__ || Object.getPrototypeOf(LessThanOrEqualTo)).apply(this, arguments));
  }

  _createClass(LessThanOrEqualTo, [{
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      return left <= right;
    }
  }]);

  return LessThanOrEqualTo;
}(_base.PlanOutOpBinary);

var GreaterThanOrEqualTo = function (_PlanOutOpBinary5) {
  _inherits(GreaterThanOrEqualTo, _PlanOutOpBinary5);

  function GreaterThanOrEqualTo() {
    _classCallCheck(this, GreaterThanOrEqualTo);

    return _possibleConstructorReturn(this, (GreaterThanOrEqualTo.__proto__ || Object.getPrototypeOf(GreaterThanOrEqualTo)).apply(this, arguments));
  }

  _createClass(GreaterThanOrEqualTo, [{
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      return left >= right;
    }
  }]);

  return GreaterThanOrEqualTo;
}(_base.PlanOutOpBinary);

var Mod = function (_PlanOutOpBinary6) {
  _inherits(Mod, _PlanOutOpBinary6);

  function Mod() {
    _classCallCheck(this, Mod);

    return _possibleConstructorReturn(this, (Mod.__proto__ || Object.getPrototypeOf(Mod)).apply(this, arguments));
  }

  _createClass(Mod, [{
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      return left % right;
    }
  }]);

  return Mod;
}(_base.PlanOutOpBinary);

var Divide = function (_PlanOutOpBinary7) {
  _inherits(Divide, _PlanOutOpBinary7);

  function Divide() {
    _classCallCheck(this, Divide);

    return _possibleConstructorReturn(this, (Divide.__proto__ || Object.getPrototypeOf(Divide)).apply(this, arguments));
  }

  _createClass(Divide, [{
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      return parseFloat(left) / parseFloat(right);
    }
  }]);

  return Divide;
}(_base.PlanOutOpBinary);

var Round = function (_PlanOutOpUnary) {
  _inherits(Round, _PlanOutOpUnary);

  function Round() {
    _classCallCheck(this, Round);

    return _possibleConstructorReturn(this, (Round.__proto__ || Object.getPrototypeOf(Round)).apply(this, arguments));
  }

  _createClass(Round, [{
    key: "unaryExecute",
    value: function unaryExecute(value) {
      return Math.round(value);
    }
  }]);

  return Round;
}(_base.PlanOutOpUnary);

var Not = function (_PlanOutOpUnary2) {
  _inherits(Not, _PlanOutOpUnary2);

  function Not() {
    _classCallCheck(this, Not);

    return _possibleConstructorReturn(this, (Not.__proto__ || Object.getPrototypeOf(Not)).apply(this, arguments));
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
}(_base.PlanOutOpUnary);

var Negative = function (_PlanOutOpUnary3) {
  _inherits(Negative, _PlanOutOpUnary3);

  function Negative() {
    _classCallCheck(this, Negative);

    return _possibleConstructorReturn(this, (Negative.__proto__ || Object.getPrototypeOf(Negative)).apply(this, arguments));
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
}(_base.PlanOutOpUnary);

var Min = function (_PlanOutOpCommutative3) {
  _inherits(Min, _PlanOutOpCommutative3);

  function Min() {
    _classCallCheck(this, Min);

    return _possibleConstructorReturn(this, (Min.__proto__ || Object.getPrototypeOf(Min)).apply(this, arguments));
  }

  _createClass(Min, [{
    key: "commutativeExecute",
    value: function commutativeExecute(values) {
      return Math.min.apply(null, values);
    }
  }]);

  return Min;
}(_base.PlanOutOpCommutative);

var Max = function (_PlanOutOpCommutative4) {
  _inherits(Max, _PlanOutOpCommutative4);

  function Max() {
    _classCallCheck(this, Max);

    return _possibleConstructorReturn(this, (Max.__proto__ || Object.getPrototypeOf(Max)).apply(this, arguments));
  }

  _createClass(Max, [{
    key: "commutativeExecute",
    value: function commutativeExecute(values) {
      return Math.max.apply(null, values);
    }
  }]);

  return Max;
}(_base.PlanOutOpCommutative);

var Length = function (_PlanOutOpUnary4) {
  _inherits(Length, _PlanOutOpUnary4);

  function Length() {
    _classCallCheck(this, Length);

    return _possibleConstructorReturn(this, (Length.__proto__ || Object.getPrototypeOf(Length)).apply(this, arguments));
  }

  _createClass(Length, [{
    key: "unaryExecute",
    value: function unaryExecute(value) {
      return value.length;
    }
  }]);

  return Length;
}(_base.PlanOutOpUnary);

var Map = function (_PlanOutOpSimple2) {
  _inherits(Map, _PlanOutOpSimple2);

  function Map() {
    _classCallCheck(this, Map);

    return _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).apply(this, arguments));
  }

  _createClass(Map, [{
    key: "simpleExecute",
    value: function simpleExecute() {
      var copy = (0, _utils2.deepCopy)(this.args);
      delete copy.op;
      delete copy.salt;
      return copy;
    }
  }]);

  return Map;
}(_base.PlanOutOpSimple);

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