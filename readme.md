# node-wpcom

### WordPress API for nodejs

  Nodejs module to get resources from [WordPress](http://www.wordpress.com) using the [developer.wordpress.com/docs/api/](REST API).

## API

### WPCOM('&lt;token&gt;');

Create a new instance of WPCOM. `token` parameter is optional but it's needed to
make admin actions or to access to protected resources.

Note: If you wanna a way to get the access token
then can use [node-wpcom-oauth](https://github.com/Automattic/node-wpcom-oauth) npm module.

```js
var wpcom = require('wpcom')();
```

### WPCOM#me.info();

```js
var wpcom = require('wpcom')('<your token>');

// get the user info
wpcom.me.info(function(err, user){
  // user info related with the given access token
});
```

### WPCOM#site.info(params, fn);

Get the site information

```js
var wpcom = require('wpcom')('<your token>');

// get site info
wpcom.site.id('blog.wordpress.com');
wpcom.site.info(function(err, site){
  // site data object
});
```

## Methods complete list

### WPCOM#me

* **#me.info(params, fn)** Meta data about auth token's User
* **#me.sites(params, fn)** A list of the current user's sites
* **#me.likes(params, fn)** List the currently authorized user's likes
* **#me.groups(params, fn)** A list of the current user's group
* **#me.connections(params, fn)** A list of the current user's connections to third-party services

### WPCOM#site

* **#site.id(site_id)** Set site id
* **#site.info(params, fn)** Information about site.id
* **#site.posts(params, fn)** Matching posts

### WPCOM#site.post

* **#site.post.get(id, params, fn)** Return a single Post (by id)
* **#site.post.getBySlug(slug, params, fn)** Return a single Post (by id)
* **#site.post.add(data, fn)** Create a post
* **#site.post.edit(id, data, fn)** Edit a post
* **#site.post.del(id, fn)** Delete a post

## Example

Into `example/` folder download the npm dependencies:

```cli
$ npm install
```

... and then run the application

```cli
$ node index.js
```

## Test

Create `data.json` file into `test/` folder to can run the tests. You can copy
or rename the `test/data_example.json` file.

```json
{
  "client_id": "<your client_id here>",
  "client_secret": "<your client_secret here>",
  "token": "<your token app here>",

  "public_site": "<a public blog here>",

  "private_site": "<a private blog here>",
  "private_site_id": "<the ID of the private blog>",

  "new_post_data": {
    "title": "New testing post",
    "content": "<div style=\"color: red;\">The content of the new testing post</div>"
  }
}
```

... and then

```cli
$ make
```

## License

MIT – Copyright 2014 Automattic
