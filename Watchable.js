/**
 *  Object.watch - Property change watching with ECMAScript 5. Boom.
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
};
