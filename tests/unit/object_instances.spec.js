QUnit.module('instances of objects', config);

test('should export instance of an new CustomFunction', function(assert){

    AMD.define('export/custom/instance', ['exports'], function(exports){

        var customAction = function(number){
            this.number = number;
        };

        customAction.prototype.getNumber = function(){
            return this.number;
        };

        customAction.prototype.increment = function(){
            this.number++;
        };

        var result = new customAction(5);

        exports["default"] = result;

    });

    var result = AMD.require('export/custom/instance');

    assert.deepEqual(result.getNumber(), 5, 'should export instance');

    result.increment();

    assert.deepEqual(result.getNumber(), 6, 'can use methods form the instance object');

    var newresult = AMD.require('export/custom/instance');

    assert.deepEqual(newresult.getNumber(), 5, 'should not overwite instance');

    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should export class', function(assert){

    AMD.define('export/custom/class', ['exports'], function(exports){

        var customAction = function(number){
            this.number = number;
        };

        customAction.prototype.getNumber = function(){
            return this.number;
        };

        customAction.prototype.increment = function(){
            this.number++;
        };

        var result = customAction;

        exports["default"] = result;

    });

    var customClass = AMD.require('export/custom/class');

    var action = new customClass(3);

    assert.deepEqual(action.getNumber(), 3, 'can use methods from the class');

    action.increment();

    assert.deepEqual(action.getNumber(), 4, 'should not overwrite the class');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should export method', function(assert){

    AMD.define('export/custom/method', ['exports'], function(exports){

        var customAction = function(number){
            this.number = number;
        };

        customAction.prototype.getNumber = function(){
            return this.number;
        };

        customAction.prototype.increment = function(){
            this.number++;
        };

        var result = new customAction(9);

        exports["default"] = result.increment;
        exports["klass"] = result;

    });

    var incrementMethod = AMD.require('export/custom/method');
    var klass = AMD.require('export/custom/method', 'klass');

    assert.deepEqual(klass.getNumber(), 9, 'class is initialized');

    incrementMethod();

    assert.deepEqual(klass.getNumber(), 9, 'should not keep reference of the instance');

    klass.increment();

    assert.deepEqual(klass.getNumber(), 10, 'should execute method on class');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});