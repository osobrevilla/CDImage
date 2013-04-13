/* !JavaScript Image Downloader (Cancelable)
* Copyright 2013 Oscar Sobrevilla (oscar.sobrevilla@gmail.com)
* Released under the MIT and GPL licenses.
* version 0.1.8 beta
*/
var ImageDownloader = (function (win) {
    
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

      var iframe = win.document.createElement('iframe'),
        _abort = function(){
          if ( !iframe )
            return;
          var cw = iframe.contentWindow;
          if(cw.stop) {
            cw.stop();
          } else {
            cw = iframe.contentDocument;
            cw.execCommand && cw.execCommand('Stop', false);
          }
          iframe.parentNode.removeChild(iframe);
          iframe = null;
          return src;
        };

      iframe.style.display = 'none';
      iframe.setAttribute('src', 'about:blank');

      iframe.onload = function () {
        this.onload = null;
        var img = new win.Image();
        img.onload = function () {
          this.onload = null;
          _abort(iframe);
          callback && callback(src);
        };
        (iframe.contentDocument || iframe.contentWindow.document).body.appendChild(img);
        img.src = src;
      };
      
      win.document.body.appendChild(iframe);
      
      return {
        'abort': _abort
      };
    }
  };
}(window));
