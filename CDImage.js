(function (doc) {

    'use strict';

    function _stopAndRemove(iframe) {
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
                }, loaded = null;
            iframe.style.display = 'none';
            doc.body.appendChild(iframe);
            idoc = iframe.contentDocument || iframe.contentWindow.document;
            idoc.open();
            loaded = function () {
                this.removeEventListener ?
                    this.removeEventListener('load', loaded, false) : this.detachEvent('onload', loaded);
                var img = new Image();
                img.onload = function () {
                    this.onload = null;
                    _abort();
                    callback && callback(src, img);
                };
                idoc.body.appendChild(img);
                img.src = src;
            };
            iframe.addEventListener ?
                iframe.addEventListener('load', loaded, false) : iframe.attachEvent('onload', loaded);
            idoc.close();
            return {
                /** @expose **/
                abort: _abort
            };
        }
    };

}.call(window, window.document));
