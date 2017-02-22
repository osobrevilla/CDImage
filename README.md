#### Download example:


```
// Set the image source url
var src = "http://web.com/image.jpg";

// Begin download image
// @obj contains the link object with abort method.
// @function is a callback that run when the image is loaded.
 
var obj = CDImage.load(src, function () { 
  console.log("Download end!!", arguments);
});
```

#### Abort example:

```
// We waited 2 seconds to abort the download.
// If you wanna test it, i recomend to allow time for the setTimeout to cancel the download.
// look aborted request (color red) using dev tools like firebug or chrome dev tools.

setTimeout(function () {
  var src = obj.abort();
  console.log("abort src: ", src);
}, 2000);

```


[@osobrevilla](http://twitter.com/osobrevilla)
