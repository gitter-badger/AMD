QUnit.module('Closures', config);

test('should export instance of an new CustomFunction', function(assert){

    AMD.define('export/custom/instance', ['exports'], function(exports){

        var number = 5;

        var getNumber = function(){
            return number;
        };

        var increment = function(){
            number++;
        };

        exports["default"] = getNumber;
        exports["increment"] = increment;
        exports["getNumber"] = getNumber;

    });

    var getNumber = AMD.require('export/custom/instance', 'getNumber');
    var increment = AMD.require('export/custom/instance', 'increment');

    assert.equal(AMD.getLength(), 1, 'registry length should be 1');
    assert.deepEqual(getNumber(), 5, 'should access method from closure');

    increment();

    assert.deepEqual(getNumber(), 6, 'should access private variables values from closure');

    var newGetNumber = AMD.require('export/custom/instance');

    increment();

    assert.deepEqual(newGetNumber(), 7, 'all required requests should get the new updated value from closure');

});