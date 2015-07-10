QUnit.module('Module presence', config);

test('should throw error if module is not present', function(assert){

    assert.throws(
        function(){
            var result = AMD.require('some/missing/module/which/was/not/defined');
        },
        /Could not find module/,
        'module should be missing'
    );

});