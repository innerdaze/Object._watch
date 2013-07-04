/**
 * Created with JetBrains PhpStorm.
 * User: Lee
 * Date: 04/07/13
 * Time: 20:45
 * To change this template use File | Settings | File Templates.
 */
(function(){

    console.log('Tests should complete in a numbered sequence.');

    var watchable = new Watchable({a: 1});

    var callbackTag;

    // Local Watching
    var defaultWatchCallback = function(propertyName, oldValue, newValue){
        console.log(callbackTag, ' || Property: ', propertyName, ' | Old Value: ', oldValue, ' | New Value: ', newValue);
    };

    watchable._watch('a', defaultWatchCallback);

    callbackTag = '1. LOCAL WATCH';

    watchable.a = 2;

    // Remote Watching

    var foreignObject = {x: 5}; // Foreign Object

    watchable._watch('x', defaultWatchCallback, null, foreignObject);

    callbackTag = '2. REMOTE WATCH';

    foreignObject.x = 10;

    // Testing object sand-boxing

    foreignObject.a = '';

    watchable._watch('a', defaultWatchCallback, null, foreignObject);

    callbackTag = '3. SAND-BOXED WATCH';

    foreignObject.a = 'foreign';
})();