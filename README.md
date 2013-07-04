Object.watch
============

Object.watch implementation using ECMAScript 5


Object.watch is a provided method in Gekko and it's awesome.

But why not spread the love?

If your browser supports Object.defineProperty (it definitely should) then you can have Object.watch too =]

##How to Use

```
var w = new Watchable({a: 1});

print( w.a ); // returns 1;

w.watch('a', function(property, oldValue, newValue){
    print(property + ' ' + oldValue + ' ' + newValue);
});

w.a = 'test'; // returns a 1 'test
```

Current implentation can't "unwatch" stuff. I'm working on that.
