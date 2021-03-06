var NoteDispatcher = require('../dispatcher/NoteDispatcher'),
    NoteConstants = require('../constants/NoteConstants'),
    EventEmitter = require('events').EventEmitter,
    _ = require('lodash'),
    View = require('../models/View');

var ViewStore = _.extend({
  view: new View()
}, EventEmitter.prototype, {
  emitChange: function (type) {
    this.emit(type);
  },

  addChangeListener: function (callback, type) {
    this.on(type, callback);
  },

  removeChangeListener: function (callback, type) {
    this.removeListener(type, callback);
  },

  getView: function () {
    return this.view;
  },

  getData: function () {
    return this.view.getData();
  }
});

ViewStore.dispatchToken = NoteDispatcher.register(function (action) {
  var view = ViewStore.getView();

  switch (action.actionType) {
    case NoteConstants.ACTION.RENDER_START_POSITION:
      view.setStartRect(action.rect);
      ViewStore.emitChange(NoteConstants.EVENT.RENDER);
      break;
    case NoteConstants.ACTION.RENDER_END_POSITION:
      view.setEndRect(action.rect);
      ViewStore.emitChange(NoteConstants.EVENT.RENDER);
      break;
    case NoteConstants.ACTION.RENDER_COMPOSITION:
      view.setComposition(action.isComposition);
      ViewStore.emitChange(NoteConstants.EVENT.RENDER);
      break;
  }
});

module.exports = ViewStore;
