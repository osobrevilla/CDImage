#### Download example:


```
// Set the image source url
var src = "http://web.com/image.jpg";

// Begin the downwnload image
// @obj contains the link object with abort method.
// @function is a callback that run when the image is loaded.
 
var obj = ImageDownloader.load(src, function () { 
  console.log("Download end!!", arguments);
});
```

#### Abort example:

```
// We waited 2 seconds to abort the download.
setTimeout(function () {
  var img = obj.abort();
  console.log("abort src: ", img.src);
}, 2000);

```