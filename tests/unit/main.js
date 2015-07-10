// WIP:
// - make AMD as a class, instead of a singleton


var config = {
  afterEach: function() {
        AMD.reset();
  }
};

var test = QUnit.test;