# Follow

`Follow` handler class.

## API

### Follow(site-id, WPCOM);

Createa a new `Follow` instance giving `site-id` and `WPCOM` instance.

```js
var Follow = Follow('<site-id>', WPCOM);
```

### Follow#follow(fn)

Follow the current blog

```js
wpcom
.sites('blog.wordpress.com')
.follower
.follow();