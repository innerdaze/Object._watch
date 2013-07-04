var Watchable = function (props) {

    return Object.create(props, {
        watchers: {
            configurable: false,
            value: {}
        },

        values: {
            configurable: false,
            value: {}
        },

        notify: {
            configurable: false,
            value: function (property, oldValue, newValue) {
                var ln, i = 0,
                    notifiers = this.watchers[property];

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
                    this.values[propertyName] = this[propertyName];
                }

                if (!this.watchers[propertyName]) {

                    this.watchers[propertyName] = [];

                    Object.defineProperty(this, propertyName, {
                        set: function (value) {
                            this.notify(propertyName, this[propertyName], value);
                            this.values[propertyName] = value;
                        },
                        get: function () {
                            return this.values[propertyName];
                        }
                    });
                }

                this.watchers[propertyName].push(callback.bind(this || scope));
            }
        }
    });
}
