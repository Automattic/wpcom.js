

# Site class

## Create a Site object from `WPCOM`

```js
var wpcom = require('wpcom')('<your-token>');
var site = wpcom.site('<blog-id>');
});
```

## API

### Site(id, WPCOM);

Create a new `Site` instance giving `id` and `WPCOM` instance.

```js
var site = Site('<id>', WPCOMM);
```

### Site#get([params], fn)

Get site data.

```js
post.get(function(err, data){
  // `site` data object
});
```

### Site#posts([params], fn)

Get site data.

```js
post.posts(function(err, data){
  // `posts` data object
});
```

### Site.post(id);

Create a new `Post` instance.

```
var post = site.post('<post-id>');
```
