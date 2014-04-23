
# Examples

### Simple server application

It's an express application that gets the blog posts making a server-side request.

run `make example-server` to start the application

```bash
$ make example-server
```

Finally open a browser and load the page pointing to http://localhost:3000
Keep in mind that this app gets the config data from test/data.json file

### Browser app using wpcom-proxy-request

it's also an express app but the requests are done from the browser using
[wpcom-proxy-request][] authentication.

```bash
$ make example-browser-proxy
```

### Node.js

So simple node.js script to get freshly pressed list.

Into `example/node` run:

```nash
$ node freshlyPressed.js
```
