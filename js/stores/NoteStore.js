var NoteDispatcher = require('../dispatcher/NoteDispatcher'),
    NoteConstants = require('../constants/NoteConstants'),
    EventEmitter = require('events').EventEmitter,
    _ = require('lodash'),
    Editor = require('../models/Editor'),
    mockData = require('../mockData');

var NoteStore = _.extend({
  editor: new Editor(mockData)
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

  getEditor: function () {
    return this.editor;
  }
});

NoteStore.dispatchToken = NoteDispatcher.register(function (action) {
  var editor = NoteStore.getEditor();

  switch (action.actionType) {
    case NoteConstants.ACTION.SELECT_START:
      editor.selectStart(action.offset);
      NoteStore.emitChange(NoteConstants.EVENT.DOCUMENT);
      break;
    case NoteConstants.ACTION.SELECT_END:
      editor.selectEnd(action.offset);
      NoteStore.emitChange(NoteConstants.EVENT.DOCUMENT);
      break;
    case NoteConstants.ACTION.MOVE_LEFT:
      editor.moveLeft();
      NoteStore.emitChange(NoteConstants.EVENT.DOCUMENT);
      break;
    case NoteConstants.ACTION.MOVE_RIGHT:
      editor.moveRight();
      NoteStore.emitChange(NoteConstants.EVENT.DOCUMENT);
      break;
    case NoteConstants.ACTION.INSERT_TEXT:
      editor.insertText(action.text);
      NoteStore.emitChange(NoteConstants.EVENT.DOCUMENT);
      break;
    case NoteConstants.ACTION.UPDATE_TEXT:
      editor.updateText(action.text);
      NoteStore.emitChange(NoteConstants.EVENT.DOCUMENT);
      break;
    case NoteConstants.ACTION.INSERT_PARAGRAPH:
      editor.insertParagraph();
      NoteStore.emitChange(NoteConstants.EVENT.DOCUMENT);
      break;
    case NoteConstants.ACTION.BACKSPACE:
      editor.backspace();
      NoteStore.emitChange(NoteConstants.EVENT.DOCUMENT);
      break;
  }
});

module.exports = NoteStore;
