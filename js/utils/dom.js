/*jshint node:true, browser: true*/

/**
 * utility functions for dom
 */

var _ = require('lodash');

/**
 * @param {Event} event
 * @return {Point}
 */
var pointFromEvent = function (event) {
  return {
    x: event.clientX,
    y: event.clientY
  };
};

/**
 * @param {Point}
 * @return {NativeRange}
 */
var caretPositionFromPoint = function (point) {
  // for Firefox
  if (document.caretPositionFromPoint) {
    var offsetPoint = document.caretPositionFromPoint(point.x, point.y);
    return {
      container: offsetPoint.offsetNode,
      offset: offsetPoint.offset
    };
  // for Webkit
  } else if (document.caretRangeFromPoint) {
    var range = document.caretRangeFromPoint(point.x, point.y);
    return {
      container: range.startContainer,
      offset: range.startOffset
    };
  }
  // for Old IE
};

/**
 * @param {Event} event
 * @return {BoundaryPoint}
 */
var boundaryPointFromEvent = function (event) {
  return caretPositionFromPoint(pointFromEvent(event));
};

/**
 * @param {BoundaryPoint} boundaryPoint
 * @return {Rect}
 */
var rectFromBoundaryPoint = function (boundaryPoint) {
  var container = boundaryPoint.container;
  var offset = boundaryPoint.offset;

  var textNode = container.firstChild;
  var textLength = textNode ? textNode.nodeValue.length : 0;
  var isLeftSide = textLength > offset;

  var rect;
  if (!textLength) {
    rect = container.getBoundingClientRect();
  } else {
    // TODO textRange for IE8, refactoring
    var range = document.createRange();
    if (isLeftSide) {
      range.setStart(textNode, offset);
      range.setEnd(textNode, offset + 1);
    } else {
      range.setStart(textNode, offset - 1);
      range.setEnd(textNode, offset);
    }
    rect = range.getBoundingClientRect();
  }

  return {
    left: isLeftSide ? rect.left : rect.right,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };
};

/**
 * @param {Object} styles
 * @return {String}
 */
var toCssText = function (styles) {
  return _.map(styles, function (value, key) {
    return key + ':' + (_.isNumber(value) ? value + 'px' : value);
  }).join(';');
};

module.exports = {
  pointFromEvent: pointFromEvent,
  boundaryPointFromEvent: boundaryPointFromEvent,
  rectFromBoundaryPoint: rectFromBoundaryPoint,
  toCssText: toCssText
};
