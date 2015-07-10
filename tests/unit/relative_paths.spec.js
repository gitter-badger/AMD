
QUnit.module('Relative paths', config);

test('should accept relative paths on current directory', function(assert){

    AMD.define('package/parinte', ['exports', './childs/first'], function(exports, dep1){

        var parinte = dep1['default'];

        exports["default"] = parinte;

    });

    AMD.define('package/childs/first', ['exports'], function(exports){

        var firstChild = 'a';

        exports["default"] = firstChild;

    });

    var result = AMD.require('package/parinte');

    assert.deepEqual(result, 'a', 'get correctly the dependency with relativePath in current directory');

});

test('should accept relative paths on parent directory', function(assert){

    AMD.define('package/parinte', ['exports', '../childs/first'], function(exports, dep1){

        var parinte = dep1['default'];

        exports["default"] = parinte;

    });

    AMD.define('childs/first', ['exports'], function(exports){

        var firstChild = 'a';

        exports["default"] = firstChild;

    });

    var result = AMD.require('package/parinte');

    assert.deepEqual(result, 'a', 'get correctly the dependency with relativePath in current directory');

});

test('should not accept relative paths based on current directory', function(assert){

    AMD.setConfig('relativePaths', false);

    AMD.define('package/parinte', ['exports', './childs/first'], function(exports, dep1){

        var parinte = dep1['default'];

        exports["default"] = parinte;

    });

    AMD.define('package/parinte/childs/first', ['exports'], function(exports){

        var firstChild = 'a';

        exports["default"] = firstChild;

    });

    assert.throws(
        function(){
            var result = AMD.require('package/parinte');
        },
        /Relative paths are not allowed/,
        'should throw when relative paths are not allowed'
    );

});

test('should not accept relative paths based on parent directory', function(assert){

    AMD.setConfig('relativePaths', false);

    AMD.define('package/parinte', ['exports', '../childs/first'], function(exports, dep1){

        var parinte = dep1['default'];

        exports["default"] = parinte;

    });

    AMD.define('package/childs/first', ['exports'], function(exports){

        var firstChild = 'a';

        exports["default"] = firstChild;

    });

    assert.throws(
        function(){
            var result = AMD.require('package/parinte');
        },
        /Relative paths are not allowed/,
        'should throw when relative paths are not allowed'
    );

});