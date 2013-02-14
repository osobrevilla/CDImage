DOWNLOAD EXAMPLE:

var src = "http://web.com/image.jpg";

/* Download now!
 * @obj have the object with the image instance and abort method.
 */

var obj = ImageDownloader.load(src, function () {
  console.log(this, arguments);
});


ABORT EXAMPLE:

/* We waited 2 seconds to abort the download. */

setTimeout(function () {
  var img = obj.abort();
  console.log("abort src: ", img.src);
}, 2000);