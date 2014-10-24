
# Connection

`Connection` handler class.

### Create a `Connection` instance from Site

```js
var wpcom = require('wpcom')('<your-token>');
var connection = wpcom.site('<site-id>').connection('<connection-id>');
});
```

## API

### Connection(id, site, WPCOM)

Create a new `Connection` instance giving `id`, `site-id` and `WPCOM` instance.

```js
var connection = Connection('<id>', '<site-id>', WPCOM);
```

### Connection#get([query, ]fn)

Request a single connection item

```js
wpcom
.sites('blog.wordpress.com')
.connection(123)
.get(function(err, data){
  // connection data object
});
```

### Connection#del(fn) - Connection#delete(fn)

Delete a connection

```js
wpcom
.sites('blog.wordpress.com')
.connection(123)
.del(function(err, data){
  // deleted connection data object
});
```