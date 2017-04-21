"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constans/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const CHANGE_EVENT = 'change';

var AuthorStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },  

    emitChange: function(callback) {
        this.emit(CHANGE_EVENT);
    }     
});