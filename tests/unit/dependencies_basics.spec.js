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