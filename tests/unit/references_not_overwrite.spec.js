QUnit.module('Updating references: should not update reference as a ', config);

test('plain object', function(assert){

    AMD.define('different/export/object/ref', ['exports'], function(exports){

        var result = {a:12,b:34};

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref');

    initialObj.a = "suprascris";

    var finalObj = AMD.require('different/export/object/ref');

    assert.deepEqual(initialObj, {a:"suprascris",b:34}, 'update obj should be locally');
    assert.deepEqual(finalObj, {a:12,b:34}, 'should keep reference object');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('deep plain object', function(assert){

    AMD.define('different/export/object/ref/deep', ['exports'], function(exports){

        var result = {a:{c:5,d:'6'},b:34};

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/deep');

    initialObj.a = "suprascris";

    var finalObj = AMD.require('different/export/object/ref/deep');

    assert.deepEqual(initialObj, {a:"suprascris",b:34}, 'update deep obj should be locally');
    assert.deepEqual(finalObj, {a:{c:5,d:'6'},b:34}, 'should keep reference deep object');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('string', function(assert){

    AMD.define('different/export/object/ref/string', ['exports'], function(exports){

        var result = 'ref/string';

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/string');

    initialObj = "string suprascris";

    var finalObj = AMD.require('different/export/object/ref/string');

    assert.equal(initialObj, 'string suprascris', 'update string should be locally');
    assert.equal(finalObj, 'ref/string', 'should keep reference string');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('number', function(assert){

    AMD.define('different/export/object/ref/number', ['exports'], function(exports){

        var result = 87;

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/number');

    initialObj = "number suprascris";

    var finalObj = AMD.require('different/export/object/ref/number');

    assert.equal(initialObj, 'number suprascris', 'update number should be locally');
    assert.equal(finalObj, 87, 'should keep reference number');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('array', function(assert){

    AMD.define('different/export/object/ref/array', ['exports'], function(exports){

        var result = ['ref/array'];

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/array');

    initialObj = ["array suprascris"];

    var finalObj = AMD.require('different/export/object/ref/array');

    assert.deepEqual(initialObj, ['array suprascris'], 'update array should be locally');
    assert.deepEqual(finalObj, ['ref/array'], 'should keep reference array');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('function', function(assert){

    AMD.define('different/export/object/ref/function', ['exports'], function(exports){

        var result = function(msg){return msg+'aaa';};

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/function');

    initialObj = function(msg){return msg+'bbb';};

    var finalObj = AMD.require('different/export/object/ref/function');

    assert.equal(initialObj('say '), 'say bbb', 'update function should be locally');
    assert.equal(finalObj('say '), 'say aaa', 'should keep reference function');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('date', function(assert){

    AMD.define('different/export/object/ref/date', ['exports'], function(exports){

        var result = new Date();

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/date');

    initialObj = "date suprascris";

    var finalObj = AMD.require('different/export/object/ref/date');

    assert.equal(initialObj, 'date suprascris', 'update date should be locally');
    assert.ok(finalObj instanceof Date, 'should keep reference date');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('regexp', function(assert){

    AMD.define('different/export/object/ref/regexp', ['exports'], function(exports){

        var result = new RegExp(/[abc]/g);

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/regexp');

    initialObj = "regexp suprascris";

    var finalObj = AMD.require('different/export/object/ref/regexp');

    assert.equal(initialObj, 'regexp suprascris', 'update regexp should be locally');
    assert.ok(finalObj instanceof RegExp, 'should keep reference regexp');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('undefined', function(assert){

    AMD.define('different/export/object/ref/undefined', ['exports'], function(exports){

        var result;

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/undefined');

    initialObj = "undefined suprascris";

    var finalObj = AMD.require('different/export/object/ref/undefined');

    assert.equal(initialObj, 'undefined suprascris', 'update undefined should be locally');
    assert.equal(finalObj, undefined, 'should keep reference undefined');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('null', function(assert){

    AMD.define('different/export/object/ref/null', ['exports'], function(exports){

        var result = null;

        exports["default"] = result;

    });

    var initialObj = AMD.require('different/export/object/ref/null');

    initialObj = "null suprascris";

    var finalObj = AMD.require('different/export/object/ref/null');

    assert.equal(initialObj, 'null suprascris', 'update null should be locally');
    assert.equal(finalObj, null, 'should keep reference null');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});