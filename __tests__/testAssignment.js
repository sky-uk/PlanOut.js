var Assignment = require('../es6/assignment');
var UniformChoice = require('../es6/ops/random').UniformChoice;
var ExperimentSetup = require('../es6/experimentSetup');

var testerUnit = '4';
var testerSalt = 'xtest_salt';


describe('Test the assignment module', function() {
  it('Should set constants correctly', function() {
    var a = new Assignment(testerSalt);
    a.set('foo', 12);
    expect(a.get('foo')).toBe(12);
  });
  it('Should work with uniform choice', function() {
    var a = new Assignment(testerSalt);
    var choices = ['a', 'b'];
    a.set('foo', new UniformChoice({'choices': choices, 'unit': testerUnit}));
    a.set('bar', new UniformChoice({'choices': choices, 'unit': testerUnit}));
    a.set('baz', new UniformChoice({'choices': choices, 'unit': testerUnit}));

    expect(a.get('foo')).toEqual('b');
    expect(a.get('bar')).toEqual('a');
    expect(a.get('baz')).toEqual('b');
  });

  it('Should work with overrides', function() {
    var a = new Assignment(testerSalt);
    a.setOverrides({'x': 42, 'y': 43});
    a.set('x', 5);
    a.set('y', 6);
    expect(a.get('x')).toEqual(42);
    expect(a.get('y')).toEqual(43);
  });

  it('Should work with falsy overrides', function() {
    var a = new Assignment(testerSalt);
    a.setOverrides({'x': 0, 'y': '', 'z': false});
    a.set('x', 5);
    a.set('y', 6);
    a.set('z', 7);
    expect(a.get('x')).toEqual(0);
    expect(a.get('y')).toEqual('');
    expect(a.get('z')).toEqual(false);
  });
});
