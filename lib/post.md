
# Post class

```js
var wpcom = require('wpcom')('<your-token>');

var blog = wpcom.blog('<blog-id>');

var post = blog.post('<post-id>');

post.get(function(err, data){
  // post `data` object information
});
```

## API

### Post(id, site, WPCOM);

Create a new instance of `Post` class giving `id`, `site-id` and `WPCOM`
instance.

```js
var post = Post('<id>', '<site-id>', WPCOMM);
```

### Post(data, site, WPCOM);

```js
var post = Post({ id: '<id>', slug: '<slug>' }, '<site-id>', WPCOMM);
```

### Post.id(id)

```js
// Set post `id`.
post.id('<id>');
```

### Post.slug(slug)

```js
// Set post `slug`.
post.slug('<slug>');
```

### Post#get([params], fn)

Get post data by `id` or `slug`

```js
post.get(params, function(err, data){
  // post data object
});
```

### WPCOM#getbyslug(fn)

Get post data by `slug`
