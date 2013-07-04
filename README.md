Object.watch
============

Object.watch implementation using ECMAScript 5


Object.watch is a provided method in Gekko and it's awesome.

But why not spread the love?

If your browser supports Object.defineProperty (it definitely should) then you can have Object.watch too =]

##How to Use

```
var w = new Watchable({a: 1});

print( w.a ); // prints 1;

w.watch('a', function(property, oldValue, newValue){
    print('Property: ' + property + ', Old: ' + oldValue + ', New: ' + newValue);
});

w.a = 'test'; // prints Property: a, Old: 1, New: 'test'

w.unwatch('a');

w.a = 'test2'; // returns 'test2'

```


