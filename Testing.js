/**
 * Created with JetBrains PhpStorm.
 * User: Lee
 * Date: 04/07/13
 * Time: 20:45
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var w = new Watchable({a: 1});

    var callbackTag;

    // Local Watching
    var defaultWatchCallback = function(propertyName, oldValue, newValue){
        console.log(callbackTag, ' || Property: ', propertyName, ' | Old Value: ', oldValue, ' | New Value: ', newValue);
    };

    w._watch('a', defaultWatchCallback);

    callbackTag = 'LOCAL WATCH';

    w.a = 2;

    // Remote Watching

    var o = {x: 5}; // Foreign Object

    w._watch('x', defaultWatchCallback, null, o);

    callbackTag = 'REMOTE WATCH';

    o.x = 10;
})();