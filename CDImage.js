/* !JavaScript Image Downloader (Cancelable)
 * Copyright 2013 Oscar Sobrevilla (oscar.sobrevilla@gmail.com)
 * Released under the MIT and GPL licenses.
 * version 0.1.8 beta
 */
(function (doc) {

    'use strict';

    var _stopAndRemove = function (iframe) {
        if (iframe) {
            try {
                var c = iframe.contentWindow;
                c && c.stop ? c.stop() :
                    c = iframe.contentDocument,
                    c && c.execCommand && c.execCommand('Stop', false);
                iframe.parentNode.removeChild(iframe);
                return true;
            } catch (e) {
                throw e.toString();
            }
        }
    }

    this.CDImage = {
        /**
         * Begin download image.
         * @param src {String}
         * @param callback {Function}
         * @expose
         * @return {Object}
         */
        load: function (src, callback) {
            var idoc,
                iframe = doc.createElement('iframe'),
                _abort = function () {
                    var res = _stopAndRemove(iframe);
                    if (res) iframe = null;
                    idoc = null;
                    return res === true ? src : res;
                };
            iframe.style.display = 'none';
            doc.body.appendChild(iframe);
            idoc = iframe.contentDocument || iframe.contentWindow.document;
            idoc.open();
            iframe.onload = function () {
                this.onload = null;
                var img = new Image();
                img.onload = function () {
                    this.onload = null;
                    _abort();
                    callback && callback(src);
                };
                idoc.body.appendChild(img);
                img.src = src;
            };
            idoc.close();
            return {
                /** @expose **/
                abort: _abort
            };
        }
    };

}.call(window, window.document));
