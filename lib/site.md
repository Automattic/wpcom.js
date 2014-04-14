
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

### Site#post(id);

Create a new `Post` instance.

```js
var post = site.post('<post-id>');
```

### Site#addPost(data, [fn])

Add a new post to site. Return a `Post` instance. Emit `add` event.

```js
var new_post = site.addPost({ title: 'Hi!, it is a new post' });
new_post.on('add', function(data){
  console.log('A new post has been added at %s', post.date);
});
```
