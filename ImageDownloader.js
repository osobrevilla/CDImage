/* !JavaScript Image Downloader (Cancelable)
 * Copyright 2013 Oscar Sobrevilla (oscar.sobrevilla@gmail.com)
 * Released under the MIT and GPL licenses.
 * version 0.1.8 beta
 */
var ImageDownloader = (function (win, doc, undefined) {
  var _stopAndRemove = function (iframe) {
    if (!iframe) return null;
    try {
      var cw = iframe.contentWindow;
      if (cw.stop) {
        cw.stop();
      } else {
        cw = iframe.contentDocument;
        cw.execCommand && cw.execCommand('Stop', false);
      }
      iframe.parentNode.removeChild(iframe);
      return true;
    } catch (e) {
      throw e.toString();
      return false;
    }
  };
  return {
    /**
     * Begin download image.
     * @param src {String} 
     * @param callback {Function}
     * - return object 
     *    - abort: {function}
     *      - return {String} src
     */
    'load': function (src, callback) {
        var idoc, 
        iframe = win.document.createElement('iframe'),
        _abort = function () {
          var res = _stopAndRemove(iframe);
          if (res) iframe = null;
          idoc = null;
          return res === true ? src : res;
        };
      iframe.style.display = 'none';
      // iframe.setAttribute('src', 'about:blank');
      doc.body.appendChild(iframe);
      idoc = iframe.contentDocument || iframe.contentWindow.document;
      idoc.open();
      iframe.onload = function () {
        this.onload = null;
        var img = new win.Image();
        img.onload = function () {
          this.onload = null;
          _abort(iframe);
          callback && callback(src);
        };
        idoc.body.appendChild(img);
        img.src = src;
      };
      idoc.close();
      return {
        'abort': _abort
      };
    }
  };

}(window, window.document));