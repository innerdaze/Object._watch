Object._watch
============

Object property watching using ECMAScript 5


Object.prototype.watch is a provided method in Gekko and it's awesome.

But why not spread the love?

If your browser supports Object.defineProperty (it definitely should) then you can have Object.watch too =]

_Will not work in IE8 or lower._

Currently minifies to 1.157kb


##How to Use

###Local Watching
```
var w = new Watchable({a: 1});

console.log( w.a ); // Logs: 1

w._watch('a', function(property, oldValue, newValue){
    console.log(property, oldValue, newValue);
});

w.a = 'test'; // Logs: a 1 'test' / Returns: 'test'

w._unwatch('a');

w.a = 'test2'; // Returns: 'test2'

```

###Remote Watching
```
var o = {x: 1};

var w = new Watchable();

w._watch('x', function(property, oldValue, newValue){
    console.log(property, oldValue, newValue);
}, null, o); // Note the 4th parameter

o.x = 2; // Logs: x 1 2 / Returns: 2
```
