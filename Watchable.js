/**
 *  Object._watch - Property change watching with ECMAScript 5. Boom.
 *  Copyright (C) 2013  Lee Driscoll
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.

 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.

 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * @param {Object} props Members to initialize the object with.
 * @constructor
 */

try{ Object.defineProperty({}, 'x', {}) } catch (e){
    console.warn("Error: You're using a weak browser that doesn't support Object.defineProperty. Write your own workaround.");
}

var Watchable = function (props) {

    return Object.create(props || {}, {

        /**
         * @private
         * @readonly
         */
        __watchableWatchers: {
            configurable: false,
            value: {}
        },

        /**
         * @private
         * @readonly
         */
        __watchableValues: {
            configurable: false,
            value: {}
        },

        /**
         * @private
         * @readonly
         *
         * Execute callbacks for property change "event"
         *
         * @param {String} property The property's key
         * @param {String} oldValue The previous value
         * @param {String} newValue The new value
         */
        __watchableNotify: {
            configurable: false,
            value: function (property, oldValue, newValue, targetObject) {
                var notifiers = this.__watchableWatchers[property],
                    i = 0,
                    ln;

                    if(targetObject){
                    notifiers = this.__watchableWatchers.targetObject[property];
                }

                if ((ln = ln = notifiers.length)) {
                    for (; i < ln; i++) {
                        notifiers[i](property, oldValue, newValue);
                    }
                }
            }
        },

        /**
         * @readonly
         *
         * Remove all watchers for #propertyName
         *
         * @param {String} propertyName The property to stop watching
         */
        _unwatch: {
            configurable: false,
            value: function(propertyName){
                this.__watchableWatchers[propertyName] = [];
            }
        },

        /**
         * @readonly
         *
         * Set a callback to be fired whenever #propertyName is changed.
         * A foreign object can be watched by setting #targetObject.
         *
         * @param {String} propertyName The property to watch for change
         * @param {Function} callback
         *  The callback to execute whenever #propertyName is changed.
         *  For list of arguments see {@link #__watchableNotify}.
         * @param {Object} [scope=null] The execution scope for the callback
         * @param {Object} [targetObject] The foreign object to watch
         */
        _watch: {
            configurable: false,
            value: function (propertyName, callback, scope, targetObject) {
                var watcherRoot = this.__watchableWatchers,
                    valueRoot = this.__watchableValues,
                    me  = this;

                if ((targetObject || this)[propertyName] != undefined) {
                    valueRoot;

                    if(targetObject){
                        if(!this.__watchableValues.targetObject){
                            this.__watchableValues.targetObject = [];
                        }
                        valueRoot = this.__watchableValues.targetObject;

                        if(!this.__watchableWatchers.targetObject){
                            this.__watchableWatchers.targetObject = [];
                        }
                        watcherRoot = this.__watchableWatchers.targetObject;
                    }

                    valueRoot[propertyName] = (targetObject || this)[propertyName];
                }

                if (!watcherRoot[propertyName]) {

                    watcherRoot[propertyName] = [];

                    Object.defineProperty(targetObject || this, propertyName, {
                        set: function (value) {
                            me.__watchableNotify(propertyName, (targetObject || me)[propertyName], value, targetObject);
                            valueRoot[propertyName] = value;
                        },
                        get: function () {
                            return valueRoot[propertyName];
                        }
                    });
                }

                watcherRoot[propertyName].push(callback.bind(me || scope || null));
            }
        }
    });
};
