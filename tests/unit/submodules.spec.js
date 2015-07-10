QUnit.module('export submodules', config);

test('should export submodules', function(assert){

    AMD.define('different/export/submodules', ['exports'], function(exports){

        var result = 'hello';

        exports["default"] = result;
        exports["notdefault"] = 99;

    });

    var result = AMD.require('different/export/submodules');
    var notdefault = AMD.require('different/export/submodules', 'notdefault');

    assert.equal(result, 'hello', 'should export correctly default');
    assert.equal(notdefault, 99, 'should export correctly notdefault');

});