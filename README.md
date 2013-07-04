Object.watch
============

Object property watching using ECMAScript 5


Object.watch is a provided method in Gekko and it's awesome.

But why not spread the love?

If your browser supports Object.defineProperty (it definitely should) then you can have Object.watch too =]

Will not work in IE8.

##How to Use

###Local Watching
```
var w = new Watchable({a: 1});

print( w.a ); // prints 1;

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
