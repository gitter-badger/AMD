QUnit.module('exports different type of values: should export', config);

test('string', function(assert){

    AMD.define('different/export/string', ['exports'], function(exports){

        var result = 'hello';

        exports["default"] = result;

    });

    var result = AMD.require('different/export/string');

    assert.deepEqual(result, 'hello', 'should export correctly strings');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('number', function(assert){

    AMD.define('different/export/number', ['exports'], function(exports){

        var result = 47;

        exports["default"] = result;

    });

    var result = AMD.require('different/export/number');

    assert.equal(result, 47, 'should export correctly numbers');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('object', function(assert){

    AMD.define('different/export/object', ['exports'], function(exports){

        var result = {a:12,b:34};

        exports["default"] = result;

    });

    var result = AMD.require('different/export/object');

    assert.deepEqual(result, {a:12,b:34}, 'should export correctly object');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('array', function(assert){

    AMD.define('different/export/array', ['exports'], function(exports){

        var result = [1,2,3,4,5];

        exports["default"] = result;

    });

    var result = AMD.require('different/export/array');

    assert.deepEqual(result, [1,2,3,4,5], 'should export correctly array');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('date', function(assert){

    AMD.define('different/export/date', ['exports'], function(exports){

        var result = new Date();

        exports["default"] = result;

    });

    var result = AMD.require('different/export/date');

    assert.ok(result instanceof Date, 'should export correctly date');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('regexp', function(assert){

    AMD.define('different/export/regexp', ['exports'], function(exports){

        var result = new RegExp(/[bvc]/);

        exports["default"] = result;

    });

    var result = AMD.require('different/export/regexp');

    assert.ok(result instanceof RegExp, 'should export correctly regexp');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('undefined', function(assert){

    AMD.define('different/export/undefined', ['exports'], function(exports){

        var result;

        exports["default"] = result;

    });

    var result = AMD.require('different/export/undefined');

    assert.equal(result, undefined, 'should export correctly undefined');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('null', function(assert){

    AMD.define('different/export/null', ['exports'], function(exports){

        var result = null;

        exports["default"] = result;

    });

    var result = AMD.require('different/export/null');

    assert.equal(result, null, 'should export correctly null');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('function which returns', function(assert){

    AMD.define('different/export/function', ['exports'], function(exports){

        var result = function(ceva){return 'hello ' + ceva};

        exports["default"] = result;

    });

    var result = AMD.require('different/export/function');

    assert.equal(result('lume'), 'hello lume', 'should export correctly function');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('function which does not returns', function(assert){

    AMD.define('different/export/function/noreturns', ['exports'], function(exports){

        var result = function(ceva){ var altceva = ceva + ceva;};

        exports["default"] = result;

    });

    var result = AMD.require('different/export/function/noreturns');

    assert.equal(result('lume'), null, 'should export correctly function');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});