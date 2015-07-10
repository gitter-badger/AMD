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