
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
var site = Site('<id>', WPCOM);
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

### Site#addPost(data, fn)

Add a new post to site. Return a `Post` instance.

```js
var new_post = site.addPost({ title: 'It is my new post' }, function(err, post){
});
```

### Site#deletePost(id, fn)

Delete a blog post

```js
var del_post = site.deletePost('<post-id>', function(err, post){
});
```
