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
setTimeout(function () {
  var src = obj.abort();
  console.log("abort src: ", src);
}, 2000);

```


[@osobrevilla](http://twitter.com/osobrevilla)
