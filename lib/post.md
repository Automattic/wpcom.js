
# Post class

```js
var wpcom = require('wpcom')('<your-token>');

var blog = wpcom().blog('<blog-id>');

var post = blog.post('<post-id>');

post.get(function(err, data){
  // post `data` object information
});
```

## API

### Post('id', 'site-id', WPCOM);

Create a new instance of `Post` class giving `id`, `site-id` and `WPCOM`
instance. 

### Post({ id: 'id', slug: 'slug' }, 'site-id', 'WPCOM');

### Post.id(id)

Set post `id`.

### Post.slug(slug)

Set post `slug`.

### Post#get(fn)

Get post data by `id` or `slug`

### WPCOM#getbyslug(fn)

Get post data by `slug`
