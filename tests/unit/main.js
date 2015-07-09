// WIP:
// - instance of an custom object
// - closures
// - dots and slashes in name - test relative paths -> SHOULD NOT BE ACCEPTED - or make a config object where you can choose if you want relative paths or not
// - Could not find module

var config = {
  afterEach: function() {
        AMD.destroy();
  }
};
var test = QUnit.test;



QUnit.module('Adding entries', config);

test('should add an entry with a basic function', function(assert){

    AMD.define('adunare', ['exports'], function(exports){

        var adunare = function adunare(x, y) {return x + y;};

        exports["default"] = adunare;

    });

    var adunare = AMD.require('adunare');

    assert.equal(adunare(1,2), 3, 'adunare(1, 2) should equal 3');
    ok(AMD.getRegistry().adunare, 'basic adunare should exist on registry');
    assert.deepEqual(AMD.getRegistry().adunare.deps, ['exports'], 'adunare deps should be saved correctly');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should add multiple entries', function(assert){

    AMD.define('adunare', ['exports'], function(exports){

        var adunare = function adunare(x, y) {return x + y;};

        exports["default"] = adunare;

    });

    AMD.define('scadere', ['exports'], function(exports){

        var scadere = function scadere(x, y) {
         return x - y;
        };

        exports["default"] = scadere;

    });

    AMD.define('number', ['exports'], function(exports){

        var result = 47;

        exports["default"] = result;

    });


    var adunare = AMD.require('adunare');
    var scadere = AMD.require('scadere');
    var number = AMD.require('number');

    assert.equal(adunare(1,2), 3, 'adunare(1, 2) should equal 3');
    ok(AMD.getRegistry().adunare, 'multiple adunare should exist on registry');
    assert.deepEqual(AMD.getRegistry().adunare.deps, ['exports'], 'adunare deps should be saved correctly');

    assert.equal(scadere(10,2), 8, 'scadere(10, 2) should equal 8');
    ok(AMD.getRegistry().scadere, 'scadere should exist on registry');
    assert.deepEqual(AMD.getRegistry().scadere.deps, ['exports'], 'scadere deps should be saved correctly');

    assert.equal(number, 47, 'primitive value is saved correctly');
    ok(AMD.getRegistry().number, 'primitive value should exist on registry');
    assert.deepEqual(AMD.getRegistry().number.deps, ['exports'], 'scadere deps should be saved correctly');

    assert.equal(AMD.getLength(), 3, 'registry length should be 3');

});

test('should not add duplicated module names', function(assert){

    AMD.define('scadere', ['exports'], function(exports){

        var scadere = function scadere(x, y) {
            return x - y;
        };

        exports["default"] = scadere;

    });

    assert.throws(
        function(){
            AMD.define('scadere', function(){});
        },
        /duplicatedModule/,
        'should throw on duplicated Module name'
    );

});



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



QUnit.module('instances of objects', config);



QUnit.module('Dependencies', config);

test('should work without dependencies', function(assert){

    AMD.define('app', ['exports'], function(exports){

        var result = 'hello';

        exports["default"] = result;

    });

    var result = AMD.require('app');

    assert.equal(result, 'hello', 'get correctly the required without dependencies');
    assert.equal(AMD.getLength(), 1, 'registry length should be 1');

});

test('should get 5 dependencies', function(assert){

    AMD.define('app', ['exports', 'some/dep/1', 'some/dep/2', 'some/dep/3', 'some/dep/4', 'some/dep/5'], function(exports, dep1, dep2, dep3, dep4, dep5){

        var aDep = dep1['default'];
        var bDep = dep2['default'];
        var cDep = dep3['default'];
        var dDep = dep4['default'];
        var eDep = dep5['default'];

        var result = aDep + ' ' + bDep + ' ' + cDep + ' ' + dDep + ' ' + eDep;

        exports["default"] = result;

    });

    AMD.define('some/dep/1', ['exports'], function(exports){

        var result = 'a';

        exports["default"] = result;

    });

    AMD.define('some/dep/2', ['exports'], function(exports){

        var result = 'b';

        exports["default"] = result;

    });

    AMD.define('some/dep/3', ['exports'], function(exports){

        var result = 'c';

        exports["default"] = result;

    });

    AMD.define('some/dep/4', ['exports'], function(exports){

        var result = 'd';

        exports["default"] = result;

    });

    AMD.define('some/dep/5', ['exports'], function(exports){

        var result = 'e';

        exports["default"] = result;

    });

    var result = AMD.require('app');

    assert.equal(result, 'a b c d e', 'get correctly 5 dependencies');
    assert.equal(AMD.getLength(), 6, 'registry length should be 6');

});


QUnit.module('Dependencies: should get the correct dependencies as', config);

test('strings', function(assert){

    AMD.define('app', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = aDep + ' ' + bDep;

        exports["default"] = result;

    });

    AMD.define('some/dep/1', ['exports'], function(exports){

        var result = 'a';

        exports["default"] = result;

    });

    AMD.define('some/dep/2', ['exports'], function(exports){

        var result = 'b';

        exports["default"] = result;

    });

    var result = AMD.require('app');

    assert.equal(result, 'a b', 'get correctly 2 dependencies');
    assert.equal(AMD.getLength(), 3, 'registry length should be 3');

});

test('arrays', function(assert){

    AMD.define('app', ['exports', 'some/dep/3', 'some/dep/4'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/3', ['exports'], function(exports){

        var result = ['a', 2, 'c'];

        exports["default"] = result;

    });

    AMD.define('some/dep/4', ['exports'], function(exports){

        var result = ['b', 3, 'd'];

        exports["default"] = result;

    });

    var result = AMD.require('app');

    assert.deepEqual(result.first, ['a', 2, 'c'], 'get correctly first array dependency');
    assert.deepEqual(result.second, ['b', 3, 'd'], 'get correctly second array dependency');
    assert.equal(AMD.getLength(), 3, 'registry length should be 3');

});

test('numbers', function(assert){

    AMD.define('app', ['exports', 'some/dep/as/number/5', 'some/dep/as/number/6'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/as/number/5', ['exports'], function(exports){

        var result = 5;

        exports["default"] = result;

    });

    AMD.define('some/dep/as/number/6', ['exports'], function(exports){

        var result = 6;

        exports["default"] = result;

    });

    var result = AMD.require('app');

    assert.deepEqual(result.first, 5, 'get correctly first number dependency');
    assert.deepEqual(result.second, 6, 'get correctly second number dependency');
    assert.equal(AMD.getLength(), 3, 'registry length should be 3');

});

test('deep plain objects', function(assert){

    AMD.define('app', ['exports', 'some/dep/as/deep/plain/objects/5', 'some/dep/as/deep/plain/objects/6'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/as/deep/plain/objects/5', ['exports'], function(exports){

        var result = {a:{c:5,d:'6'},b:34};

        exports["default"] = result;

    });

    AMD.define('some/dep/as/deep/plain/objects/6', ['exports'], function(exports){

        var result = {a:{c:6,d:'7'},b:35};

        exports["default"] = result;

    });

    var result = AMD.require('app');

    assert.deepEqual(result.first, {a:{c:5,d:'6'},b:34}, 'get correctly first deep plain object dependency');
    assert.deepEqual(result.second,  {a:{c:6,d:'7'},b:35}, 'get correctly second deep plain object dependency');
    assert.equal(AMD.getLength(), 3, 'registry length should be 3');

});

test('functions', function(assert){

    AMD.define('app', ['exports', 'some/dep/as/function/5', 'some/dep/as/function/6'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/as/function/5', ['exports'], function(exports){

        var result =function(msg){return msg+' aaa';};

        exports["default"] = result;

    });

    AMD.define('some/dep/as/function/6', ['exports'], function(exports){

        var result = function(msg){return msg+' bbb';};

        exports["default"] = result;

    });

    var result = AMD.require('app');

    assert.deepEqual(result.first('hello'), 'hello aaa', 'get correctly first function dependency');
    assert.deepEqual(result.second('halo'), 'halo bbb', 'get correctly second function dependency');
    assert.equal(AMD.getLength(), 3, 'registry length should be 3');

});

test('dates', function(assert){

    AMD.define('app', ['exports', 'some/dep/as/date/5', 'some/dep/as/date/6'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/as/date/5', ['exports'], function(exports){

        var result = new Date();

        exports["default"] = result;

    });

    AMD.define('some/dep/as/date/6', ['exports'], function(exports){

        var result = new Date();

        exports["default"] = result;

    });

    var result = AMD.require('app');

    assert.ok(result.first instanceof Date, 'get correctly first date dependency');
    assert.ok(result.second instanceof Date, 'get correctly second date dependency');
    assert.equal(AMD.getLength(), 3, 'registry length should be 3');

});

test('regexes', function(assert){

    AMD.define('app', ['exports', 'some/dep/as/regex/5', 'some/dep/as/regex/6'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/as/regex/5', ['exports'], function(exports){

        var result = new RegExp(/[abc]/g);

        exports["default"] = result;

    });

    AMD.define('some/dep/as/regex/6', ['exports'], function(exports){

        var result = new RegExp(/[cde]/g);

        exports["default"] = result;

    });

    var result = AMD.require('app');

    assert.ok(result.first instanceof RegExp, 'get correctly first regex dependency');
    assert.ok(result.second instanceof RegExp, 'get correctly second regex dependency');
    assert.equal(AMD.getLength(), 3, 'registry length should be 3');

});

test('undefined', function(assert){

    AMD.define('app', ['exports', 'some/dep/as/undefined/5', 'some/dep/as/undefined/6'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/as/undefined/5', ['exports'], function(exports){

        var result = undefined;

        exports["default"] = result;

    });

    AMD.define('some/dep/as/undefined/6', ['exports'], function(exports){

        var result = undefined;

        exports["default"] = result;

    });

    var result = AMD.require('app');

    assert.deepEqual(result.first, undefined, 'get correctly first undefined dependency');
    assert.deepEqual(result.second, undefined, 'get correctly second undefined dependency');
    assert.equal(AMD.getLength(), 3, 'registry length should be 3');

});

test('null', function(assert){

    AMD.define('app', ['exports', 'some/dep/as/null/5', 'some/dep/as/null/6'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/as/null/5', ['exports'], function(exports){

        var result = null;

        exports["default"] = result;

    });

    AMD.define('some/dep/as/null/6', ['exports'], function(exports){

        var result = null;

        exports["default"] = result;

    });

    var result = AMD.require('app');

    assert.deepEqual(result.first, null, 'get correctly first null dependency');
    assert.deepEqual(result.second, null, 'get correctly second null dependency');
    assert.equal(AMD.getLength(), 3, 'registry length should be 3');

});

QUnit.module('Dependencies: should NOT update dependencies as ', config);

test('strings', function(assert){

    AMD.define('app', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        aDep = 'c';
        bDep = 'd';
        var result = aDep + ' ' + bDep;

        exports["default"] = result;

    });

    AMD.define('newapp', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = aDep + ' ' + bDep;

        exports["default"] = result;

    });

    AMD.define('some/dep/1', ['exports'], function(exports){

        var result = 'a';

        exports["default"] = result;

    });

    AMD.define('some/dep/2', ['exports'], function(exports){

        var result = 'b';

        exports["default"] = result;

    });

    var result = AMD.require('app');
    var newresult = AMD.require('newapp');

    assert.equal(result, 'c d', 'get first value with overwritten dependencies');
    assert.equal(newresult, 'a b', 'get initial value with dependencies');
    assert.equal(AMD.getLength(), 4, 'registry length should be 4');

});

test('arrays', function(assert){

    AMD.define('app', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        aDep = 'c';
        bDep = 'd';
        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('newapp', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/1', ['exports'], function(exports){

        var result = ['a', 2, 'c'];

        exports["default"] = result;

    });

    AMD.define('some/dep/2', ['exports'], function(exports){

        var result = ['b', 3, 'd'];

        exports["default"] = result;

    });

    var result = AMD.require('app');
    var newresult = AMD.require('newapp');

    assert.equal(result.first, 'c', 'get initial value with dependencies');
    assert.equal(result.second, 'd', 'get initial value with dependencies');
    assert.deepEqual(newresult.first, ['a', 2, 'c'], 'get correctly first array dependency');
    assert.deepEqual(newresult.second, ['b', 3, 'd'], 'get correctly second array dependency');
    assert.equal(AMD.getLength(), 4, 'registry length should be 4');

});

test('numbers', function(assert){

    AMD.define('app', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        aDep = 'c';
        bDep = 'd';
        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('newapp', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/1', ['exports'], function(exports){

        var result = 6;

        exports["default"] = result;

    });

    AMD.define('some/dep/2', ['exports'], function(exports){

        var result = 7;

        exports["default"] = result;

    });

    var result = AMD.require('app');
    var newresult = AMD.require('newapp');

    assert.equal(result.first, 'c', 'get initial value with dependencies');
    assert.equal(result.second, 'd', 'get initial value with dependencies');
    assert.deepEqual(newresult.first, 6, 'get correctly first numbers dependency');
    assert.deepEqual(newresult.second, 7, 'get correctly second numbers dependency');
    assert.equal(AMD.getLength(), 4, 'registry length should be 4');

});

test('deep plain objects', function(assert){

    AMD.define('app', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        aDep = 'c';
        bDep = 'd';
        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('newapp', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/1', ['exports'], function(exports){

        var result = {a:{c:5,d:'6'},b:34};

        exports["default"] = result;

    });

    AMD.define('some/dep/2', ['exports'], function(exports){

        var result = {a:{c:6,d:'7'},b:35};

        exports["default"] = result;

    });

    var result = AMD.require('app');
    var newresult = AMD.require('newapp');

    assert.equal(result.first, 'c', 'get initial value with dependencies');
    assert.equal(result.second, 'd', 'get initial value with dependencies');
    assert.deepEqual(newresult.first, {a:{c:5,d:'6'},b:34}, 'get correctly first deep plain objects dependency');
    assert.deepEqual(newresult.second, {a:{c:6,d:'7'},b:35}, 'get correctly second deep plain objects dependency');
    assert.equal(AMD.getLength(), 4, 'registry length should be 4');

});

test('functions', function(assert){

    AMD.define('app', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        aDep = 'c';
        bDep = 'd';
        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('newapp', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/1', ['exports'], function(exports){

        var result = function(msg){return msg+' aaa';};

        exports["default"] = result;

    });

    AMD.define('some/dep/2', ['exports'], function(exports){

        var result = function(msg){return msg+' bbb';};

        exports["default"] = result;

    });

    var result = AMD.require('app');
    var newresult = AMD.require('newapp');

    assert.equal(result.first, 'c', 'get initial value with dependencies');
    assert.equal(result.second, 'd', 'get initial value with dependencies');
    assert.deepEqual(newresult.first('hello'), 'hello aaa', 'get correctly first numbers dependency');
    assert.deepEqual(newresult.second('halo'), 'halo bbb', 'get correctly second numbers dependency');
    assert.equal(AMD.getLength(), 4, 'registry length should be 4');

});

test('dates', function(assert){

    AMD.define('app', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        aDep = 'c';
        bDep = 'd';
        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('newapp', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/1', ['exports'], function(exports){

        var result = new Date();

        exports["default"] = result;

    });

    AMD.define('some/dep/2', ['exports'], function(exports){

        var result = new Date();

        exports["default"] = result;

    });

    var result = AMD.require('app');
    var newresult = AMD.require('newapp');

    assert.equal(result.first, 'c', 'get initial value with dependencies');
    assert.equal(result.second, 'd', 'get initial value with dependencies');
    assert.ok(newresult.first instanceof Date, 'get correctly first dates dependency');
    assert.ok(newresult.second instanceof Date, 'get correctly second dates dependency');
    assert.equal(AMD.getLength(), 4, 'registry length should be 4');

});

test('regexes', function(assert){

    AMD.define('app', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        aDep = 'c';
        bDep = 'd';
        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('newapp', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/1', ['exports'], function(exports){

        var result = new RegExp(/[abc]/g);

        exports["default"] = result;

    });

    AMD.define('some/dep/2', ['exports'], function(exports){

        var result =new RegExp(/[hgf]/g);

        exports["default"] = result;

    });

    var result = AMD.require('app');
    var newresult = AMD.require('newapp');

    assert.equal(result.first, 'c', 'get initial value with dependencies');
    assert.equal(result.second, 'd', 'get initial value with dependencies');
    assert.ok(newresult.first instanceof RegExp, 'get correctly first numbers dependency');
    assert.ok(newresult.second instanceof RegExp, 'get correctly second numbers dependency');
    assert.equal(AMD.getLength(), 4, 'registry length should be 4');

});

test('undefined', function(assert){

    AMD.define('app', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        aDep = 'c';
        bDep = 'd';
        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('newapp', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/1', ['exports'], function(exports){

        var result = undefined;

        exports["default"] = result;

    });

    AMD.define('some/dep/2', ['exports'], function(exports){

        var result = undefined;

        exports["default"] = result;

    });

    var result = AMD.require('app');
    var newresult = AMD.require('newapp');

    assert.equal(result.first, 'c', 'get initial value with dependencies');
    assert.equal(result.second, 'd', 'get initial value with dependencies');
    assert.deepEqual(newresult.first, undefined, 'get correctly first undefined dependency');
    assert.deepEqual(newresult.second, undefined, 'get correctly second undefined dependency');
    assert.equal(AMD.getLength(), 4, 'registry length should be 4');

});

test('null', function(assert){

    AMD.define('app', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        aDep = 'c';
        bDep = 'd';
        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('newapp', ['exports', 'some/dep/1', 'some/dep/2'], function(exports, dep1, dep2){

        var aDep = dep1['default'];
        var bDep = dep2['default'];

        var result = {
            first:aDep,
            second:bDep
        };

        exports["default"] = result;

    });

    AMD.define('some/dep/1', ['exports'], function(exports){

        var result = null;

        exports["default"] = result;

    });

    AMD.define('some/dep/2', ['exports'], function(exports){

        var result = null;

        exports["default"] = result;

    });

    var result = AMD.require('app');
    var newresult = AMD.require('newapp');

    assert.equal(result.first, 'c', 'get initial value with dependencies');
    assert.equal(result.second, 'd', 'get initial value with dependencies');
    assert.deepEqual(newresult.first, null, 'get correctly first null dependency');
    assert.deepEqual(newresult.second, null, 'get correctly second null dependency');
    assert.equal(AMD.getLength(), 4, 'registry length should be 4');

});