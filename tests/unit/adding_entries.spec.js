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