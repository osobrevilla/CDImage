/* !JavaScript Image Downloader (Cancelable)
 * Copyright 2013 Oscar Sobrevilla (oscar.sobrevilla@gmail.com)
 * Released under the MIT and GPL licenses.
 * version 0.1 beta
 */

'use strict';

var ImageDownloader = (function (win) {
  
  var garbage = null,
    _abort = function (iframe) {
      var cw = iframe.contentWindow;
      garbage = garbage || win.document.createElement('div');
      if(cw.stop) {
        cw.stop();
      } else {
        cw = iframe.contentDocument;
        cw.execCommand && cw.execCommand('Stop', false);
      }
      iframe && iframe.parentNode.removeChild(iframe);
      garbage.appendChild(iframe);
      garbage.innerHTML = '';
      iframe = null;
    };
  return {
    /**
     * Begin download image.
     * @param src {String} 
     * @param callback {Function}
     * - return object 
     *    - image:HTMLImageElement
     *    - abort: function 
     */
    'load': function (src, callback) {
      var iframe = win.document.createElement('iframe'),
        img = new win.Image(),
        doc;
      iframe.style.display = 'none';
      iframe.setAttribute('src', 'about:blank');
      iframe.onload = function () {
        doc = iframe.contentDocument || iframe.contentWindow.document;
        img.onload = function () {
          callback && callback.call(this, this);
          this.onload = null;
          _abort(iframe);
        };
        doc.body.appendChild(img);
        img.src = src;
      };
      win.document.body.appendChild(iframe);
      return {
        'image': img,
        'abort': function () {
          iframe && _abort(iframe);
          return img;
        }
      };
    }
  };
}(window));