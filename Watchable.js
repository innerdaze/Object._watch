var Watchable = function (props) {

    return Object.create(props||{}, {
        __watchableWatchers: {
            configurable: false,
            value: {}
        },

        __watchableValues: {
            configurable: false,
            value: {}
        },

        __watchableNotify: {
            configurable: false,
            value: function (property, oldValue, newValue) {
                var ln, i = 0,
                    notifiers = this.__watchableWatchers[property];

                if ((ln = notifiers.length)) {
                    for (; i < ln; i++) {
                        notifiers[i](property, oldValue, newValue);
                    }
                }
            }
        },

        unwatch: {
            configurable: false,
            value: function(propertyName){
                this.__watchableWatchers[propertyName] = [];
            }
        },
        
        watch: {
            configurable: false,
            value: function (propertyName, callback, scope, targetObject) {
                
                var me  = this;
                
                if ((targetObject||me)[propertyName] != undefined) {
                    me.__watchableValues[propertyName] = (targetObject||me)[propertyName];
                }

                if (!me.__watchableWatchers[propertyName]) {

                    me.__watchableWatchers[propertyName] = [];

                    Object.defineProperty(targetObject||me, propertyName, {
                        set: function (value) {
                            me.__watchableNotify(propertyName, (targetObject||me)[propertyName], value);
                            me.__watchableValues[propertyName] = value;
                        },
                        get: function () {
                            return me.__watchableValues[propertyName];
                        }
                    });
                }

                me.__watchableWatchers[propertyName].push(callback.bind(me || scope));
            }
        }
    });
}
