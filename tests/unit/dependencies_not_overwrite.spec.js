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