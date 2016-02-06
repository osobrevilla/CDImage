    (function(doc) {

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
            load: function(src, callback, crossOrigin) {
              // crossOrigin values how "anonymous" or "use-credentials"
                var idoc,
                    iframe = doc.createElement('iframe');
                iframe.style.display = 'none';
                doc.body.appendChild(iframe);
                idoc = iframe.contentDocument || iframe.contentWindow.document;
                idoc.domain = location.host;
                idoc.open();
                function _abort() {
                    if (iframe){
                        iframe.removeEventListener ?
                        iframe.removeEventListener('load', loaded, false) : iframe.detachEvent('onload', loaded);
                    }
                    var res = _stopAndRemove(iframe);
                    if (res) iframe = null;
                    idoc = null;
                    return res === true ? src : res;
                }

                function loaded() {
                    this.removeEventListener ?
                        this.removeEventListener('load', loaded, false) : this.detachEvent('onload', loaded);
                    var img = new Image();
                        if (crossOrigin)
                            img.crossOrigin = crossOrigin;
                    img.onload = function() {
                        _abort();
                        this.parentNode.removeChild(img);
                        callback && callback(src, {
                            width: img.width,
                            height: img.height
                        }, img);
                        this.onload = null;
                        loaded = null;
                    };
                    idoc.body.appendChild(img);
                    img.src = src;
                }
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
