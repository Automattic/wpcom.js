# wpcom-connect

### Wordpress connect module ###

  Layer to get resources from [WordPress](http://www.wordpress.com) using the [developer.wordpress.com/docs/api/](REST API).

## API

### WPCONN(<token>);

Create a new instance of WPCONN. If you wanna a way to get the access token
then can use [WPOAuth](https://github.com/cloudup/wp-oauth) npm module.

```js
var WPCONN = require('wpcom-connect');
var wpconn = WPCONN();
```

### WPCONN#me.info();

```js
var WPCONN = require('wpcom-connect');
var wpconn = WPCONN('<your token>');

// get the user info
wpconn.me.info(function(err, user){
  // user info related with the given access token
});
```

### WPCONN#site.info(params, fn);

Get the site information

```js
var WPCONN = require('wpcom-connect');
var wpconn = WPCONN();

// get site info
wpconn.site.id('blog.wordpress.com');
wpconn.site.info(function(err, site){
  // site data object
});
```

## Methods complete list

| Methods                           | Descriptions                               |
| --------------------------------- | ------------------------------------------ |
| **#me.info(params, fn)**    | Meta data about auth token's User          |
| **#me.sites(params, fn)**   | A list of the current user's sites         |
| **#me.likes(params, fn)**   | List the currently authorized user's likes |
| **#me.groups(params, fn)**  | A list of the current user's group         |
| **#me.connections(params, fn)**  | A list of the current user's connections to third-party services |
| **#site.id(site_id)**                  | Set site id                                |
| **#site.info(params, fn)**             | Information about site.id                  |
| **#site.posts(params, fn)**            | Matching posts                             |
| --------------------------------- | ------------------------------------------ |

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
