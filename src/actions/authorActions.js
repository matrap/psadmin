"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var Authorapi = require('../api/authorApi');
var ActionTypes = require('../constans/actionTypes');

var AuthorActions = {
    createAuthor: function(author) {
        var newAuthor = Authorapi.saveAuthor(author);

        // Hey Dispatcher, go tell all the stores that an author was just created.
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_AUTHOR,
            author: newAuthor
        });
    }
};

mnodule.exports = AuthorActions;