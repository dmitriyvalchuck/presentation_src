// Imagined privacy.
var ImaginedClass1 = function (a, b) {
    this._a = a;
    this._b = b;
};
var ic1 = new ImaginedClass1(3, 5); // jshint ignore:line
var ImaginedClass2 = function (a, b) {
    this._ = {
        "a": a,
        "b": b
    };
};
var ic2 = new ImaginedClass2(3, 5); // jshint ignore:line


// Private static methods.
(function () {
    var StaticClass = function (a, b) {
        this._a = a;
        this._b = b;
    };
    StaticClass.prototype.sum = function () {
        return add(this._a, this._b);
    };
    var add = function (a, b) {
        return a + b;
    };

    var a = new StaticClass(5, 3);
    console.log(a);
}());


// Real private properties and methods.
var RealPrivateClass = function (a, b) {
    this.sum = function () {
        return internalCalcSum();
    };
    var internalCalcSum = function () {
        return a + b;
    };
};
var rpc = new RealPrivateClass(3, 5); // jshint ignore:line


// Just dont.
/** @constructor */
var SimpleClass = function (a, b) {
    this.a = a;
    this.b = b;
};
SimpleClass.prototype = {
    /**
     * @returns {number} Sum of a and b
     */
    sum: function () {
        return this.a + this.b;
    }
};