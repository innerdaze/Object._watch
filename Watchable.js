var Watchable = function (props) {

    return Object.create(props, {
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

        watch: {
            configurable: false,
            value: function (propertyName, callback, scope) {

                if (this[propertyName] != undefined) {
                    this.__watchableValues[propertyName] = this[propertyName];
                }

                if (!this.watchers[propertyName]) {

                    this.watchers[propertyName] = [];

                    Object.defineProperty(this, propertyName, {
                        set: function (value) {
                            this.__watchableNotify(propertyName, this[propertyName], value);
                            this.__watchableValues[propertyName] = value;
                        },
                        get: function () {
                            return this.__watchableValues[propertyName];
                        }
                    });
                }

                this.__watchableWatchers[propertyName].push(callback.bind(this || scope));
            }
        }
    });
}
