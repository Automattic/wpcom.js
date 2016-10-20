var WPCOM =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	
	var clientId = document.location.hostname === 'calypso.localhost' ? 49801 : 49798;
	
	var wpcomOAuth = __webpack_require__( 1 )( clientId );
	var wpcomFactory = __webpack_require__ ( 11 );
	
	// get auth object
	wpcomOAuth.get( function( auth ) {
	
		var wpcom = wpcomFactory( auth.access_token );
		window.wpcom = wpcom;
	
		var siteNode = document.getElementById( 'site-node' );
		var imageNodeId = document.getElementById( 'image-node-id' );
		var revisionHistoryNodeOriginal = document.getElementById( 'revision-history-original' );
		var revisionHistoryNodeDetails = document.getElementById( 'revision-history-details' );
		var revisionHistoryNode = document.getElementById( 'revision-history' );
		var titleNode = document.getElementById( 'image-node-title' );
		var captionNode = document.getElementById( 'image-node-caption' );
		var descriptionNode = document.getElementById( 'image-node-description' );
		var imageContainerNode = document.getElementById( 'image-container' );
		var imageNode = document.getElementById( 'image-node' );
		var imageDetailsNode = document.getElementById( 'image-details' );
	
		var input = document.getElementById( 'file' );
		var deleteLink = document.getElementById( 'image-delete' );
	
		var mediaId = document.location.search.match( /mediaId=(\d+)/ );
		mediaId = mediaId ? Number( mediaId[ 1 ] ) : null;
		window.mediaId = mediaId;
	
		var siteId = document.location.search.match( /siteId=(.+)/ );
		siteId = siteId ? siteId[ 1 ] : null;
		window.siteId = siteId;
	
		if ( siteId ) {
			siteNode.value = siteId;
			console.log( 'siteId: %o', siteId );
		} else {
			wpcom.me().get().then( data => {
				siteId = data.primary_blog_url.replace( /http\:\/\//, '' );
				siteNode.value = siteId;
				input.removeAttribute( 'disabled' );
			} );
		}
	
		if ( mediaId && siteId ) {
			imageNodeId.value = mediaId;
			loadImages( mediaId );
			console.log( 'mediaId: %o', mediaId );
		}
	
		siteNode.addEventListener( 'keyup', ( event ) => {
			const value = event.target.value;
			console.log( 'value: %o', value );
	
			if ( value.length ) {
				input.removeAttribute( 'disabled' );
			} else {
				input.setAttribute( 'disabled', true );
			}
		} )
	
		deleteLink.addEventListener( 'click', ( event ) => {
			event.preventDefault();
			wpcom
				.site( siteId )
				.media( mediaId )
				.delete()
				.then( resp => console.log( resp ) )
				.catch( error => console.error( error ) );
		} );
	
		function loadImages( mediaId ) {
			wpcom
			.site( siteId )
			.media( mediaId )
			.get()
			.then( image => {
				console.log( 'image.revision_history: %o', image.revision_history );
	
				titleNode.value = image.title;
				captionNode.value = image.caption;
				descriptionNode.value = image.description;
				input.removeAttribute( 'disabled' );
	
				var revision_history = image.revision_history.items || [];
				var random_query_string = '?tmp=' + String( Math.random() ).substr( 2 );
	
				imageDetailsNode.innerHTML =
					'<p>filename: <span>' +
						'<a href="' + image.URL + random_query_string +
						'" target="_blank">' + image.file + '</a>' +
					'</span></p>' +
					'<p>revisions: <span>' + revision_history.length + '</span></p>' +
					'<p>date: <span>' + ( new Date( image.date ) ) + '</span></p>';
	
				imageNode.setAttribute( 'src', image.URL + random_query_string );
	
	
				if ( image.revision_history && image.revision_history.original && image.revision_history.original.URL ) {
					revisionHistoryNodeOriginal.setAttribute( 'src', image.revision_history.original.URL );
					revisionHistoryNodeDetails.innerHTML =
						'<div><a href="' + image.revision_history.original.URL + '" target="_blank" title="open `' + image.revision_history.original.file + '`">' +
						  '<span class="image-revision-filename">' + image.revision_history.original.file + '</span>' +
						'</a></div>' +
						'<div class="image-revision-date">' + ( image.revision_history.original.date ? new Date( image.revision_history.original.date ) : 'null' ) + '</div>' +
						'<div class="image-revision-extension">' + image.revision_history.original.extension + '</div>' +
						'<div class="image-revision-mimetype">' + image.revision_history.original.mime_type + '</div>';
				}
	
				revisionHistoryNode.innerHTML = '';
	
				if ( revision_history && revision_history.length ) {
					for ( const index in revision_history ) {
						const prevImage = revision_history[ index ];
	
						const imageContainer = document.createElement( 'div' );
						imageContainer.setAttribute( 'class', 'image-container' );
	
						const imageElement = document.createElement( 'img' );
						imageElement.setAttribute( 'src', prevImage.URL );
						imageContainer.appendChild( imageElement );
	
						const imageSummary = document.createElement( 'div' );
						imageSummary.setAttribute( 'class', 'image-summary' );
						imageSummary.innerHTML =
							'<span class="image-revision-number">#' + index + '</span>' +
							'<a href="' + prevImage.URL + random_query_string + '" target="_blank" title="open `' + prevImage.file + '`">' +
							  '<span class="image-revision-filename">' + prevImage.file + '</span>' +
							'</a>' +
							'<span class="image-revision-date">' + ( prevImage.date ? new Date( prevImage.date ) : 'null' ) + '</span>' +
							'<span class="image-revision-extension">' + prevImage.extension + '</span>' +
							'<span class="image-revision-mimetype">' + prevImage.mime_type + '</span>';
	
						imageContainer.appendChild( imageSummary );
	
						revisionHistoryNode.appendChild( imageContainer );
					}
				}
			} )
			.catch( err => console.error( err ) );
		}
	
		// select files on the "input" element
		input.onchange = function( e ) {
			mediaId = Number( imageNodeId.value );
			siteId = siteNode.value;
	
			var req;
	
			if ( ! mediaId ) {
				var files = [];
				for ( var i = 0; i < e.target.files.length; i++ ) {
					files.push( e.target.files[ i ] );
				}
	
				req = wpcom
					.site( siteId )
					.media( mediaId )
					.addFiles( files, function( err, res ) {
						if ( err ) {
							throw err;
						}
	
						var redirect = 'http://' + document.location.host + '/?mediaId=' + res.media[0].ID + '&siteId=' + siteId;
						document.location.href = redirect;
					} );
			} else {
				var file = e.target.files[ 0 ];
				req = wpcom
					.site( siteId )
					.media( mediaId )
					.update( { apiVersion: '1.2' }, {
						title: titleNode.value,
						caption: captionNode.value,
						description: descriptionNode.value,
						media: file
					}, ( error, resp ) => {
						if ( error ) {
							return console.error( error );
						}
	
						console.log( 'resp.revision_history: %o', resp.revision_history );
	
						loadImages( mediaId );
						imageNode.setAttribute( 'src', resp.URL );
					} );
			}
	
			req.upload.onprogress = onprogress;
		};
	
		function onprogress( e ) {
			if ( e.lengthComputable ) {
				var percentComplete = e.loaded / e.total * 100;
				console.log( 'progress event! %s%', percentComplete.toFixed( 2 ) );
			} else {
				// Unable to compute progress information since the total size is unknown
			}
		}	  // your token is here auth.access_token!
	} );


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var url = __webpack_require__(2);
	var querystring = __webpack_require__(5);
	var debug = __webpack_require__(8)('wpcom-oauth');
	
	/**
	 * Authotize WordPress.com endpoint
	 */
	
	var authorizeEndpoint = 'https://public-api.wordpress.com/oauth2/authorize';
	
	/**
	 * Expose `wpOAuth` function
	 */
	
	exports = module.exports = wpOAuth;
	
	/**
	 * Handle WordPress.com Implicit Open Authentication
	 *
	 * @param {String} client_id
	 * @param {Object} [opts]
	 * @api public
	 */
	
	function wpOAuth(client_id, opts){
	  // `Client ID` must be defined
	  if (!client_id) {
	    throw '`client_id` is undefined';
	  }
	  debug('client_id: %o', client_id);
	
	  // options
	  opts = opts || {};
	
	  // authentication request params
	  var params = exports.params = {
	    client_id: client_id,
	    response_type: opts.response_type || 'token'
	  };
	
	  // options - `Redirect URL`
	  params.redirect_uri = opts.redirect || location.href.replace(/\#.*$/, '');
	  debug('Redirect_URL: %o', params.redirect_uri);
	
	  if (opts.scope) params.scope = opts.scope;
	
	  return wpOAuth;
	}
	
	/**
	 * Get token authentication object
	 *
	 * @param {Function} [fn]
	 * @api public
	 */
	
	exports.get = function(fn){
	  fn = fn || function(){};
	
	  // get url parsed object
	  var url_parsed = url.parse(location.href, true);
	
	  // get hash object
	  var hash;
	  if (url_parsed.hash && url_parsed.hash.length > 1) {
	    hash = querystring.parse(url_parsed.hash.substring(1));
	  }
	
	  if (hash && hash.access_token) {
	    // Token is present in current URI
	    // store access_token
	    localStorage.wp_oauth = JSON.stringify(hash);
	
	    // clean hash from current URI
	    window.location = location.href.replace(/\#.*$/, '');
	  } else if (!localStorage.wp_oauth) {
	    return exports.request();
	  }
	
	  fn(JSON.parse(localStorage.wp_oauth));
	};
	
	/**
	 * Clean authentication from store
	 *
	 * @api public
	 */
	
	exports.clean = function(){
	  debug('clean');
	  delete localStorage.wp_oauth;
	};
	
	/**
	 * Make WordPress.com implicit oauth request
	 *
	 * @api public
	 */
	
	exports.request = function(){
	  // redirect to OAuth page
	  var redirect = authorizeEndpoint + '?' + querystring.stringify(exports.params);
	  debug('Redirect url: %o', redirect);
	  window.location = redirect;
	};
	
	/**
	 * Clean and request a new token
	 */
	
	exports.reset = function(){
	  exports.clean();
	  exports.request();
	};
	
	/**
	 * Return authentication object
	 *
	 * @api public
	 */
	
	exports.token = function(){
	  return localStorage.wp_oauth ? JSON.parse(localStorage.wp_oauth) : null;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var punycode = __webpack_require__(3);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(5);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;
	
	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
	            'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query &&
	      isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || (query && ('?' + query)) || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function(relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  Object.keys(this).forEach(function(k) {
	    result[k] = this[k];
	  }, this);
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function(k) {
	      if (k !== 'protocol')
	        result[k] = relative[k];
	    });
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function(k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especialy happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host) && (last === '.' || last === '..') ||
	      last === '');
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};
	
	function isString(arg) {
	  return typeof arg === "string";
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return  arg == null;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {
	
		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}
	
		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
	
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
	
			}
	
			return ucs2encode(output);
		}
	
		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
	
			}
			return output.join('');
		}
	
		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}
	
		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module), (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(6);
	exports.encode = exports.stringify = __webpack_require__(7);


/***/ },
/* 6 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(9);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // This hackery is required for IE8,
	  // where the `console.log` function doesn't have 'apply'
	  return 'object' == typeof console
	    && 'function' == typeof console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      localStorage.removeItem('debug');
	    } else {
	      localStorage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = localStorage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(10);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  var match = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 's':
	      return n * s;
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _promise = __webpack_require__(12);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	exports.default = WPCOM;
	
	var _wpcomXhrRequest = __webpack_require__(77);
	
	var _wpcomXhrRequest2 = _interopRequireDefault(_wpcomXhrRequest);
	
	var _debug = __webpack_require__(94);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	var _batch = __webpack_require__(97);
	
	var _batch2 = _interopRequireDefault(_batch);
	
	var _domain = __webpack_require__(103);
	
	var _domain2 = _interopRequireDefault(_domain);
	
	var _domains = __webpack_require__(106);
	
	var _domains2 = _interopRequireDefault(_domains);
	
	var _marketing = __webpack_require__(107);
	
	var _marketing2 = _interopRequireDefault(_marketing);
	
	var _me = __webpack_require__(127);
	
	var _me2 = _interopRequireDefault(_me);
	
	var _pinghub = __webpack_require__(136);
	
	var _pinghub2 = _interopRequireDefault(_pinghub);
	
	var _plans = __webpack_require__(137);
	
	var _plans2 = _interopRequireDefault(_plans);
	
	var _request = __webpack_require__(138);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _site = __webpack_require__(144);
	
	var _site2 = _interopRequireDefault(_site);
	
	var _users = __webpack_require__(171);
	
	var _users2 = _interopRequireDefault(_users);
	
	var _sendRequest = __webpack_require__(139);
	
	var _sendRequest2 = _interopRequireDefault(_sendRequest);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Local module constants
	 */
	var debug = (0, _debug2.default)('wpcom');
	
	/**
	 * Local module dependencies.
	 */
	/**
	 * Module dependencies.
	 */
	
	var DEFAULT_ASYNC_TIMEOUT = 30000;
	
	/**
	 * XMLHttpRequest (and CORS) API access method.
	 *
	 * API authentication is done via an (optional) access `token`,
	 * which needs to be retrieved via OAuth.
	 *
	 * Request Handler is optional and XHR is defined as default.
	 *
	 * @param {String} [token] - OAuth API access token
	 * @param {Function} [reqHandler] - function Request Handler
	 * @return {WPCOM} wpcom instance
	 */
	function WPCOM(token, reqHandler) {
		if (!(this instanceof WPCOM)) {
			return new WPCOM(token, reqHandler);
		}
	
		// `token` is optional
		if ('function' === typeof token) {
			reqHandler = token;
			token = null;
		}
	
		if (token) {
			debug('Token defined: %s…', token.substring(0, 6));
			this.token = token;
		}
	
		// Set default request handler
		if (!reqHandler) {
			debug('No request handler. Adding default XHR request handler');
	
			this.request = function (params, fn) {
				params = params || {};
	
				// token is optional
				if (token) {
					params.authToken = token;
				}
	
				return (0, _wpcomXhrRequest2.default)(params, fn);
			};
		} else {
			this.request = reqHandler;
		}
	
		// Add Req instance
		this.req = new _request2.default(this);
	
		// Add Pinghub instance
		this.pinghub = new _pinghub2.default(this);
	
		// Default api version;
		this.apiVersion = '1.1';
	}
	
	/**
	 * Return `Marketing` object instance
	 *
	 * @return {Marketing} Marketing instance
	 */
	WPCOM.prototype.marketing = function () {
		return new _marketing2.default(this);
	};
	
	/**
	 * Return `Me` object instance
	 *
	 * @return {Me} Me instance
	 */
	WPCOM.prototype.me = function () {
		return new _me2.default(this);
	};
	
	/**
	 * Return `Domains` object instance
	 *
	 * @return {Domains} Domains instance
	 */
	WPCOM.prototype.domains = function () {
		return new _domains2.default(this);
	};
	
	/**
	 * Return `Domain` object instance
	 *
	 * @param {String} domainId - domain identifier
	 * @return {Domain} Domain instance
	 */
	WPCOM.prototype.domain = function (domainId) {
		return new _domain2.default(domainId, this);
	};
	
	/**
	 * Return `Site` object instance
	 *
	 * @param {String} id - site identifier
	 * @return {Site} Site instance
	 */
	WPCOM.prototype.site = function (id) {
		return new _site2.default(id, this);
	};
	
	/**
	 * Return `Users` object instance
	 *
	 * @return {Users} Users instance
	 */
	WPCOM.prototype.users = function () {
		return new _users2.default(this);
	};
	
	/**
	 * Return `Plans` object instance
	 *
	 * @return {Plans} Plans instance
	 */
	WPCOM.prototype.plans = function () {
		return new _plans2.default(this);
	};
	
	/**
	* Return `Batch` object instance
	*
	* @return {Batch} Batch instance
	*/
	WPCOM.prototype.batch = function () {
		return new _batch2.default(this);
	};
	
	/**
	 * List Freshly Pressed Posts
	 *
	 * @param {Object} [query] - query object
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	WPCOM.prototype.freshlyPressed = function (query, fn) {
		return this.req.get('/freshly-pressed', query, fn);
	};
	
	/**
	 * Expose send-request
	 * @TODO: use `this.req` instead of this method
	 */
	WPCOM.prototype.sendRequest = function (params, query, body, fn) {
		var msg = 'WARN! Don use `sendRequest() anymore. Use `this.req` method.';
	
		if (console && console.warn) {
			console.warn(msg);
		} else {
			console.log(msg);
		}
	
		return _sendRequest2.default.call(this, params, query, body, fn);
	};
	
	/**
	 * Re-export all the class types.
	 */
	WPCOM.Batch = _batch2.default;
	WPCOM.Domain = _domain2.default;
	WPCOM.Domains = _domains2.default;
	WPCOM.Marketing = _marketing2.default;
	WPCOM.Me = _me2.default;
	WPCOM.Pinghub = _pinghub2.default;
	WPCOM.Plans = _plans2.default;
	WPCOM.Request = _request2.default;
	WPCOM.Site = _site2.default;
	WPCOM.Users = _users2.default;
	
	if (!_promise2.default.prototype.timeout) {
		/**
	 * Returns a new promise with a deadline
	 *
	 * After the timeout interval, the promise will
	 * reject. If the actual promise settles before
	 * the deadline, the timer is cancelled.
	 *
	 * @param {number} delay how many ms to wait
	 * @return {Promise} promise
	 */
		_promise2.default.prototype.timeout = function () {
			var _this = this;
	
			var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ASYNC_TIMEOUT;
	
			var cancelTimeout = void 0,
			    timer = void 0,
			    timeout = void 0;
	
			timeout = new _promise2.default(function (resolve, reject) {
				timer = setTimeout(function () {
					reject(new Error('Action timed out while waiting for response.'));
				}, delay);
			});
	
			cancelTimeout = function cancelTimeout() {
				clearTimeout(timer);
				return _this;
			};
	
			return _promise2.default.race([this.then(cancelTimeout).catch(cancelTimeout), timeout]);
		};
	}
	module.exports = exports['default'];
	
	//# sourceMappingURL=index.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(13), __esModule: true };

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(59);
	__webpack_require__(63);
	module.exports = __webpack_require__(23).Promise;

/***/ },
/* 14 */
/***/ function(module, exports) {



/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(16)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(19)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(17)
	  , defined   = __webpack_require__(18);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(20)
	  , $export        = __webpack_require__(21)
	  , redefine       = __webpack_require__(36)
	  , hide           = __webpack_require__(26)
	  , has            = __webpack_require__(37)
	  , Iterators      = __webpack_require__(38)
	  , $iterCreate    = __webpack_require__(39)
	  , setToStringTag = __webpack_require__(55)
	  , getPrototypeOf = __webpack_require__(57)
	  , ITERATOR       = __webpack_require__(56)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(22)
	  , core      = __webpack_require__(23)
	  , ctx       = __webpack_require__(24)
	  , hide      = __webpack_require__(26)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 22 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 23 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(25);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(27)
	  , createDesc = __webpack_require__(35);
	module.exports = __webpack_require__(31) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(28)
	  , IE8_DOM_DEFINE = __webpack_require__(30)
	  , toPrimitive    = __webpack_require__(34)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(31) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(29);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(31) && !__webpack_require__(32)(function(){
	  return Object.defineProperty(__webpack_require__(33)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(32)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(29)
	  , document = __webpack_require__(22).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(29);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26);

/***/ },
/* 37 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(40)
	  , descriptor     = __webpack_require__(35)
	  , setToStringTag = __webpack_require__(55)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(26)(IteratorPrototype, __webpack_require__(56)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(28)
	  , dPs         = __webpack_require__(41)
	  , enumBugKeys = __webpack_require__(53)
	  , IE_PROTO    = __webpack_require__(50)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(33)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(54).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(27)
	  , anObject = __webpack_require__(28)
	  , getKeys  = __webpack_require__(42);
	
	module.exports = __webpack_require__(31) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(43)
	  , enumBugKeys = __webpack_require__(53);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(37)
	  , toIObject    = __webpack_require__(44)
	  , arrayIndexOf = __webpack_require__(47)(false)
	  , IE_PROTO     = __webpack_require__(50)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(45)
	  , defined = __webpack_require__(18);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(46);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(44)
	  , toLength  = __webpack_require__(48)
	  , toIndex   = __webpack_require__(49);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(17)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(17)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(51)('keys')
	  , uid    = __webpack_require__(52);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(22)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22).document && document.documentElement;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(27).f
	  , has = __webpack_require__(37)
	  , TAG = __webpack_require__(56)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(51)('wks')
	  , uid        = __webpack_require__(52)
	  , Symbol     = __webpack_require__(22).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(37)
	  , toObject    = __webpack_require__(58)
	  , IE_PROTO    = __webpack_require__(50)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(18);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(60);
	var global        = __webpack_require__(22)
	  , hide          = __webpack_require__(26)
	  , Iterators     = __webpack_require__(38)
	  , TO_STRING_TAG = __webpack_require__(56)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(61)
	  , step             = __webpack_require__(62)
	  , Iterators        = __webpack_require__(38)
	  , toIObject        = __webpack_require__(44);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(19)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(20)
	  , global             = __webpack_require__(22)
	  , ctx                = __webpack_require__(24)
	  , classof            = __webpack_require__(64)
	  , $export            = __webpack_require__(21)
	  , isObject           = __webpack_require__(29)
	  , aFunction          = __webpack_require__(25)
	  , anInstance         = __webpack_require__(65)
	  , forOf              = __webpack_require__(66)
	  , speciesConstructor = __webpack_require__(70)
	  , task               = __webpack_require__(71).set
	  , microtask          = __webpack_require__(73)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(56)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(74)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(55)($Promise, PROMISE);
	__webpack_require__(75)(PROMISE);
	Wrapper = __webpack_require__(23)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(76)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(46)
	  , TAG = __webpack_require__(56)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(24)
	  , call        = __webpack_require__(67)
	  , isArrayIter = __webpack_require__(68)
	  , anObject    = __webpack_require__(28)
	  , toLength    = __webpack_require__(48)
	  , getIterFn   = __webpack_require__(69)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(28);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(38)
	  , ITERATOR   = __webpack_require__(56)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(64)
	  , ITERATOR  = __webpack_require__(56)('iterator')
	  , Iterators = __webpack_require__(38);
	module.exports = __webpack_require__(23).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(28)
	  , aFunction = __webpack_require__(25)
	  , SPECIES   = __webpack_require__(56)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(24)
	  , invoke             = __webpack_require__(72)
	  , html               = __webpack_require__(54)
	  , cel                = __webpack_require__(33)
	  , global             = __webpack_require__(22)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(46)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(22)
	  , macrotask = __webpack_require__(71).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(46)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(26);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(22)
	  , core        = __webpack_require__(23)
	  , dP          = __webpack_require__(27)
	  , DESCRIPTORS = __webpack_require__(31)
	  , SPECIES     = __webpack_require__(56)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(56)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _assign = __webpack_require__(78);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	exports.default = request;
	
	var _wpError = __webpack_require__(84);
	
	var _wpError2 = _interopRequireDefault(_wpError);
	
	var _superagent = __webpack_require__(89);
	
	var _superagent2 = _interopRequireDefault(_superagent);
	
	var _debug = __webpack_require__(94);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module variables
	 */
	var debug = (0, _debug2.default)('wpcom-xhr-request');
	
	/**
	 * Defauts
	 */
	
	/**
	 * Module dependencies.
	 */
	var defaults = {
		apiVersion: '1',
		apiNamespace: 'wp/v2',
		authToken: null,
		body: null,
		formData: null,
		headers: null,
		method: 'get',
		query: null,
		processResponseInEnvelopeMode: true,
		proxyOrigin: 'https://public-api.wordpress.com',
		url: ''
	};
	
	/**
	 * Send the request
	 *
	 * @param  {Superagent} req - request instance
	 * @param  {Object} settings - request settings
	 * @param  {Function} fn - callback function
	 * @return {Superagent} request instance
	 */
	var sendResponse = function sendResponse(req, settings, fn) {
		var isEnvelopeMode = settings.isEnvelopeMode;
		var isRestAPI = settings.isRestAPI;
		var processResponseInEnvelopeMode = settings.processResponseInEnvelopeMode;
	
	
		req.end(function (error, response) {
			if (error && !response) {
				return fn(error);
			}
	
			var body = response.body;
			var headers = response.headers;
			var statusCode = response.statusCode;
			var ok = response.ok;
			var _response$req = response.req;
			var path = _response$req.path;
			var method = _response$req.method;
	
			headers.status = statusCode;
	
			if (ok) {
				if (isEnvelopeMode && processResponseInEnvelopeMode) {
					// override `error`, body` and `headers`
					if (isRestAPI) {
						headers = body.headers;
						statusCode = body.code;
						body = body.body;
					} else {
						headers = body.headers;
						statusCode = body.status;
						body = body.body;
					}
	
					headers.status = statusCode;
	
					if (null !== statusCode && 2 !== Math.floor(statusCode / 100)) {
						debug('Error detected!');
						var _wpe = (0, _wpError2.default)({ path: path, method: method }, statusCode, body);
						return fn(_wpe, null, headers);
					}
				}
				return fn(null, body, headers);
			}
	
			var wpe = (0, _wpError2.default)({ path: path, method: method }, statusCode, body);
			return fn(wpe, null, headers);
		});
	
		return req;
	};
	
	/**
	 * Performs an XMLHttpRequest against the WordPress.com REST API.
	 *
	 * @param {Object|String} options - `request path` or `request parameters`
	 * @param {Function} fn - callback function
	 * @return { XHR } xhr instance
	 * @api public
	 */
	function request(options, fn) {
		if ('string' === typeof options) {
			options = { path: options };
		}
	
		var settings = (0, _assign2.default)({}, defaults, options);
	
		// is REST-API api?
		settings.isRestAPI = options.apiNamespace === undefined;
	
		// normalize request-method name
		settings.method = settings.method.toLowerCase();
	
		var apiNamespace = settings.apiNamespace;
		var apiVersion = settings.apiVersion;
		var authToken = settings.authToken;
		var body = settings.body;
		var formData = settings.formData;
		var headers = settings.headers;
		var isRestAPI = settings.isRestAPI;
		var method = settings.method;
		var query = settings.query;
		var proxyOrigin = settings.proxyOrigin;
	
		// request base path
	
		var basePath = void 0;
	
		if (isRestAPI) {
			basePath = '/rest/v' + apiVersion;
		} else if (apiNamespace && /\//.test(apiNamespace)) {
			basePath = '/' + apiNamespace; // wpcom/v2
		} else {
			basePath = '/wp-json'; // /wp-json/sites/%s/wpcom/v2 (deprecated)
		}
	
		// Envelope mode FALSE as default
		settings.isEnvelopeMode = false;
	
		settings.url = proxyOrigin + basePath + settings.path;
		debug('API URL: %o', settings.url);
	
		// create HTTP Request instance
		var req = _superagent2.default[method](settings.url);
	
		// querystring
		if (query) {
			req.query(query);
			debug('API send URL querystring: %o', query);
	
			settings.isEnvelopeMode = isRestAPI ? query.http_envelope : query._envelope;
			debug('envelope mode: %o', settings.isEnvelopeMode);
		}
	
		// body
		if (body) {
			req.send(body);
			debug('API send POST body: %o', body);
		}
	
		// POST FormData (for `multipart/form-data`, usually a file upload)
		if (formData) {
			for (var i = 0; i < formData.length; i++) {
				var data = formData[i];
				var key = data[0];
				var value = data[1];
				debug('adding FormData field %o: %o', key, value);
				req.field(key, value);
			}
		}
	
		// headers
		if (headers) {
			req.set(headers);
			debug('adding HTTP headers: %o', headers);
		}
	
		if (authToken) {
			req.set('Authorization', 'Bearer ' + authToken);
		}
	
		if (!req.get('Accept')) {
			// set a default "Accept" header preferring a JSON response
			req.set('Accept', '*/json,*/*');
		}
	
		sendResponse(req, settings, fn);
	
		return req.xhr;
	}
	module.exports = exports['default'];
	
	//# sourceMappingURL=index.js.map

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	module.exports = __webpack_require__(23).Object.assign;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(21);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(81)});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(42)
	  , gOPS     = __webpack_require__(82)
	  , pIE      = __webpack_require__(83)
	  , toObject = __webpack_require__(58)
	  , IObject  = __webpack_require__(45)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(32)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 82 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 83 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var uppercamelcase = __webpack_require__(86);
	var statusCodes = __webpack_require__(88);
	
	module.exports = WPError;
	
	function WPError () {
	  var self = new Error();
	
	  for (var i = 0; i < arguments.length; i++) {
	    process(self, arguments[i]);
	  }
	
	  if (typeof Error.captureStackTrace === 'function') {
	    Error.captureStackTrace(self, WPError);
	  }
	
	  return self;
	}
	
	function process ( self, data ) {
	  if ( ! data ) { 
	    return;
	  }
	  
	  if (typeof data === 'number') {
	    setStatusCode( self, data );
	
	  } else {
	    // assume it's a plain 'ol Object with some props to copy over
	    if ( data.status_code ) {
	      setStatusCode( self, data.status_code );
	    }
	
	    if ( data.error ) {
	      self.name = toName( data.error );
	    }
	
	    if ( data.error_description ) {
	      self.message = data.error_description;
	    }
	
	    var errors = data.errors;
	    if ( errors ) {
	      var first = errors.length ? errors[0] : errors;
	      process( self, first );
	    }
	
	    for ( var i in data ) {
	      self[i] = data[i];
	    }
	
	    if ( self.status && ( data.method || data.path ) ) {
	      setStatusCodeMessage( self );
	    }
	  }
	}
	
	function setStatusCode ( self, code ) {
	  self.name = toName( statusCodes[ code ] );
	  self.status = self.statusCode = code;
	  setStatusCodeMessage( self );
	}
	
	function setStatusCodeMessage ( self ) {
	  var code = self.status;
	  var method = self.method;
	  var path = self.path;
	
	  var m = code + ' status code';
	  var extended = method || path;
	
	  if ( extended ) m += ' for "';
	  if ( method ) m += method;
	  if ( extended ) m += ' ';
	  if ( path ) m += path;
	  if ( extended ) m += '"';
	
	  self.message = m;
	}
	
	function toName ( str ) {
	  return uppercamelcase( String(str).replace(/error$/i, ''), 'error' );
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(85)))

/***/ },
/* 85 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var camelCase = __webpack_require__(87);
	
	module.exports = function () {
		var cased = camelCase.apply(camelCase, arguments);
		return cased.charAt(0).toUpperCase() + cased.slice(1);
	};


/***/ },
/* 87 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function () {
		var str = [].map.call(arguments, function (str) {
			return str.trim();
		}).filter(function (str) {
			return str.length;
		}).join('-');
	
		if (!str.length) {
			return '';
		}
	
		if (str.length === 1 || !(/[_.\- ]+/).test(str) ) {
			if (str[0] === str[0].toLowerCase() && str.slice(1) !== str.slice(1).toLowerCase()) {
				return str;
			}
	
			return str.toLowerCase();
		}
	
		return str
		.replace(/^[_.\- ]+/, '')
		.toLowerCase()
		.replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
			return p1.toUpperCase();
		});
	};


/***/ },
/* 88 */
/***/ function(module, exports) {

	module.exports = {
	  "100": "Continue",
	  "101": "Switching Protocols",
	  "102": "Processing",
	  "200": "OK",
	  "201": "Created",
	  "202": "Accepted",
	  "203": "Non-Authoritative Information",
	  "204": "No Content",
	  "205": "Reset Content",
	  "206": "Partial Content",
	  "207": "Multi-Status",
	  "208": "Already Reported",
	  "226": "IM Used",
	  "300": "Multiple Choices",
	  "301": "Moved Permanently",
	  "302": "Found",
	  "303": "See Other",
	  "304": "Not Modified",
	  "305": "Use Proxy",
	  "307": "Temporary Redirect",
	  "308": "Permanent Redirect",
	  "400": "Bad Request",
	  "401": "Unauthorized",
	  "402": "Payment Required",
	  "403": "Forbidden",
	  "404": "Not Found",
	  "405": "Method Not Allowed",
	  "406": "Not Acceptable",
	  "407": "Proxy Authentication Required",
	  "408": "Request Timeout",
	  "409": "Conflict",
	  "410": "Gone",
	  "411": "Length Required",
	  "412": "Precondition Failed",
	  "413": "Payload Too Large",
	  "414": "URI Too Long",
	  "415": "Unsupported Media Type",
	  "416": "Range Not Satisfiable",
	  "417": "Expectation Failed",
	  "418": "I'm a teapot",
	  "421": "Misdirected Request",
	  "422": "Unprocessable Entity",
	  "423": "Locked",
	  "424": "Failed Dependency",
	  "425": "Unordered Collection",
	  "426": "Upgrade Required",
	  "428": "Precondition Required",
	  "429": "Too Many Requests",
	  "431": "Request Header Fields Too Large",
	  "500": "Internal Server Error",
	  "501": "Not Implemented",
	  "502": "Bad Gateway",
	  "503": "Service Unavailable",
	  "504": "Gateway Timeout",
	  "505": "HTTP Version Not Supported",
	  "506": "Variant Also Negotiates",
	  "507": "Insufficient Storage",
	  "508": "Loop Detected",
	  "509": "Bandwidth Limit Exceeded",
	  "510": "Not Extended",
	  "511": "Network Authentication Required"
	}


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Root reference for iframes.
	 */
	
	var root;
	if (typeof window !== 'undefined') { // Browser window
	  root = window;
	} else if (typeof self !== 'undefined') { // Web Worker
	  root = self;
	} else { // Other environments
	  console.warn("Using browser-only version of superagent in non-browser environment");
	  root = this;
	}
	
	var Emitter = __webpack_require__(90);
	var requestBase = __webpack_require__(91);
	var isObject = __webpack_require__(92);
	
	/**
	 * Noop.
	 */
	
	function noop(){};
	
	/**
	 * Expose `request`.
	 */
	
	var request = module.exports = __webpack_require__(93).bind(null, Request);
	
	/**
	 * Determine XHR.
	 */
	
	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  throw Error("Browser-only verison of superagent could not find XHR");
	};
	
	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */
	
	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };
	
	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */
	
	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    pushEncodedKeyValuePair(pairs, key, obj[key]);
	  }
	  return pairs.join('&');
	}
	
	/**
	 * Helps 'serialize' with serializing arrays.
	 * Mutates the pairs array.
	 *
	 * @param {Array} pairs
	 * @param {String} key
	 * @param {Mixed} val
	 */
	
	function pushEncodedKeyValuePair(pairs, key, val) {
	  if (val != null) {
	    if (Array.isArray(val)) {
	      val.forEach(function(v) {
	        pushEncodedKeyValuePair(pairs, key, v);
	      });
	    } else if (isObject(val)) {
	      for(var subkey in val) {
	        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
	      }
	    } else {
	      pairs.push(encodeURIComponent(key)
	        + '=' + encodeURIComponent(val));
	    }
	  } else if (val === null) {
	    pairs.push(encodeURIComponent(key));
	  }
	}
	
	/**
	 * Expose serialization method.
	 */
	
	 request.serializeObject = serialize;
	
	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */
	
	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var pair;
	  var pos;
	
	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    pos = pair.indexOf('=');
	    if (pos == -1) {
	      obj[decodeURIComponent(pair)] = '';
	    } else {
	      obj[decodeURIComponent(pair.slice(0, pos))] =
	        decodeURIComponent(pair.slice(pos + 1));
	    }
	  }
	
	  return obj;
	}
	
	/**
	 * Expose parser.
	 */
	
	request.parseString = parseString;
	
	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */
	
	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};
	
	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */
	
	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };
	
	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */
	
	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};
	
	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;
	
	  lines.pop(); // trailing CRLF
	
	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }
	
	  return fields;
	}
	
	/**
	 * Check if `mime` is json or has +json structured syntax suffix.
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api private
	 */
	
	function isJSON(mime) {
	  return /[\/+]json\b/.test(mime);
	}
	
	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */
	
	function type(str){
	  return str.split(/ *; */).shift();
	};
	
	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function params(str){
	  return str.split(/ *; */).reduce(function(obj, str){
	    var parts = str.split(/ *= */),
	        key = parts.shift(),
	        val = parts.shift();
	
	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};
	
	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */
	
	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  this._setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this._setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this._parseBody(this.text ? this.text : this.xhr.response)
	    : null;
	}
	
	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */
	
	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};
	
	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */
	
	Response.prototype._setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);
	
	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};
	
	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */
	
	Response.prototype._parseBody = function(str){
	  var parse = request.parse[this.type];
	  if (!parse && isJSON(this.type)) {
	    parse = request.parse['application/json'];
	  }
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};
	
	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */
	
	Response.prototype._setStatusProperties = function(status){
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }
	
	  var type = status / 100 | 0;
	
	  // status / class
	  this.status = this.statusCode = status;
	  this.statusType = type;
	
	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;
	
	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};
	
	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */
	
	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;
	
	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;
	
	  return err;
	};
	
	/**
	 * Expose `Response`.
	 */
	
	request.Response = Response;
	
	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */
	
	function Request(method, url) {
	  var self = this;
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {}; // preserves header name case
	  this._header = {}; // coerces header names to lowercase
	  this.on('end', function(){
	    var err = null;
	    var res = null;
	
	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      // issue #675: return the raw response if the response parsing fails
	      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
	      // issue #876: return the http status code if the response parsing fails
	      err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
	      return self.callback(err);
	    }
	
	    self.emit('response', res);
	
	    var new_err;
	    try {
	      if (res.status < 200 || res.status >= 300) {
	        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	        new_err.original = err;
	        new_err.response = res;
	        new_err.status = res.status;
	      }
	    } catch(e) {
	      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
	    }
	
	    // #1000 don't catch errors from the callback to avoid double calling it
	    if (new_err) {
	      self.callback(new_err, res);
	    } else {
	      self.callback(null, res);
	    }
	  });
	}
	
	/**
	 * Mixin `Emitter` and `requestBase`.
	 */
	
	Emitter(Request.prototype);
	for (var key in requestBase) {
	  Request.prototype[key] = requestBase[key];
	}
	
	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};
	
	/**
	 * Set responseType to `val`. Presently valid responseTypes are 'blob' and
	 * 'arraybuffer'.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .responseType('blob')
	 *        .end(callback);
	 *
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.responseType = function(val){
	  this._responseType = val;
	  return this;
	};
	
	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};
	
	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.auth = function(user, pass, options){
	  if (!options) {
	    options = {
	      type: 'basic'
	    }
	  }
	
	  switch (options.type) {
	    case 'basic':
	      var str = btoa(user + ':' + pass);
	      this.set('Authorization', 'Basic ' + str);
	    break;
	
	    case 'auto':
	      this.username = user;
	      this.password = pass;
	    break;
	  }
	  return this;
	};
	
	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/
	
	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};
	
	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.attach = function(field, file, filename){
	  this._getFormData().append(field, file, filename || file.name);
	  return this;
	};
	
	Request.prototype._getFormData = function(){
	  if (!this._formData) {
	    this._formData = new root.FormData();
	  }
	  return this._formData;
	};
	
	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */
	
	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  fn(err, res);
	};
	
	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */
	
	Request.prototype.crossDomainError = function(){
	  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
	  err.crossDomain = true;
	
	  err.status = this.status;
	  err.method = this.method;
	  err.url = this.url;
	
	  this.callback(err);
	};
	
	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */
	
	Request.prototype._timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};
	
	/**
	 * Compose querystring to append to req.url
	 *
	 * @api private
	 */
	
	Request.prototype._appendQueryString = function(){
	  var query = this._query.join('&');
	  if (query) {
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }
	};
	
	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var timeout = this._timeout;
	  var data = this._formData || this._data;
	
	  // store callback
	  this._callback = fn || noop;
	
	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;
	
	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status } catch(e) { status = 0; }
	
	    if (0 == status) {
	      if (self.timedout) return self._timeoutError();
	      if (self._aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };
	
	  // progress
	  var handleProgress = function(direction, e) {
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    e.direction = direction;
	    self.emit('progress', e);
	  }
	  if (this.hasListeners('progress')) {
	    try {
	      xhr.onprogress = handleProgress.bind(null, 'download');
	      if (xhr.upload) {
	        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
	      }
	    } catch(e) {
	      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	      // Reported here:
	      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	    }
	  }
	
	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.timedout = true;
	      self.abort();
	    }, timeout);
	  }
	
	  // querystring
	  this._appendQueryString();
	
	  // initiate request
	  if (this.username && this.password) {
	    xhr.open(this.method, this.url, true, this.username, this.password);
	  } else {
	    xhr.open(this.method, this.url, true);
	  }
	
	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;
	
	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
	    // serialize stuff
	    var contentType = this._header['content-type'];
	    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
	    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
	    if (serialize) data = serialize(data);
	  }
	
	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }
	
	  if (this._responseType) {
	    xhr.responseType = this._responseType;
	  }
	
	  // send stuff
	  this.emit('request', this);
	
	  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
	  // We need null here if data is undefined
	  xhr.send(typeof data !== 'undefined' ? data : null);
	  return this;
	};
	
	
	/**
	 * Expose `Request`.
	 */
	
	request.Request = Request;
	
	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * OPTIONS query to `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.options = function(url, data, fn){
	  var req = request('OPTIONS', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	function del(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};
	
	request['del'] = del;
	request['delete'] = del;
	
	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	if (true) {
	  module.exports = Emitter;
	}
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module of mixed-in functions shared between node and client code
	 */
	var isObject = __webpack_require__(92);
	
	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.clearTimeout = function _clearTimeout(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};
	
	/**
	 * Override default response body parser
	 *
	 * This function will be called to convert incoming data into request.body
	 *
	 * @param {Function}
	 * @api public
	 */
	
	exports.parse = function parse(fn){
	  this._parser = fn;
	  return this;
	};
	
	/**
	 * Override default request body serializer
	 *
	 * This function will be called to convert data set via .send or .attach into payload to send
	 *
	 * @param {Function}
	 * @api public
	 */
	
	exports.serialize = function serialize(fn){
	  this._serializer = fn;
	  return this;
	};
	
	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.timeout = function timeout(ms){
	  this._timeout = ms;
	  return this;
	};
	
	/**
	 * Promise support
	 *
	 * @param {Function} resolve
	 * @param {Function} reject
	 * @return {Request}
	 */
	
	exports.then = function then(resolve, reject) {
	  if (!this._fullfilledPromise) {
	    var self = this;
	    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
	      self.end(function(err, res){
	        if (err) innerReject(err); else innerResolve(res);
	      });
	    });
	  }
	  return this._fullfilledPromise.then(resolve, reject);
	}
	
	exports.catch = function(cb) {
	  return this.then(undefined, cb);
	};
	
	/**
	 * Allow for extension
	 */
	
	exports.use = function use(fn) {
	  fn(this);
	  return this;
	}
	
	
	/**
	 * Get request header `field`.
	 * Case-insensitive.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */
	
	exports.get = function(field){
	  return this._header[field.toLowerCase()];
	};
	
	/**
	 * Get case-insensitive header `field` value.
	 * This is a deprecated internal API. Use `.get(field)` instead.
	 *
	 * (getHeader is no longer used internally by the superagent code base)
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 * @deprecated
	 */
	
	exports.getHeader = exports.get;
	
	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 * Case-insensitive.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};
	
	/**
	 * Remove header `field`.
	 * Case-insensitive.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 */
	exports.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};
	
	/**
	 * Write the field `name` and `val`, or multiple fields with one object
	 * for "multipart/form-data" request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 *
	 * request.post('/upload')
	 *   .field({ foo: 'bar', baz: 'qux' })
	 *   .end(callback);
	 * ```
	 *
	 * @param {String|Object} name
	 * @param {String|Blob|File|Buffer|fs.ReadStream} val
	 * @return {Request} for chaining
	 * @api public
	 */
	exports.field = function(name, val) {
	
	  // name should be either a string or an object.
	  if (null === name ||  undefined === name) {
	    throw new Error('.field(name, val) name can not be empty');
	  }
	
	  if (isObject(name)) {
	    for (var key in name) {
	      this.field(key, name[key]);
	    }
	    return this;
	  }
	
	  // val should be defined now
	  if (null === val || undefined === val) {
	    throw new Error('.field(name, val) val can not be empty');
	  }
	  this._getFormData().append(name, val);
	  return this;
	};
	
	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */
	exports.abort = function(){
	  if (this._aborted) {
	    return this;
	  }
	  this._aborted = true;
	  this.xhr && this.xhr.abort(); // browser
	  this.req && this.req.abort(); // node
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};
	
	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */
	
	exports.withCredentials = function(){
	  // This is browser-only functionality. Node side is no-op.
	  this._withCredentials = true;
	  return this;
	};
	
	/**
	 * Set the max redirects to `n`. Does noting in browser XHR implementation.
	 *
	 * @param {Number} n
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.redirects = function(n){
	  this._maxRedirects = n;
	  return this;
	};
	
	/**
	 * Convert to a plain javascript object (not JSON string) of scalar properties.
	 * Note as this method is designed to return a useful non-this value,
	 * it cannot be chained.
	 *
	 * @return {Object} describing method, url, and data of this request
	 * @api public
	 */
	
	exports.toJSON = function(){
	  return {
	    method: this.method,
	    url: this.url,
	    data: this._data,
	    headers: this._header
	  };
	};
	
	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	
	exports._isHost = function _isHost(obj) {
	  var str = {}.toString.call(obj);
	
	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}
	
	/**
	 * Send `data` as the request body, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"}')
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	 *      request.post('/user')
	 *        .send('name=tobi')
	 *        .send('species=ferret')
	 *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.send = function(data){
	  var obj = isObject(data);
	  var type = this._header['content-type'];
	
	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    // default to x-www-form-urlencoded
	    if (!type) this.type('form');
	    type = this._header['content-type'];
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }
	
	  if (!obj || this._isHost(data)) return this;
	
	  // default to json
	  if (!type) this.type('json');
	  return this;
	};


/***/ },
/* 92 */
/***/ function(module, exports) {

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	
	function isObject(obj) {
	  return null !== obj && 'object' === typeof obj;
	}
	
	module.exports = isObject;


/***/ },
/* 93 */
/***/ function(module, exports) {

	// The node and browser modules expose versions of this with the
	// appropriate constructor function bound as first argument
	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */
	
	function request(RequestConstructor, method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new RequestConstructor('GET', method).end(url);
	  }
	
	  // url first
	  if (2 == arguments.length) {
	    return new RequestConstructor('GET', method);
	  }
	
	  return new RequestConstructor(method, url);
	}
	
	module.exports = request;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(95);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(96);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 96 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Batch = function () {
		/**
	  * Create a `Batch` instance
	  *
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {null} null
	  */
		function Batch(wpcom) {
			(0, _classCallCheck3.default)(this, Batch);
	
			if (!(this instanceof Batch)) {
				return new Batch(wpcom);
			}
	
			this.wpcom = wpcom;
			this.urls = [];
		}
	
		/**
	  * Add url to batch requests
	  *
	  * @param {String} url - endpoint url
	  * @return {Batch} batch instance
	  */
	
	
		(0, _createClass3.default)(Batch, [{
			key: 'add',
			value: function add(url) {
				this.urls.push(url);
				return this;
			}
	
			/**
	   * Run the batch request
	   *
	   * @param {Object} [query] - optional query parameter
	   * @param {Function} fn - callback
	   * @return {Promise} Promise
	   */
	
		}, {
			key: 'run',
			value: function run() {
				var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
				var fn = arguments[1];
	
				if ('function' === typeof query) {
					fn = query;
					query = {};
				}
	
				// add urls to query object
				query.urls = this.urls;
	
				return this.wpcom.req.get('/batch', query, fn);
			}
		}]);
		return Batch;
	}();
	
	;
	
	/**
	 * Expose `Batch` module
	 */
	exports.default = Batch;
	module.exports = exports['default'];
	
	//# sourceMappingURL=batch.js.map

/***/ },
/* 98 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(100);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(102);
	var $Object = __webpack_require__(23).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(21);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(31), 'Object', {defineProperty: __webpack_require__(27).f});

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _domain = __webpack_require__(104);
	
	var _domain2 = _interopRequireDefault(_domain);
	
	var _domain3 = __webpack_require__(105);
	
	var _domain4 = _interopRequireDefault(_domain3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module dependencies
	 */
	var root = '/domains/';
	
	var Domain = function () {
		/**
	  * `Domain` constructor.
	  *
	  * @param {String} id - domain identifier
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Undefined} undefined
	  */
		function Domain(id, wpcom) {
			(0, _classCallCheck3.default)(this, Domain);
	
			if (!(this instanceof Domain)) {
				return new Domain(id, wpcom);
			}
			this._id = id;
			this.wpcom = wpcom;
		}
	
		/**
	  * Get the status of the domain
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Function} request handler
	  */
	
	
		(0, _createClass3.default)(Domain, [{
			key: 'status',
			value: function status(query, fn) {
				return this.wpcom.req.get(root + this._id + '/status', query, fn);
			}
	
			/**
	   * Check if the given domain is available
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'isAvailable',
			value: function isAvailable(query, fn) {
				return this.wpcom.req.get(root + this._id + '/is-available', query, fn);
			}
	
			/**
	   * Check if the given domain name can be mapped to
	   * a WordPress blog.
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'isMappable',
			value: function isMappable(query, fn) {
				return this.wpcom.req.get(root + this._id + '/is-mappable', query, fn);
			}
	
			/**
	   * Check if the given domain name can be used for site redirect.
	   *
	   * @param {String} siteId - site id of the site to check
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'canRedirect',
			value: function canRedirect(siteId, query, fn) {
				var path = root + siteId + '/' + this._id + '/can-redirect';
				return this.wpcom.req.get(path, query, fn);
			}
	
			/**
	   * Get the email forwards/configuration for a domain.
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'emailForwards',
			value: function emailForwards(query, fn) {
				return this.wpcom.req.get(root + this._id + '/email', query, fn);
			}
	
			/**
	   * Get a list of the nameservers for the domain
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'nameserversList',
			value: function nameserversList(query, fn) {
				return this.wpcom.req.get(root + this._id + '/nameservers', query, fn);
			}
	
			/**
	   * Update the nameservers for the domain
	   *
	   * @param {Array} nameservers- nameservers list
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'updateNameservers',
			value: function updateNameservers(nameservers, query, fn) {
				var body = { nameservers: nameservers };
				return this.wpcom.req.post(root + this._id + '/nameservers', query, body, fn);
			}
	
			/**
	   * Get a list of the DNS records for the domain
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'dnsList',
			value: function dnsList(query, fn) {
				return this.wpcom.req.get(root + this._id + '/dns', query, fn);
			}
	
			/**
	   * Get a list of all Google Apps accounts for the domain
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'googleAppsList',
			value: function googleAppsList(query, fn) {
				return this.wpcom.req.get(root + this._id + '/google-apps', query, fn);
			}
	
			/**
	   * Resend the ICANN verification email for the domain
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'resendICANN',
			value: function resendICANN(query, fn) {
				return this.wpcom.req.post(root + this._id + '/resend-icann', query, fn);
			}
	
			/**
	   * Return `DomainEmail` instance
	   *
	   * @param {String} [email] - email identifier
	   * @return {DomainEmail} DomainEmail instance
	   */
	
		}, {
			key: 'email',
			value: function email(_email) {
				return new _domain2.default(_email, this._id, this.wpcom);
			}
	
			/**
	   * Return `DomainDns` instance
	   *
	   * @return {DomainDns} DomainDns instance
	   */
	
		}, {
			key: 'dns',
			value: function dns() {
				return new _domain4.default(this._id, this.wpcom);
			}
		}]);
		return Domain;
	}();
	
	/**
	 * Expose `Domain` module
	 */
	
	
	exports.default = Domain;
	module.exports = exports['default'];
	
	//# sourceMappingURL=domain.js.map

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var root = '/domains/';
	
	var DomainEmail = function () {
		/**
	  * `DomainEmail` constructor.
	  *
	  * @param {String} [email] - email
	  * @param {String} domainId - domain identifier
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Undefined} undefined
	  */
		function DomainEmail(email, domainId, wpcom) {
			(0, _classCallCheck3.default)(this, DomainEmail);
	
			if (!(this instanceof DomainEmail)) {
				return new DomainEmail(email, domainId, wpcom);
			}
	
			if (email) {
				this._email = email;
			}
	
			this._domain = domainId;
			this._subpath = root + this._domain + '/email/';
			this.wpcom = wpcom;
		}
	
		/**
	  * Update the email forwards/configuration for a domain.
	  *
	  * @param {String} destination - the email address to forward email to.
	  * @param {Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Function} request handler
	  */
	
	
		(0, _createClass3.default)(DomainEmail, [{
			key: 'forward',
			value: function forward(destination, query, fn) {
				var body = { destination: destination };
				return this.wpcom.req.post(this._subpath + this._email, query, body, fn);
			}
	
			/**
	   * Create an email forward for the domain
	   * if it has enough licenses.
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'add',
			value: function add(mailbox, destination, query, fn) {
				if ('function' === typeof query) {
					fn = query;
					query = {};
				}
	
				var body = {
					mailbox: mailbox,
					destination: destination
				};
	
				return this.wpcom.req.post(this._subpath + 'new', query, body, fn);
			}
	
			/**
	   * Delete an email forward for the domain
	   *
	   * @param {String} mailbox - mailbox to alter
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'delete',
			value: function _delete(mailbox, query, fn) {
				return this.wpcom.req.del(this._subpath + mailbox + '/delete', query, fn);
			}
		}]);
		return DomainEmail;
	}();
	
	/**
	 * Expose `DomainEmail` module
	 */
	
	
	exports.default = DomainEmail;
	module.exports = exports['default'];
	
	//# sourceMappingURL=domain.email.js.map

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var root = '/domains/';
	
	var DomainDns = function () {
		/**
	  * `DomainDns` constructor.
	  *
	  * @param {String} domainId - domain identifier
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Undefined} undefined
	  */
		function DomainDns(domainId, wpcom) {
			(0, _classCallCheck3.default)(this, DomainDns);
	
			if (!(this instanceof DomainDns)) {
				return new DomainDns(domainId, wpcom);
			}
	
			this._domain = domainId;
			this._subpath = root + this._domain + '/dns';
			this.wpcom = wpcom;
		}
	
		/**
	  * Adds a DNS record
	  *
	  * @param {Object} record - record
	  * @param {Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Function} request handler
	  */
	
	
		(0, _createClass3.default)(DomainDns, [{
			key: 'add',
			value: function add(record, query, fn) {
				if ('function' === typeof query) {
					fn = query;
					query = {};
				}
	
				return this.wpcom.req.post(this._subpath + '/add', query, record, fn);
			}
	
			/**
	   * Delete a DNS record
	   *
	   * @param {String} record - record
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'delete',
			value: function _delete(record, query, fn) {
				return this.wpcom.req.post(this._subpath + '/delete', query, record, fn);
			}
		}]);
		return DomainDns;
	}();
	
	/**
	 * Expose `DomainDns` module
	 */
	
	
	exports.default = DomainDns;
	module.exports = exports['default'];
	
	//# sourceMappingURL=domain.dns.js.map

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var root = '/domains/';
	
	var Domains = function () {
		/**
	  * `Domains` constructor.
	  *
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Undefined} undefined
	  */
		function Domains(wpcom) {
			(0, _classCallCheck3.default)(this, Domains);
	
			if (!(this instanceof Domains)) {
				return new Domains(wpcom);
			}
			this.wpcom = wpcom;
		}
	
		/**
	  * Get a list of suggested domain names that are available for
	  * registration based on a given term or domain name.
	  *
	  * @param {String|Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Function} request handler
	  */
	
	
		(0, _createClass3.default)(Domains, [{
			key: 'suggestions',
			value: function suggestions(query, fn) {
				if ('string' === typeof query) {
					query = { query: query };
				}
				return this.wpcom.req.get(root + 'suggestions', query, fn);
			}
	
			/**
	   * GET example domain suggestions
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'suggestionsExamples',
			value: function suggestionsExamples(query, fn) {
				return this.wpcom.req.get(root + 'suggestions/examples', query, fn);
			}
	
			/**
	   * Get a localized list of supported countries for domain registrations.
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'supportedCountries',
			value: function supportedCountries(query, fn) {
				return this.wpcom.req.get(root + 'supported-countries', query, fn);
			}
	
			/**
	   * Get a localized list of supported states for domain registrations.
	   *
	   * @param {String} countryCode - country code ISO 3166-1 alpha-2 identifier
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'supportedStates',
			value: function supportedStates(countryCode, query, fn) {
				var path = root + 'supported-states/' + countryCode;
				return this.wpcom.req.get(path, query, fn);
			}
		}]);
		return Domains;
	}();
	
	/**
	* Expose `Domains` module
	*/
	
	
	exports.default = Domains;
	module.exports = exports['default'];
	
	//# sourceMappingURL=domains.js.map

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _marketing = __webpack_require__(108);
	
	var _marketing2 = _interopRequireDefault(_marketing);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Marketing = function () {
		/**
	  * `Marketing` constructor.
	  *
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Undefined} undefined
	  */
		function Marketing(wpcom) {
			(0, _classCallCheck3.default)(this, Marketing);
	
			if (!(this instanceof Marketing)) {
				return new Marketing(wpcom);
			}
			this.wpcom = wpcom;
		}
	
		/**
	  * Return `MarketingSurvey` object instance
	  *
	  * @param {String} id - survey idetification
	  * @param {String} [siteId] - site identification
	  * @return {MarketingSurvey} MarketingSurvey instance
	  */
	
	
		(0, _createClass3.default)(Marketing, [{
			key: 'survey',
			value: function survey(id, siteId) {
				return new _marketing2.default(id, siteId, this.wpcom);
			}
		}]);
		return Marketing;
	}(); /**
	      * Local module dependencies.
	      */
	
	
	exports.default = Marketing;
	module.exports = exports['default'];
	
	//# sourceMappingURL=marketing.js.map

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _defineProperty2 = __webpack_require__(109);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _assign = __webpack_require__(78);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _typeof2 = __webpack_require__(110);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module vars
	 */
	var root = '/marketing/survey';
	
	var MarketingSurvey = function () {
		/**
	  * `MarketingSurvey` constructor.
	  *
	  * @param {String} id - survey identification
	  * @param {String} [siteId] - site identification
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Undefined} undefined
	  */
		function MarketingSurvey(id, siteId, wpcom) {
			(0, _classCallCheck3.default)(this, MarketingSurvey);
	
			if (!id) {
				throw new TypeError('`id` survey is not correctly defined');
			}
	
			if (!(this instanceof MarketingSurvey)) {
				return new MarketingSurvey(id, siteId, wpcom);
			}
	
			if ((typeof siteId === 'undefined' ? 'undefined' : (0, _typeof3.default)(siteId)) === 'object') {
				this.wpcom = siteId;
			} else {
				this._siteId = siteId;
				this.wpcom = wpcom;
			}
	
			this._id = id;
			this._responses = {};
		}
	
		(0, _createClass3.default)(MarketingSurvey, [{
			key: 'setSiteId',
			value: function setSiteId(siteId) {
				this._siteId = siteId;
				return this;
			}
		}, {
			key: 'addResponse',
			value: function addResponse(key, value) {
				this._responses = (0, _assign2.default)({}, this._responses, (0, _defineProperty3.default)({}, key, value));
				return this;
			}
		}, {
			key: 'addResponses',
			value: function addResponses(responses) {
				this._responses = (0, _assign2.default)({}, this._responses, responses);
				return this;
			}
	
			/**
	   * Submit a marketing survey.
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Object} [body] - body object parameter
	   * @param {Function} [fn] - callback function
	   * @return {Promise} Promise
	   */
	
		}, {
			key: 'submit',
			value: function submit() {
				var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
				var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
				var fn = arguments[2];
	
				body.survey_id = this._id;
				body.site_id = body.site_id || this._siteId;
				body.survey_responses = body.survey_responses || this._responses;
				return this.wpcom.req.post('' + root, query, body, fn);
			}
		}]);
		return MarketingSurvey;
	}();
	
	exports.default = MarketingSurvey;
	module.exports = exports['default'];
	
	//# sourceMappingURL=marketing.survey.js.map

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(100);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(111);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(114);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(15);
	__webpack_require__(59);
	module.exports = __webpack_require__(113).f('iterator');

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(56);

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(116);
	__webpack_require__(14);
	__webpack_require__(125);
	__webpack_require__(126);
	module.exports = __webpack_require__(23).Symbol;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(22)
	  , has            = __webpack_require__(37)
	  , DESCRIPTORS    = __webpack_require__(31)
	  , $export        = __webpack_require__(21)
	  , redefine       = __webpack_require__(36)
	  , META           = __webpack_require__(117).KEY
	  , $fails         = __webpack_require__(32)
	  , shared         = __webpack_require__(51)
	  , setToStringTag = __webpack_require__(55)
	  , uid            = __webpack_require__(52)
	  , wks            = __webpack_require__(56)
	  , wksExt         = __webpack_require__(113)
	  , wksDefine      = __webpack_require__(118)
	  , keyOf          = __webpack_require__(119)
	  , enumKeys       = __webpack_require__(120)
	  , isArray        = __webpack_require__(121)
	  , anObject       = __webpack_require__(28)
	  , toIObject      = __webpack_require__(44)
	  , toPrimitive    = __webpack_require__(34)
	  , createDesc     = __webpack_require__(35)
	  , _create        = __webpack_require__(40)
	  , gOPNExt        = __webpack_require__(122)
	  , $GOPD          = __webpack_require__(124)
	  , $DP            = __webpack_require__(27)
	  , $keys          = __webpack_require__(42)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(123).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(83).f  = $propertyIsEnumerable;
	  __webpack_require__(82).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(20)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(26)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(52)('meta')
	  , isObject = __webpack_require__(29)
	  , has      = __webpack_require__(37)
	  , setDesc  = __webpack_require__(27).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(32)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(22)
	  , core           = __webpack_require__(23)
	  , LIBRARY        = __webpack_require__(20)
	  , wksExt         = __webpack_require__(113)
	  , defineProperty = __webpack_require__(27).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(42)
	  , toIObject = __webpack_require__(44);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(42)
	  , gOPS    = __webpack_require__(82)
	  , pIE     = __webpack_require__(83);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(46);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(44)
	  , gOPN      = __webpack_require__(123).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(43)
	  , hiddenKeys = __webpack_require__(53).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(83)
	  , createDesc     = __webpack_require__(35)
	  , toIObject      = __webpack_require__(44)
	  , toPrimitive    = __webpack_require__(34)
	  , has            = __webpack_require__(37)
	  , IE8_DOM_DEFINE = __webpack_require__(30)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(31) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(118)('asyncIterator');

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(118)('observable');

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Me;
	
	var _me = __webpack_require__(128);
	
	var _me2 = _interopRequireDefault(_me);
	
	var _me3 = __webpack_require__(129);
	
	var _me4 = _interopRequireDefault(_me3);
	
	var _me5 = __webpack_require__(130);
	
	var _me6 = _interopRequireDefault(_me5);
	
	var _me7 = __webpack_require__(131);
	
	var _me8 = _interopRequireDefault(_me7);
	
	var _me9 = __webpack_require__(134);
	
	var _me10 = _interopRequireDefault(_me9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Create `Me` instance
	 *
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function Me(wpcom) {
	  if (!(this instanceof Me)) {
	    return new Me(wpcom);
	  }
	
	  this.wpcom = wpcom;
	}
	
	/**
	 * Meta data about auth token's User
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	/**
	 * Module dependencies
	 */
	Me.prototype.get = function (query, fn) {
	  return this.wpcom.req.get('/me', query, fn);
	};
	
	/**
	 * Get user billing history.
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} [fn] - callback function
	 * @return {Function} request handler
	 */
	Me.prototype.billingHistory = function (query, fn) {
	  return this.wpcom.req.get('/me/billing-history', query, fn);
	};
	
	/**
	 * Get a list of posts of from the user's blogs
	 *
	 * *Example:*
	 *    // Get posts list
	 *    wpcom
	 *    .me()
	 *    .postsList( function( err, data ) {
	 *      // posts list data object
	 *    } );
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Me.prototype.postsList = function (query, fn) {
	  return this.wpcom.req.get('/me/posts', query, fn);
	};
	
	/**
	 * A list of the current user's sites
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Me.prototype.sites = function (query, fn) {
	  return this.wpcom.req.get('/me/sites', query, fn);
	};
	
	/**
	 * List the currently authorized user's likes
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Me.prototype.likes = function (query, fn) {
	  return this.wpcom.req.get('/me/likes', query, fn);
	};
	
	/**
	 * A list of the current user's group
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Me.prototype.groups = function (query, fn) {
	  return this.wpcom.req.get('/me/groups', query, fn);
	};
	
	/**
	 * Get current user's connected applications.
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Me.prototype.connectedApps = function (query, fn) {
	  return this.wpcom.req.get('/me/connected-applications', query, fn);
	};
	
	/**
	 * Get a list of all the keyring connections
	 * associated with the current user
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Me.prototype.keyringConnections = function (query, fn) {
	  return this.wpcom.req.get('/me/keyring-connections', query, fn);
	};
	
	/**
	 * Get a list of publicize connections
	 * that the current user has set up.
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Me.prototype.publicizeConnections = function (query, fn) {
	  return this.wpcom.req.get('/me/publicize-connections', query, fn);
	};
	
	/**
	 * Return a `MeSettings` instance.
	 *
	 * @return {MeSettings} MeSettings instance
	 */
	Me.prototype.settings = function () {
	  return new _me8.default(this.wpcom);
	};
	
	/**
	 * Return a `MeConnectedApp` instance.
	 *
	 * @param {String} id - app id
	 * @return {ConnectedApp} Me ConnectedApp instance
	 */
	Me.prototype.connectedApp = function (id) {
	  return new _me4.default(id, this.wpcom);
	};
	
	/**
	 * Return a `MePublicizeConnection` instance.
	 *
	 * @param {String} id - connection id
	 * @return {MePublicizeConnection} MeSettings instance
	 */
	Me.prototype.publicizeConnection = function (id) {
	  return new _me6.default(id, this.wpcom);
	};
	
	/**
	 * Return a `MeTwoStep` instance.
	 *
	 * @return {MeTwoStep} MeTwoStep instance
	 */
	Me.prototype.twoStep = function () {
	  return new _me10.default(this.wpcom);
	};
	
	/**
	 * Return a `MeKeyringConnection` instance.
	 *
	 * @param {String} id - connection id
	 * @return {MeKeyringConnection} MeKeyringConnection instance
	 */
	Me.prototype.keyringConnection = function (id) {
	  return new _me2.default(id, this.wpcom);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=me.js.map

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var root = '/me/keyring-connections/';
	
	var KeyringConnection = function () {
	
		/**
	  * `KeyringConnection` constructor.
	  *
	  * @param {String} keyId - the connection ID to take action on.
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Null} null
	  */
		function KeyringConnection(keyId, wpcom) {
			(0, _classCallCheck3.default)(this, KeyringConnection);
	
			if (!(this instanceof KeyringConnection)) {
				return new KeyringConnection(keyId, wpcom);
			}
			this._id = keyId;
			this.wpcom = wpcom;
		}
	
		/**
	  * Get a single Keyring connection that the current user has setup.
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Function} request handler
	  */
	
	
		(0, _createClass3.default)(KeyringConnection, [{
			key: 'get',
			value: function get(query, fn) {
				return this.wpcom.req.get(root + this._id, query, fn);
			}
	
			/**
	   * Delete the Keyring connection (and associated token) with the
	   * provided ID. Also deletes all associated publicize connections.
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'delete',
			value: function _delete(query, fn) {
				return this.wpcom.req.del(root + this._id + '/delete', query, fn);
			}
		}]);
		return KeyringConnection;
	}();
	
	exports.default = KeyringConnection;
	module.exports = exports['default'];
	
	//# sourceMappingURL=me.keyring-connection.js.map

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var root = '/me/connected-applications/';
	
	var MeConnectedApp = function () {
	
		/**
	  * `MeConnectedApp` constructor.
	  *
	  * @param {String} appId - application identifier
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Null} null
	  */
		function MeConnectedApp(appId, wpcom) {
			(0, _classCallCheck3.default)(this, MeConnectedApp);
	
			if (!(this instanceof MeConnectedApp)) {
				return new MeConnectedApp(appId, wpcom);
			}
			this._id = appId;
			this.wpcom = wpcom;
		}
	
		/**
	  * Get one of current user's connected applications.
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Function} request handler
	  */
	
	
		(0, _createClass3.default)(MeConnectedApp, [{
			key: 'get',
			value: function get(query, fn) {
				return this.wpcom.req.get(root + this._id, query, fn);
			}
	
			/**
	   * Delete the app of the  current user
	   * through of the given appId
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'delete',
			value: function _delete(query, fn) {
				return this.wpcom.req.del(root + this._id + '/delete', query, fn);
			}
		}]);
		return MeConnectedApp;
	}();
	
	exports.default = MeConnectedApp;
	module.exports = exports['default'];
	
	//# sourceMappingURL=me.connected-application.js.map

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var root = '/me/publicize-connections/';
	
	var PublicizeConnection = function () {
		/**
	 * `PublicizeConnection` constructor.
	 *
	 * @param {String} connectionId - application identifier
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
		function PublicizeConnection(connectionId, wpcom) {
			(0, _classCallCheck3.default)(this, PublicizeConnection);
	
			if (!(this instanceof PublicizeConnection)) {
				return new PublicizeConnection(connectionId, wpcom);
			}
			this._id = connectionId;
			this.wpcom = wpcom;
		}
	
		/**
	  * Get a single publicize connection that the current user has set up.
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Function} request handler
	  */
	
	
		(0, _createClass3.default)(PublicizeConnection, [{
			key: 'get',
			value: function get(query, fn) {
				return this.wpcom.req.get(root + this._id, query, fn);
			}
	
			/**
	   * Add a publicize connection belonging to the current user.
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Object} body - body object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'add',
			value: function add(query, body, fn) {
				return this.wpcom.req.post(root + 'new', query, body, fn);
			}
	
			/**
	   * Update a publicize connection belonging to the current user.
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Object} body - body object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'update',
			value: function update(query, body, fn) {
				return this.wpcom.req.put(root + this._id, query, body, fn);
			}
	
			/**
	  * Delete the app of the  current user
	  * through of the given connectionId
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Function} request handler
	  */
	
		}, {
			key: 'delete',
			value: function _delete(query, fn) {
				return this.wpcom.req.del(root + this._id + '/delete', query, fn);
			}
		}]);
		return PublicizeConnection;
	}();
	
	exports.default = PublicizeConnection;
	module.exports = exports['default'];
	
	//# sourceMappingURL=me.publicize-connection.js.map

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = MeSettings;
	
	var _meSettings = __webpack_require__(132);
	
	var _meSettings2 = _interopRequireDefault(_meSettings);
	
	var _meSettings3 = __webpack_require__(133);
	
	var _meSettings4 = _interopRequireDefault(_meSettings3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * `MeSettings` constructor.
	 *
	 * Use a `WPCOM#Me` instance to create a new `MeSettings` instance.
	 *
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	/**
	 * Module dependencies
	 */
	function MeSettings(wpcom) {
	  if (!(this instanceof MeSettings)) {
	    return new MeSettings(wpcom);
	  }
	
	  this.wpcom = wpcom;
	}
	
	/**
	 * Get settings for the current user.
	 *
	 * *Example:*
	 *    // Get settings for the current user
	 *    wpcom
	 *    .me()
	 *    .settings()
	 *    .get( function( err, data ) {
	 *      // user settings data object
	 *    } );
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	MeSettings.prototype.get = function (query, fn) {
	  return this.wpcom.req.get('/me/settings', query, fn);
	};
	
	/**
	 * Update settings of the current user
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	MeSettings.prototype.update = function (query, body, fn) {
	  return this.wpcom.req.put('/me/settings/', query, body, fn);
	};
	
	/**
	 * Return `MeProfileLinks` instance
	 *
	 * *Example:*
	 *    // Create a MeProfileLinks instance
	 *    var profile_links = wpcom.me().settings().profileLinks();
	 *
	 * @return {MeProfileLinks} MeProfileLinks instance
	 */
	MeSettings.prototype.profileLinks = function () {
	  return new _meSettings2.default(this.wpcom);
	};
	
	/**
	 * Return `MeSettingsPassword` instance
	 *
	 * @return {MeSettingsPassword} MeSettingsPassword instance
	 */
	MeSettings.prototype.password = function () {
	  return new _meSettings4.default(this.wpcom);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=me.settings.js.map

/***/ },
/* 132 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ProfileLinks;
	/**
	 * Endpoint root
	 */
	var root = '/me/settings/profile-links';
	
	/**
	 * `ProfileLinks` constructor.
	 *
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function ProfileLinks(wpcom) {
	  if (!(this instanceof ProfileLinks)) {
	    return new ProfileLinks(wpcom);
	  }
	
	  this.wpcom = wpcom;
	}
	
	/**
	 * Get profile links of the current user.
	 *
	 * *Example:*
	 *   // Get profile links of the current user
	 *    wpcom
	 *    .me()
	 *    .settings()
	 *    .profileLinks()
	 *    .get( function( err, data ) {
	 *      // profile links data
	 *    } );
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	ProfileLinks.prototype.get = function (query, fn) {
	  return this.wpcom.req.get(root, query, fn);
	};
	
	// Create `mine` alias
	ProfileLinks.prototype.mine = ProfileLinks.prototype.get;
	
	/**
	 * Add a profile link to current user.
	 *
	 * *Example:*
	 *    // Add profile link to current user
	 *    wpcom
	 *    .me()
	 *    .settings()
	 *    .profileLinks()
	 *    .add( {
	 *      title: "WordPress Blog",
	 *      value: "en.blog.wordpress.com"
	 *    }, function( err, data ) {
	 *      // profile has been added
	 *    } );
	 *
	 * @param {Array|Object} links - profile links
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	ProfileLinks.prototype.add = function (links, query, fn) {
	  // query object is optional
	  if ('function' === typeof query) {
	    fn = query;
	    query = {};
	  }
	
	  // links can be Array or an Object
	  if (!(links instanceof Array)) {
	    links = [links];
	  }
	
	  // Set api version 1.2 for this endpoint
	  query.apiVersion = '1.2';
	
	  var path = root + '/new';
	  return this.wpcom.req.post(path, query, { links: links }, fn);
	};
	
	/**
	 * Remove your ProfileLinks from a Post.
	 *
	 * *Example:*
	 *    // Remove profile link from current user
	 *    wpcom
	 *    .me()
	 *    .settings()
	 *    .profileLinks()
	 *    .del( 'example.wordpress.com', function( err, data ) {
	 *      // profile has been deleted
	 *    } );
	 *
	 * @param {String} slug - the URL of the profile link
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	ProfileLinks.prototype.del = function (slug, query, fn) {
	  var path = root + '/' + slug + '/delete';
	  return this.wpcom.req.del(path, query, fn);
	};
	
	// Create `delete` alias
	ProfileLinks.prototype.delete = ProfileLinks.prototype.del;
	module.exports = exports['default'];
	
	//# sourceMappingURL=me.settings.profile-links.js.map

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var root = '/me/settings/password/';
	
	var MeSettingsPassword = function () {
	
		/**
	  * `MeSettingsPassword` constructor.
	  *
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Null} null
	  */
		function MeSettingsPassword(wpcom) {
			(0, _classCallCheck3.default)(this, MeSettingsPassword);
	
			if (!(this instanceof MeSettingsPassword)) {
				return new MeSettingsPassword(wpcom);
			}
			this.wpcom = wpcom;
		}
	
		/**
	  * Verify strength of a user's new password.
	  *
	  * @param {String} password - the users's potential new password
	  * @param {Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Function} request handler
	  */
	
	
		(0, _createClass3.default)(MeSettingsPassword, [{
			key: 'validate',
			value: function validate(password, query, fn) {
				return this.wpcom.req.post(root + 'validate', query, { password: password }, fn);
			}
		}]);
		return MeSettingsPassword;
	}();
	
	exports.default = MeSettingsPassword;
	module.exports = exports['default'];
	
	//# sourceMappingURL=me.settings.password.js.map

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _meTwoStep = __webpack_require__(135);
	
	var _meTwoStep2 = _interopRequireDefault(_meTwoStep);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var root = '/me/two-step/'; /**
	                             * Module dependencies
	                             */
	
	var MeTwoStep = function () {
	
		/**
	  * `MeTwoStep` constructor.
	  *
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Null} null
	  */
		function MeTwoStep(wpcom) {
			(0, _classCallCheck3.default)(this, MeTwoStep);
	
			if (!(this instanceof MeTwoStep)) {
				return new MeTwoStep(wpcom);
			}
			this.wpcom = wpcom;
		}
	
		/**
	  * Get information about current user's two factor configuration.
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Function} request handler
	  */
	
	
		(0, _createClass3.default)(MeTwoStep, [{
			key: 'get',
			value: function get(query, fn) {
				return this.wpcom.req.get(root, query, fn);
			}
	
			/**
	   * Return a `MeTwoStepSMS` instance.
	   *
	   * @return {MeTwoStepSMS} MeTwoStepSMS instance
	   */
	
		}, {
			key: 'sms',
			value: function sms() {
				return new _meTwoStep2.default(this.wpcom);
			}
		}]);
		return MeTwoStep;
	}();
	
	exports.default = MeTwoStep;
	module.exports = exports['default'];
	
	//# sourceMappingURL=me.two-step.js.map

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var root = '/me/two-step/sms/';
	
	var MeTwoStepSMS = function () {
	
		/**
	  * `MeTwoStepSMS` constructor.
	  *
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Null} null
	  */
		function MeTwoStepSMS(wpcom) {
			(0, _classCallCheck3.default)(this, MeTwoStepSMS);
	
			if (!(this instanceof MeTwoStepSMS)) {
				return new MeTwoStepSMS(wpcom);
			}
			this.wpcom = wpcom;
		}
	
		/**
	  * Sends a two-step code via SMS to the current user.
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Function} request handler
	  */
	
	
		(0, _createClass3.default)(MeTwoStepSMS, [{
			key: 'send',
			value: function send(query, fn) {
				return this.wpcom.req.post(root + 'new', query, fn);
			}
		}]);
		return MeTwoStepSMS;
	}();
	
	exports.default = MeTwoStepSMS;
	module.exports = exports['default'];
	
	//# sourceMappingURL=me.two-step.sms.js.map

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Pinghub;
	
	var _debug = __webpack_require__(94);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var debug = (0, _debug2.default)('wpcom:pinghub');
	
	/**
	 * Create a `Pinghub` instance
	 *
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {null} null
	 * @api public
	 */
	/**
	 * Module dependencies.
	 */
	function Pinghub(wpcom) {
		if (!(this instanceof Pinghub)) {
			return new Pinghub(wpcom);
		}
	
		this.wpcom = wpcom;
		this.conns = {};
	}
	
	/**
	 * Open a websocket to Pinghub
	 *
	 * @param {String} path - request path
	 * @param {Function} fn - callback function
	 * @api public
	 */
	Pinghub.prototype.connect = function (path, fn) {
		debug('connect', path, fn);
		var pinghub = this,
		    params = {
			action: 'connect',
			path: '/pinghub' + path
		},
		    errorCallback = function errorCallback() {},
		    // we want an xhr, not a promise
		xhr = this.conns[path] = this.wpcom.req.get(params, errorCallback);
		xhr.onload = function (e) {
			debug('onload', path, e);
			fn(null, e);
		};
		xhr.onerror = xhr.onabort = xhr.onclose = function (e) {
			debug('onerror', path, e);
			pinghub.remove(path);
			fn(e, null);
		};
	};
	
	/**
	 * Close a websocket connection (unsubscribe)
	 *
	 * @param {String} path - request path
	 * @api public
	 */
	Pinghub.prototype.disconnect = function (path) {
		debug('disconnect', path);
		var params = {
			action: 'disconnect',
			path: '/pinghub' + path
		},
		    errorCallback = function errorCallback() {}; // no promises
		this.wpcom.req.get(params, errorCallback);
	};
	
	/**
	 * Remove a dead connection
	 *
	 * @param {String} path - pinghub channel
	 * @api private
	 */
	Pinghub.prototype.remove = function (path) {
		debug('remove', path);
		delete this.conns[path];
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=pinghub.js.map

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var root = '/plans';
	
	var Plans = function () {
		/**
	  * `Plans` constructor.
	  *
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Undefined} undefined
	  */
		function Plans(wpcom) {
			(0, _classCallCheck3.default)(this, Plans);
	
			if (!(this instanceof Plans)) {
				return new Plans(wpcom);
			}
			this.wpcom = wpcom;
		}
	
		/**
	  * Get a list of active WordPress.com plans
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Function} [fn] - callback function
	  * @return {Promise} Promise
	  */
	
	
		(0, _createClass3.default)(Plans, [{
			key: 'list',
			value: function list(query, fn) {
				return this.wpcom.req.get(root, query, fn);
			}
	
			/**
	   * Get a list of features for active WordPress.com plans
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} [fn] - callback function
	   * @return {Promise} Promise
	   */
	
		}, {
			key: 'features',
			value: function features(query, fn) {
				return this.wpcom.req.get(root + '/features', query, fn);
			}
		}]);
		return Plans;
	}();
	
	exports.default = Plans;
	module.exports = exports['default'];
	
	//# sourceMappingURL=plans.js.map

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Req;
	
	var _sendRequest = __webpack_require__(139);
	
	var _sendRequest2 = _interopRequireDefault(_sendRequest);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Expose `Request` module
	 * @param {WPCOM} wpcom - wpcom instance
	 */
	function Req(wpcom) {
		this.wpcom = wpcom;
	}
	
	/**
	 * Request methods
	 *
	 * @param {Object|String} params - params object
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	/**
	 * Module dependencies.
	 */
	Req.prototype.get = function (params, query, fn) {
		// `query` is optional
		if ('function' === typeof query) {
			fn = query;
			query = {};
		}
	
		return _sendRequest2.default.call(this.wpcom, params, query, null, fn);
	};
	
	/**
	 * Make `update` request
	 *
	 * @param {Object|String} params
	 * @param {Object} [query] - query object parameter
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 */
	Req.prototype.post = Req.prototype.put = function (params, query, body, fn) {
		if (undefined === fn) {
			if (undefined === body) {
				body = query;
				query = {};
			} else if ('function' === typeof body) {
				fn = body;
				body = query;
				query = {};
			}
		}
	
		// params can be a string
		params = 'string' === typeof params ? { path: params } : params;
	
		// request method
		params.method = 'post';
	
		return _sendRequest2.default.call(this.wpcom, params, query, body, fn);
	};
	
	/**
	 * Make a `delete` request
	 *
	 * @param {Object|String} params - params object
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Req.prototype.del = function (params, query, fn) {
		if ('function' === typeof query) {
			fn = query;
			query = {};
		}
	
		return this.post(params, query, null, fn);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=request.js.map

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _promise = __webpack_require__(12);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	exports.default = sendRequest;
	
	var _qs = __webpack_require__(140);
	
	var _qs2 = _interopRequireDefault(_qs);
	
	var _debug = __webpack_require__(94);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module dependencies
	 */
	var debug = (0, _debug2.default)('wpcom:send-request');
	var debug_res = (0, _debug2.default)('wpcom:send-request:res');
	
	/**
	 * Request to WordPress REST API
	 *
	 * @param {String|Object} params - params object
	 * @param {Object} [query] - query object parameter
	 * @param {Object} [body] - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	function sendRequest(params, query, body, fn) {
		var _this = this;
	
		// `params` can be just the path ( String )
		params = 'string' === typeof params ? { path: params } : params;
	
		debug('sendRequest(%o )', params.path);
	
		// set `method` request param
		params.method = (params.method || 'get').toUpperCase();
	
		// `query` is optional
		if ('function' === typeof query) {
			fn = query;
			query = {};
		}
	
		// `body` is optional
		if ('function' === typeof body) {
			fn = body;
			body = null;
		}
	
		// query could be `null`
		query = query || {};
	
		// Handle special query parameters
		// - `apiVersion`
		if (query.apiVersion) {
			params.apiVersion = query.apiVersion;
			debug('apiVersion: %o', params.apiVersion);
			delete query.apiVersion;
		} else {
			params.apiVersion = this.apiVersion;
		}
	
		// - `apiNamespace`
		if (query.apiNamespace) {
			params.apiNamespace = query.apiNamespace;
			debug('apiNamespace: %o', params.apiNamespace);
			delete query.apiNamespace;
		}
	
		// - `proxyOrigin`
		if (query.proxyOrigin) {
			params.proxyOrigin = query.proxyOrigin;
			debug('proxyOrigin: %o', params.proxyOrigin);
			delete query.proxyOrigin;
		}
	
		// Stringify query object before to send
		query = _qs2.default.stringify(query, { arrayFormat: 'brackets' });
	
		// pass `query` and/or `body` to request params
		params.query = query;
	
		if (body) {
			params.body = body;
		}
		debug('params: %o', params);
	
		// if callback is provided, behave traditionally
		if ('function' === typeof fn) {
			// request method
			return this.request(params, function (err, res) {
				debug_res(res);
				fn(err, res);
			});
		}
	
		// but if not, return a Promise
		return new _promise2.default(function (resolve, reject) {
			_this.request(params, function (err, res) {
				debug_res(res);
				err ? reject(err) : resolve(res);
			});
		});
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=send-request.js.map

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Stringify = __webpack_require__(141);
	var Parse = __webpack_require__(143);
	
	
	// Declare internals
	
	var internals = {};
	
	
	module.exports = {
	    stringify: Stringify,
	    parse: Parse
	};


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Utils = __webpack_require__(142);
	
	
	// Declare internals
	
	var internals = {
	    delimiter: '&',
	    arrayPrefixGenerators: {
	        brackets: function (prefix, key) {
	
	            return prefix + '[]';
	        },
	        indices: function (prefix, key) {
	
	            return prefix + '[' + key + ']';
	        },
	        repeat: function (prefix, key) {
	
	            return prefix;
	        }
	    },
	    strictNullHandling: false
	};
	
	
	internals.stringify = function (obj, prefix, generateArrayPrefix, strictNullHandling, filter) {
	
	    if (typeof filter === 'function') {
	        obj = filter(prefix, obj);
	    }
	    else if (Utils.isBuffer(obj)) {
	        obj = obj.toString();
	    }
	    else if (obj instanceof Date) {
	        obj = obj.toISOString();
	    }
	    else if (obj === null) {
	        if (strictNullHandling) {
	            return Utils.encode(prefix);
	        }
	
	        obj = '';
	    }
	
	    if (typeof obj === 'string' ||
	        typeof obj === 'number' ||
	        typeof obj === 'boolean') {
	
	        return [Utils.encode(prefix) + '=' + Utils.encode(obj)];
	    }
	
	    var values = [];
	
	    if (typeof obj === 'undefined') {
	        return values;
	    }
	
	    var objKeys = Array.isArray(filter) ? filter : Object.keys(obj);
	    for (var i = 0, il = objKeys.length; i < il; ++i) {
	        var key = objKeys[i];
	
	        if (Array.isArray(obj)) {
	            values = values.concat(internals.stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, filter));
	        }
	        else {
	            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', generateArrayPrefix, strictNullHandling, filter));
	        }
	    }
	
	    return values;
	};
	
	
	module.exports = function (obj, options) {
	
	    options = options || {};
	    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;
	    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : internals.strictNullHandling;
	    var objKeys;
	    var filter;
	    if (typeof options.filter === 'function') {
	        filter = options.filter;
	        obj = filter('', obj);
	    }
	    else if (Array.isArray(options.filter)) {
	        objKeys = filter = options.filter;
	    }
	
	    var keys = [];
	
	    if (typeof obj !== 'object' ||
	        obj === null) {
	
	        return '';
	    }
	
	    var arrayFormat;
	    if (options.arrayFormat in internals.arrayPrefixGenerators) {
	        arrayFormat = options.arrayFormat;
	    }
	    else if ('indices' in options) {
	        arrayFormat = options.indices ? 'indices' : 'repeat';
	    }
	    else {
	        arrayFormat = 'indices';
	    }
	
	    var generateArrayPrefix = internals.arrayPrefixGenerators[arrayFormat];
	
	    if (!objKeys) {
	        objKeys = Object.keys(obj);
	    }
	    for (var i = 0, il = objKeys.length; i < il; ++i) {
	        var key = objKeys[i];
	        keys = keys.concat(internals.stringify(obj[key], key, generateArrayPrefix, strictNullHandling, filter));
	    }
	
	    return keys.join(delimiter);
	};


/***/ },
/* 142 */
/***/ function(module, exports) {

	// Load modules
	
	
	// Declare internals
	
	var internals = {};
	internals.hexTable = new Array(256);
	for (var h = 0; h < 256; ++h) {
	    internals.hexTable[h] = '%' + ((h < 16 ? '0' : '') + h.toString(16)).toUpperCase();
	}
	
	
	exports.arrayToObject = function (source, options) {
	
	    var obj = options.plainObjects ? Object.create(null) : {};
	    for (var i = 0, il = source.length; i < il; ++i) {
	        if (typeof source[i] !== 'undefined') {
	
	            obj[i] = source[i];
	        }
	    }
	
	    return obj;
	};
	
	
	exports.merge = function (target, source, options) {
	
	    if (!source) {
	        return target;
	    }
	
	    if (typeof source !== 'object') {
	        if (Array.isArray(target)) {
	            target.push(source);
	        }
	        else if (typeof target === 'object') {
	            target[source] = true;
	        }
	        else {
	            target = [target, source];
	        }
	
	        return target;
	    }
	
	    if (typeof target !== 'object') {
	        target = [target].concat(source);
	        return target;
	    }
	
	    if (Array.isArray(target) &&
	        !Array.isArray(source)) {
	
	        target = exports.arrayToObject(target, options);
	    }
	
	    var keys = Object.keys(source);
	    for (var k = 0, kl = keys.length; k < kl; ++k) {
	        var key = keys[k];
	        var value = source[key];
	
	        if (!Object.prototype.hasOwnProperty.call(target, key)) {
	            target[key] = value;
	        }
	        else {
	            target[key] = exports.merge(target[key], value, options);
	        }
	    }
	
	    return target;
	};
	
	
	exports.decode = function (str) {
	
	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};
	
	exports.encode = function (str) {
	
	    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	    // It has been adapted here for stricter adherence to RFC 3986
	    if (str.length === 0) {
	        return str;
	    }
	
	    if (typeof str !== 'string') {
	        str = '' + str;
	    }
	
	    var out = '';
	    for (var i = 0, il = str.length; i < il; ++i) {
	        var c = str.charCodeAt(i);
	
	        if (c === 0x2D || // -
	            c === 0x2E || // .
	            c === 0x5F || // _
	            c === 0x7E || // ~
	            (c >= 0x30 && c <= 0x39) || // 0-9
	            (c >= 0x41 && c <= 0x5A) || // a-z
	            (c >= 0x61 && c <= 0x7A)) { // A-Z
	
	            out += str[i];
	            continue;
	        }
	
	        if (c < 0x80) {
	            out += internals.hexTable[c];
	            continue;
	        }
	
	        if (c < 0x800) {
	            out += internals.hexTable[0xC0 | (c >> 6)] + internals.hexTable[0x80 | (c & 0x3F)];
	            continue;
	        }
	
	        if (c < 0xD800 || c >= 0xE000) {
	            out += internals.hexTable[0xE0 | (c >> 12)] + internals.hexTable[0x80 | ((c >> 6) & 0x3F)] + internals.hexTable[0x80 | (c & 0x3F)];
	            continue;
	        }
	
	        ++i;
	        c = 0x10000 + (((c & 0x3FF) << 10) | (str.charCodeAt(i) & 0x3FF));
	        out += internals.hexTable[0xF0 | (c >> 18)] + internals.hexTable[0x80 | ((c >> 12) & 0x3F)] + internals.hexTable[0x80 | ((c >> 6) & 0x3F)] + internals.hexTable[0x80 | (c & 0x3F)];
	    }
	
	    return out;
	};
	
	exports.compact = function (obj, refs) {
	
	    if (typeof obj !== 'object' ||
	        obj === null) {
	
	        return obj;
	    }
	
	    refs = refs || [];
	    var lookup = refs.indexOf(obj);
	    if (lookup !== -1) {
	        return refs[lookup];
	    }
	
	    refs.push(obj);
	
	    if (Array.isArray(obj)) {
	        var compacted = [];
	
	        for (var i = 0, il = obj.length; i < il; ++i) {
	            if (typeof obj[i] !== 'undefined') {
	                compacted.push(obj[i]);
	            }
	        }
	
	        return compacted;
	    }
	
	    var keys = Object.keys(obj);
	    for (i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        obj[key] = exports.compact(obj[key], refs);
	    }
	
	    return obj;
	};
	
	
	exports.isRegExp = function (obj) {
	
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};
	
	
	exports.isBuffer = function (obj) {
	
	    if (obj === null ||
	        typeof obj === 'undefined') {
	
	        return false;
	    }
	
	    return !!(obj.constructor &&
	              obj.constructor.isBuffer &&
	              obj.constructor.isBuffer(obj));
	};


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Utils = __webpack_require__(142);
	
	
	// Declare internals
	
	var internals = {
	    delimiter: '&',
	    depth: 5,
	    arrayLimit: 20,
	    parameterLimit: 1000,
	    strictNullHandling: false,
	    plainObjects: false,
	    allowPrototypes: false
	};
	
	
	internals.parseValues = function (str, options) {
	
	    var obj = {};
	    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);
	
	    for (var i = 0, il = parts.length; i < il; ++i) {
	        var part = parts[i];
	        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;
	
	        if (pos === -1) {
	            obj[Utils.decode(part)] = '';
	
	            if (options.strictNullHandling) {
	                obj[Utils.decode(part)] = null;
	            }
	        }
	        else {
	            var key = Utils.decode(part.slice(0, pos));
	            var val = Utils.decode(part.slice(pos + 1));
	
	            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
	                obj[key] = val;
	            }
	            else {
	                obj[key] = [].concat(obj[key]).concat(val);
	            }
	        }
	    }
	
	    return obj;
	};
	
	
	internals.parseObject = function (chain, val, options) {
	
	    if (!chain.length) {
	        return val;
	    }
	
	    var root = chain.shift();
	
	    var obj;
	    if (root === '[]') {
	        obj = [];
	        obj = obj.concat(internals.parseObject(chain, val, options));
	    }
	    else {
	        obj = options.plainObjects ? Object.create(null) : {};
	        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
	        var index = parseInt(cleanRoot, 10);
	        var indexString = '' + index;
	        if (!isNaN(index) &&
	            root !== cleanRoot &&
	            indexString === cleanRoot &&
	            index >= 0 &&
	            (options.parseArrays &&
	             index <= options.arrayLimit)) {
	
	            obj = [];
	            obj[index] = internals.parseObject(chain, val, options);
	        }
	        else {
	            obj[cleanRoot] = internals.parseObject(chain, val, options);
	        }
	    }
	
	    return obj;
	};
	
	
	internals.parseKeys = function (key, val, options) {
	
	    if (!key) {
	        return;
	    }
	
	    // Transform dot notation to bracket notation
	
	    if (options.allowDots) {
	        key = key.replace(/\.([^\.\[]+)/g, '[$1]');
	    }
	
	    // The regex chunks
	
	    var parent = /^([^\[\]]*)/;
	    var child = /(\[[^\[\]]*\])/g;
	
	    // Get the parent
	
	    var segment = parent.exec(key);
	
	    // Stash the parent if it exists
	
	    var keys = [];
	    if (segment[1]) {
	        // If we aren't using plain objects, optionally prefix keys
	        // that would overwrite object prototype properties
	        if (!options.plainObjects &&
	            Object.prototype.hasOwnProperty(segment[1])) {
	
	            if (!options.allowPrototypes) {
	                return;
	            }
	        }
	
	        keys.push(segment[1]);
	    }
	
	    // Loop through children appending to the array until we hit depth
	
	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {
	
	        ++i;
	        if (!options.plainObjects &&
	            Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
	
	            if (!options.allowPrototypes) {
	                continue;
	            }
	        }
	        keys.push(segment[1]);
	    }
	
	    // If there's a remainder, just add whatever is left
	
	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }
	
	    return internals.parseObject(keys, val, options);
	};
	
	
	module.exports = function (str, options) {
	
	    options = options || {};
	    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
	    options.parseArrays = options.parseArrays !== false;
	    options.allowDots = options.allowDots !== false;
	    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : internals.plainObjects;
	    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : internals.allowPrototypes;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;
	    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : internals.strictNullHandling;
	
	    if (str === '' ||
	        str === null ||
	        typeof str === 'undefined') {
	
	        return options.plainObjects ? Object.create(null) : {};
	    }
	
	    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
	    var obj = options.plainObjects ? Object.create(null) : {};
	
	    // Iterate over the keys and setup the new object
	
	    var keys = Object.keys(tempObj);
	    for (var i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        var newObj = internals.parseKeys(key, tempObj[key], options);
	        obj = Utils.merge(obj, newObj, options);
	    }
	
	    return Utils.compact(obj);
	};


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _site = __webpack_require__(145);
	
	var _site2 = _interopRequireDefault(_site);
	
	var _site3 = __webpack_require__(146);
	
	var _site4 = _interopRequireDefault(_site3);
	
	var _site5 = __webpack_require__(148);
	
	var _site6 = _interopRequireDefault(_site5);
	
	var _site7 = __webpack_require__(149);
	
	var _site8 = _interopRequireDefault(_site7);
	
	var _site9 = __webpack_require__(151);
	
	var _site10 = _interopRequireDefault(_site9);
	
	var _site11 = __webpack_require__(157);
	
	var _site12 = _interopRequireDefault(_site11);
	
	var _site13 = __webpack_require__(158);
	
	var _site14 = _interopRequireDefault(_site13);
	
	var _site15 = __webpack_require__(159);
	
	var _site16 = _interopRequireDefault(_site15);
	
	var _site17 = __webpack_require__(160);
	
	var _site18 = _interopRequireDefault(_site17);
	
	var _site19 = __webpack_require__(161);
	
	var _site20 = _interopRequireDefault(_site19);
	
	var _site21 = __webpack_require__(162);
	
	var _site22 = _interopRequireDefault(_site21);
	
	var _site23 = __webpack_require__(164);
	
	var _site24 = _interopRequireDefault(_site23);
	
	var _site25 = __webpack_require__(165);
	
	var _site26 = _interopRequireDefault(_site25);
	
	var _site27 = __webpack_require__(169);
	
	var _site28 = _interopRequireDefault(_site27);
	
	var _site29 = __webpack_require__(170);
	
	var _site30 = _interopRequireDefault(_site29);
	
	var _runtimeBuilder = __webpack_require__(155);
	
	var _runtimeBuilder2 = _interopRequireDefault(_runtimeBuilder);
	
	var _debug = __webpack_require__(94);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module vars
	 */
	var debug = (0, _debug2.default)('wpcom:site'); /**
	                                                 * Module dependencies.
	                                                 */
	
	var root = '/sites';
	
	/**
	 * Site class
	 */
	
	var Site = function () {
		/**
	  * Create a Site instance
	  *
	  * @param {String} id - site id
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Null} null
	  */
		function Site(id, wpcom) {
			(0, _classCallCheck3.default)(this, Site);
	
			if (!(this instanceof Site)) {
				return new Site(id, wpcom);
			}
	
			this.wpcom = wpcom;
	
			debug('set %o site id', id);
			this._id = encodeURIComponent(id);
			this.path = root + '/' + this._id;
		}
	
		/**
	  * Require site information
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Function} request handler
	  */
	
	
		(0, _createClass3.default)(Site, [{
			key: 'get',
			value: function get(query, fn) {
				return this.wpcom.req.get(this.path, query, fn);
			}
	
			/**
	   * Create a `Post` instance
	   *
	   * @param {String} id - post id
	   * @return {Post} Post instance
	   */
	
		}, {
			key: 'post',
			value: function post(id) {
				return new _site10.default(id, this._id, this.wpcom);
			}
	
			/**
	   * Add a new blog post
	   *
	   * @param {Object} body - body object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'addPost',
			value: function addPost(body, fn) {
				var post = new _site10.default(null, this._id, this.wpcom);
				return post.add(body, fn);
			}
	
			/**
	   * Delete a blog post
	   *
	   * @param {String} id - post id
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'deletePost',
			value: function deletePost(id, fn) {
				var post = new _site10.default(id, this._id, this.wpcom);
				return post.delete(fn);
			}
	
			/**
	   * Create a `Media` instance
	   *
	   * @param {String} id - post id
	   * @return {Media} Media instance
	   */
	
		}, {
			key: 'media',
			value: function media(id) {
				return new _site8.default(id, this._id, this.wpcom);
			}
	
			/**
	   * Add a media from a file
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Array|String} files - media files to add
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'addMediaFiles',
			value: function addMediaFiles(query, files, fn) {
				var media = new _site8.default(null, this._id, this.wpcom);
				return media.addFiles(query, files, fn);
			}
	
			/**
	   * Add a new media from url
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Array|String} files - media files to add
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'addMediaUrls',
			value: function addMediaUrls(query, files, fn) {
				var media = new _site8.default(null, this._id, this.wpcom);
				return media.addUrls(query, files, fn);
			}
	
			/**
	   * Delete a blog media
	   *
	   * @param {String} id - media id
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'deleteMedia',
			value: function deleteMedia(id, fn) {
				var media = new _site8.default(id, this._id, this.wpcom);
				return media.del(fn);
			}
	
			/**
	   * Create a `Comment` instance
	   *
	   * @param {String} id - comment id
	   * @return {Comment} Comment instance
	   */
	
		}, {
			key: 'comment',
			value: function comment(id) {
				return new _site4.default(id, null, this._id, this.wpcom);
			}
	
			/**
	   * Create a `Follow` instance
	   *
	   * @return {Follow} Follow instance
	   */
	
		}, {
			key: 'follow',
			value: function follow() {
				return new _site6.default(this._id, this.wpcom);
			}
	
			/**
	   * Create a `SitePlugin` instance
	   *
	   * @param {String} slug - plugin identifier
	   * @return {SitePlugin} SitePlugin instance
	   */
	
		}, {
			key: 'plugin',
			value: function plugin(slug) {
				return new _site18.default(slug, this._id, this.wpcom);
			}
	
			/**
	   * Create a `SiteWPComPlugin` instance
	   *
	   * @param {String} slug - plugin identifier
	   * @return {SiteWPComPlugin} SiteWPComPlugin instance
	   */
	
		}, {
			key: 'wpcomPlugin',
			value: function wpcomPlugin(slug) {
				return new _site28.default(slug, this._id, this.wpcom);
			}
	
			/**
	   * Create a `Category` instance
	   * Set `cat` alias
	   *
	   * @param {String} [slug] - category slug
	   * @return {Category} Category instance
	   */
	
		}, {
			key: 'category',
			value: function category(slug) {
				return new _site2.default(slug, this._id, this.wpcom);
			}
	
			/**
	   * Create a `Tag` instance
	   *
	   * @param {String} [slug] - tag slug
	   * @return {Tag} Tag instance
	   */
	
		}, {
			key: 'tag',
			value: function tag(slug) {
				return new _site12.default(slug, this._id, this.wpcom);
			}
	
			/**
	   * Create a `Taxonomy` instance
	   *
	   * @param {String} [slug] - taxonomy slug
	   * @return {SiteTaxonomy} SiteTaxonomy instance
	   */
	
		}, {
			key: 'taxonomy',
			value: function taxonomy(slug) {
				return new _site22.default(slug, this._id, this.wpcom);
			}
	
			/**
	   * Create a `SiteCreditVouchers` instance
	   *
	   * @return {SiteCreditVouchers} SiteCreditVouchers instance
	   */
	
		}, {
			key: 'creditVouchers',
			value: function creditVouchers() {
				return new _site24.default(this._id, this.wpcom);
			}
	
			/**
	   * Create a `SitePostType` instance
	   *
	   * @param {String} [slug] - post type slug
	   * @return {SitePostType} SitePostType instance
	   */
	
		}, {
			key: 'postType',
			value: function postType(slug) {
				return new _site14.default(slug, this._id, this.wpcom);
			}
	
			/**
	   * Create a `SiteSettings` instance
	   *
	   * @return {SiteSettings} SiteSettings instance
	   */
	
		}, {
			key: 'settings',
			value: function settings() {
				return new _site20.default(this._id, this.wpcom);
			}
	
			/**
	   * Create a `SiteDomain` instance
	   *
	   * @return {SiteDomain} SiteDomain instance
	   */
	
		}, {
			key: 'domain',
			value: function domain() {
				return new _site16.default(this._id, this.wpcom);
			}
	
			/**
	   * Get number of posts in the post type groups by post status
	   *
	   * *Example:*
	   *   // Get number post of pages
	   *    wpcom
	   *    .site( 'my-blog.wordpress.com' )
	   *    .postCounts( 'page', function( err, data ) {
	   *      // `counts` data object
	   *    } );
	   *
	   * @param {String} type - post type
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'postCounts',
			value: function postCounts() {
				var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'post';
				var query = arguments[1];
				var fn = arguments[2];
	
				if ('function' === typeof query) {
					fn = query;
					query = {};
				}
	
				return this.wpcom.req.get(this.path + '/post-counts/' + type, query, fn);
			}
	
			/**
	   * Get a rendered shortcode for a site.
	   *
	   * Note: The current user must have publishing access.
	   *
	   * @param {String} url - shortcode url
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'renderShortcode',
			value: function renderShortcode(url, query, fn) {
				if ('string' !== typeof url) {
					throw new TypeError('expected a url String');
				}
	
				if ('function' === typeof query) {
					fn = query;
					query = {};
				}
	
				query = query || {};
				query.shortcode = url;
	
				return this.wpcom.req.get(this.path + '/shortcodes/render', query, fn);
			}
	
			/**
	   * Get a rendered embed for a site.
	   *
	   * Note: The current user must have publishing access.
	   *
	   * @param {String} url - embed url
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'renderEmbed',
			value: function renderEmbed(url, query, fn) {
				if ('string' !== typeof url) {
					throw new TypeError('expected an embed String');
				}
	
				if ('function' === typeof query) {
					fn = query;
					query = {};
				}
	
				query = query || {};
				query.embed_url = url;
	
				return this.wpcom.req.get(this.path + '/embeds/render', query, fn);
			}
	
			/**
	   * Mark a referrering domain as spam
	   *
	   * @param {String} domain - domain
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'statsReferrersSpamNew',
			value: function statsReferrersSpamNew(domain, fn) {
				var path = this.path + '/stats/referrers/spam/new';
				return this.wpcom.req.post(path, { domain: domain }, null, fn);
			}
	
			/**
	   * Remove referrering domain from spam
	   *
	   * @param {String} domain - domain
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'statsReferrersSpamDelete',
			value: function statsReferrersSpamDelete(domain, fn) {
				var path = this.path + '/stats/referrers/spam/delete';
				return this.wpcom.req.post(path, { domain: domain }, null, fn);
			}
	
			/**
	   * Get detailed stats about a VideoPress video
	   *
	   * @param {String} videoId - video id
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'statsVideo',
			value: function statsVideo(videoId, query, fn) {
				var path = this.path + '/stats/video/' + videoId;
	
				if ('function' === typeof query) {
					fn = query;
					query = {};
				}
	
				return this.wpcom.req.get(path, query, fn);
			}
	
			/**
	   * Get detailed stats about a particular post
	   *
	   * @param {String} postId - post id
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'statsPostViews',
			value: function statsPostViews(postId, query, fn) {
				var path = this.path + '/stats/post/' + postId;
	
				if ('function' === typeof query) {
					fn = query;
					query = {};
				}
	
				return this.wpcom.req.get(path, query, fn);
			}
	
			/**
	   * Return a `SiteWordAds` instance.
	   *
	   * *Example:*
	   *    // Create a SiteWordAds instance
	   *
	   *    const wordAds = wpcom
	   *      .site( 'my-blog.wordpress.com' )
	   *      .wordAds();
	   *
	   * @return {SiteWordAds} SiteWordAds instance
	   */
	
		}, {
			key: 'wordAds',
			value: function wordAds() {
				return new _site26.default(this._id, this.wpcom);
			}
		}]);
		return Site;
	}();
	
	// add methods in runtime
	
	
	(0, _runtimeBuilder2.default)(Site, _site30.default, function (methodParams, ctx) {
		return '/sites/' + ctx._id + '/' + methodParams.subpath;
	});
	
	exports.default = Site;
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.js.map

/***/ },
/* 145 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Category;
	/**
	 * Category methods
	 *
	 * @param {String} [slug] - category slug
	 * @param {String} sid - site id
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function Category(slug, sid, wpcom) {
	  if (!sid) {
	    throw new Error('`site id` is not correctly defined');
	  }
	
	  if (!(this instanceof Category)) {
	    return new Category(slug, sid, wpcom);
	  }
	
	  this.wpcom = wpcom;
	  this._sid = sid;
	  this._slug = slug;
	}
	
	/**
	 * Set category `slug`
	 *
	 * @param {String} slug - category slug
	 */
	Category.prototype.slug = function (slug) {
	  this._slug = slug;
	};
	
	/**
	 * Get category
	 *
	 * @param {Object} [query] - query object parameter - query object parameter
	 * @param {Function} fn - callback function - callback
	 * @return {Function} request handler
	 */
	Category.prototype.get = function (query, fn) {
	  var path = '/sites/' + this._sid + '/categories/slug:' + this._slug;
	  return this.wpcom.req.get(path, query, fn);
	};
	
	/**
	 * Add category
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Category.prototype.add = function (query, body, fn) {
	  var path = '/sites/' + this._sid + '/categories/new';
	  return this.wpcom.req.post(path, query, body, fn);
	};
	
	/**
	 * Edit category
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Category.prototype.update = function (query, body, fn) {
	  var path = '/sites/' + this._sid + '/categories/slug:' + this._slug;
	  return this.wpcom.req.put(path, query, body, fn);
	};
	
	/**
	 * Delete category
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Category.prototype.delete = Category.prototype.del = function (query, fn) {
	  var path = '/sites/' + this._sid + '/categories/slug:' + this._slug + '/delete';
	  return this.wpcom.req.del(path, query, fn);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.category.js.map

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Comment;
	
	var _siteComment = __webpack_require__(147);
	
	var _siteComment2 = _interopRequireDefault(_siteComment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Comment methods
	 *
	 * @param {String} [cid] comment id
	 * @param {String} [pid] post id
	 * @param {String} sid site id
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function Comment(cid, pid, sid, wpcom) {
	  if (!sid) {
	    throw new Error('`site id` is not correctly defined');
	  }
	
	  if (!(this instanceof Comment)) {
	    return new Comment(cid, pid, sid, wpcom);
	  }
	
	  this.wpcom = wpcom;
	  this._cid = cid;
	  this._pid = pid;
	  this._sid = sid;
	}
	
	/**
	 * Return a single Comment
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	/**
	 * Module dependencies.
	 */
	Comment.prototype.get = function (query, fn) {
	  var path = '/sites/' + this._sid + '/comments/' + this._cid;
	  return this.wpcom.req.get(path, query, fn);
	};
	
	/**
	 * Return recent comments for a post
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Comment.prototype.replies = function (query, fn) {
	  var path = '/sites/' + this._sid + '/posts/' + this._pid + '/replies/';
	  return this.wpcom.req.get(path, query, fn);
	};
	
	/**
	 * Create a comment on a post
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {String|Object} body - body parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Comment.prototype.add = function (query, body, fn) {
	  if (undefined === fn) {
	    if (undefined === body) {
	      body = query;
	      query = {};
	    } else if ('function' === typeof body) {
	      fn = body;
	      body = query;
	      query = {};
	    }
	  }
	
	  body = 'string' === typeof body ? { content: body } : body;
	
	  var path = '/sites/' + this._sid + '/posts/' + this._pid + '/replies/new';
	  return this.wpcom.req.post(path, query, body, fn);
	};
	
	/**
	 * Edit a comment
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {String|Object} body - body parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Comment.prototype.update = function (query, body, fn) {
	  if ('function' === typeof body) {
	    fn = body;
	    body = query;
	    query = {};
	  }
	
	  body = 'string' === typeof body ? { content: body } : body;
	
	  var path = '/sites/' + this._sid + '/comments/' + this._cid;
	  return this.wpcom.req.put(path, query, body, fn);
	};
	
	/**
	 * Create a Comment as a reply to another Comment
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {String|Object} body - body parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Comment.prototype.reply = function (query, body, fn) {
	  if ('function' === typeof body) {
	    fn = body;
	    body = query;
	    query = {};
	  }
	
	  body = 'string' === typeof body ? { content: body } : body;
	
	  var path = '/sites/' + this._sid + '/comments/' + this._cid + '/replies/new';
	  return this.wpcom.req.post(path, query, body, fn);
	};
	
	/**
	 * Delete a comment
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Comment.prototype.del = Comment.prototype.delete = function (query, fn) {
	  var path = '/sites/' + this._sid + '/comments/' + this._cid + '/delete';
	  return this.wpcom.req.del(path, query, fn);
	};
	
	/**
	 * Create a `commentLike` instance
	 *
	 * @return {CommentLink} CommentLink instance
	 */
	Comment.prototype.like = function () {
	  return (0, _siteComment2.default)(this._cid, this._sid, this.wpcom);
	};
	
	/**
	 * Get comment likes list
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Comment.prototype.likesList = function (query, fn) {
	  var path = '/sites/' + this._sid + '/comments/' + this._cid + '/likes';
	  return this.wpcom.req.get(path, query, fn);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.comment.js.map

/***/ },
/* 147 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = CommentLike;
	/**
	 * CommentLike methods
	 *
	 * @param {String} cid comment id
	 * @param {String} sid site id
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function CommentLike(cid, sid, wpcom) {
	  if (!sid) {
	    throw new Error('`site id` is not correctly defined');
	  }
	
	  if (!cid) {
	    throw new Error('`comment id` is not correctly defined');
	  }
	
	  if (!(this instanceof CommentLike)) {
	    return new CommentLike(cid, sid, wpcom);
	  }
	
	  this.wpcom = wpcom;
	  this._cid = cid;
	  this._sid = sid;
	}
	
	/**
	 * Get your Like status for a Comment
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	CommentLike.prototype.mine = CommentLike.prototype.state = function (query, fn) {
	  var path = '/sites/' + this._sid + '/comments/' + this._cid + '/likes/mine';
	  return this.wpcom.req.get(path, query, fn);
	};
	
	/**
	 * Like a comment
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	CommentLike.prototype.add = function (query, fn) {
	  var path = '/sites/' + this._sid + '/comments/' + this._cid + '/likes/new';
	  return this.wpcom.req.post(path, query, fn);
	};
	
	/**
	 * Remove your Like from a Comment
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	CommentLike.prototype.del = CommentLike.prototype.delete = function (query, fn) {
	  var path = '/sites/' + this._sid + '/comments/' + this._cid + '/likes/mine/delete';
	  return this.wpcom.req.del(path, query, fn);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.comment.like.js.map

/***/ },
/* 148 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Follow;
	/**
	 * Follow
	 *
	 * @param {String} site_id - site id
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function Follow(site_id, wpcom) {
	  if (!site_id) {
	    throw new Error('`site id` is not correctly defined');
	  }
	
	  if (!(this instanceof Follow)) {
	    return new Follow(site_id, wpcom);
	  }
	
	  this.wpcom = wpcom;
	  this._sid = site_id;
	}
	
	/**
	 * Get the follow status for current
	 * user on current blog sites
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Follow.prototype.mine = Follow.prototype.state = function (query, fn) {
	  var path = '/sites/' + this._sid + '/follows/mine';
	  return this.wpcom.req.get(path, query, fn);
	};
	
	/**
	 * Follow the site
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Follow.prototype.follow = Follow.prototype.add = function (query, fn) {
	  var path = '/sites/' + this._sid + '/follows/new';
	  return this.wpcom.req.put(path, query, null, fn);
	};
	
	/**
	 * Unfollow the site
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Follow.prototype.unfollow = Follow.prototype.del = function (query, fn) {
	  var path = '/sites/' + this._sid + '/follows/mine/delete';
	  return this.wpcom.req.del(path, query, null, fn);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.follow.js.map

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Media;
	
	var _debug = __webpack_require__(94);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module dependencies.
	 */
	var fs = __webpack_require__(150);
	
	
	var debug = (0, _debug2.default)('wpcom:media');
	
	/**
	 * Build a formData object to be sent in a POST request
	 *
	 * @param  {Array|File} files - array of files
	 * @return {Array} formData array
	 */
	function buildFormData(files) {
		var formData = [];
		var isArray = Array.isArray(files);
		files = isArray ? files : [files];
	
		var i = void 0,
		    f = void 0,
		    isStream = void 0,
		    isFile = void 0,
		    k = void 0,
		    param = void 0;
		for (i = 0; i < files.length; i++) {
			f = files[i];
			f = 'string' === typeof f ? fs.createReadStream(f) : f;
	
			isStream = !!f._readableState;
			isFile = 'undefined' !== typeof File && f instanceof File;
	
			debug('is stream: %s', isStream);
			debug('is file: %s', isFile);
	
			if (!isFile && !isStream) {
				// process file attributes like as `title`, `description`, ...
				for (k in f) {
					debug('add %o => %o', k, f[k]);
					if ('file' !== k) {
						param = 'attrs[' + i + '][' + k + ']';
						formData.push([param, f[k]]);
					}
				}
				// set file path
				f = f.file;
				f = 'string' === typeof f ? fs.createReadStream(f) : f;
			}
	
			formData.push(['media[]', f]);
		}
	
		return formData;
	}
	
	/**
	 * Media methods
	 *
	 * @param {String} id - media id
	 * @param {String} sid site id
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function Media(id, sid, wpcom) {
		if (!(this instanceof Media)) {
			return new Media(id, sid, wpcom);
		}
	
		this.wpcom = wpcom;
		this._sid = sid;
		this._id = id;
	
		if (!this._id) {
			debug('WARN: media `id` is not defined');
		}
	}
	
	/**
	 * Get media
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Media.prototype.get = function () {
		var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var fn = arguments[1];
	
		query.apiVersion = query.apiVersion || '1.2';
		var path = '/sites/' + this._sid + '/media/' + this._id;
		return this.wpcom.req.get(path, query, fn);
	};
	
	/**
	 * Edit media
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Media.prototype.update = function (query, body, fn) {
		if (typeof body == 'function' || !body) {
			fn = body;
			body = query;
			query = {};
		}
	
		query.apiVersion = query.apiVersion || '1.2';
	
		var media = void 0;
		var params = { path: '/sites/' + this._sid + '/media/' + this._id };
	
		if (body && body.media) {
			// build the request with a formData
			media = body.media;
			delete body.media;
	
			params.formData = buildFormData(media);
			for (var k in body) {
				params.formData.push(['attrs[' + k + ']', body[k]]);
			}
	
			body = null;
	
			// override `media[]` field name
			params.formData[0][0] = 'media';
		}
	
		return this.wpcom.req.put(params, query, body, fn);
	};
	
	/**
	 * Add media file
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {String|Object|Array} files - files to add
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Media.prototype.addFiles = function (query, files, fn) {
		if (undefined === fn) {
			if (undefined === files) {
				files = query;
				query = {};
			} else if ('function' === typeof files) {
				fn = files;
				files = query;
				query = {};
			}
		}
	
		var params = {
			path: '/sites/' + this._sid + '/media/new',
			formData: buildFormData(files)
		};
	
		return this.wpcom.req.post(params, query, null, fn);
	};
	
	/**
	 * Add media files from URL
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {String|Array|Object} media - files to add
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Media.prototype.addUrls = function (query, media, fn) {
		if (undefined === fn) {
			if (undefined === media) {
				media = query;
				query = {};
			} else if ('function' === typeof media) {
				fn = media;
				media = query;
				query = {};
			}
		}
	
		var path = '/sites/' + this._sid + '/media/new';
		var body = { media_urls: [] };
	
		// process formData
		var i = void 0,
		    m = void 0,
		    url = void 0,
		    k = void 0;
	
		media = Array.isArray(media) ? media : [media];
		for (i = 0; i < media.length; i++) {
			m = media[i];
	
			if ('string' === typeof m) {
				url = m;
			} else {
				if (!body.attrs) {
					body.attrs = [];
				}
	
				// add attributes
				body.attrs[i] = {};
				for (k in m) {
					if ('url' !== k) {
						body.attrs[i][k] = m[k];
					}
				}
				url = m.url;
			}
	
			// push url into [media_url]
			body.media_urls.push(url);
		}
	
		return this.wpcom.req.post(path, query, body, fn);
	};
	
	/**
	 * Delete media
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Media.prototype.delete = Media.prototype.del = function (query, fn) {
		var path = '/sites/' + this._sid + '/media/' + this._id + '/delete';
		return this.wpcom.req.del(path, query, fn);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.media.js.map

/***/ },
/* 150 */
/***/ function(module, exports) {



/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _promise = __webpack_require__(12);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _typeof2 = __webpack_require__(110);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _sitePost = __webpack_require__(152);
	
	var _sitePost2 = _interopRequireDefault(_sitePost);
	
	var _sitePost3 = __webpack_require__(153);
	
	var _sitePost4 = _interopRequireDefault(_sitePost3);
	
	var _site = __webpack_require__(146);
	
	var _site2 = _interopRequireDefault(_site);
	
	var _sitePost5 = __webpack_require__(154);
	
	var _sitePost6 = _interopRequireDefault(_sitePost5);
	
	var _runtimeBuilder = __webpack_require__(155);
	
	var _runtimeBuilder2 = _interopRequireDefault(_runtimeBuilder);
	
	var _sitePost7 = __webpack_require__(156);
	
	var _sitePost8 = _interopRequireDefault(_sitePost7);
	
	var _debug = __webpack_require__(94);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module vars
	 */
	var debug = (0, _debug2.default)('wpcom:post'); /**
	                                                 * Module dependencies.
	                                                 */
	
	var root = '/sites';
	
	/**
	 * SitePost class
	 */
	
	var SitePost = function () {
		/**
	  * SitePost methods
	  *
	  * @param {String} id - post id
	  * @param {String} sid site id
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Null} null
	  */
		function SitePost(id, sid, wpcom) {
			(0, _classCallCheck3.default)(this, SitePost);
	
			if (!(this instanceof SitePost)) {
				return new SitePost(id, sid, wpcom);
			}
	
			this.wpcom = wpcom;
			this._sid = sid;
			this.path = root + '/' + this._sid + '/posts';
	
			// set `id` and/or `slug` properties
			id = id || {};
			if ('object' !== (typeof id === 'undefined' ? 'undefined' : (0, _typeof3.default)(id))) {
				this._id = id;
			} else {
				this._id = id.id;
				this._slug = id.slug;
			}
		}
	
		/**
	  * Set post `id`
	  *
	  * @param {String} id - site id
	  */
	
	
		(0, _createClass3.default)(SitePost, [{
			key: 'id',
			value: function id(_id) {
				this._id = _id;
			}
	
			/**
	   * Set post `slug`
	   *
	   * @param {String} slug - site slug
	   */
	
		}, {
			key: 'slug',
			value: function slug(_slug) {
				this._slug = _slug;
			}
	
			/**
	   * Get post url path
	   *
	   * @return {String} post path
	   */
	
		}, {
			key: 'getPostPath',
			value: function getPostPath() {
				return this.path + '/' + this._id;
			}
	
			/**
	   * Get post
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'get',
			value: function get(query, fn) {
				if (!this._id && this._slug) {
					return this.getBySlug(query, fn);
				}
	
				return this.wpcom.req.get(this.getPostPath(), query, fn);
			}
	
			/**
	   * Get post by slug
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'getBySlug',
			value: function getBySlug(query, fn) {
				return this.wpcom.req.get(this.path + '/slug:' + this._slug, query, fn);
			}
	
			/**
	   * Add post
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Object} body - body object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'add',
			value: function add(query, body, fn) {
				var _this = this;
	
				if (undefined === fn) {
					if (undefined === body) {
						body = query;
						query = {};
					} else if ('function' === typeof body) {
						fn = body;
						body = query;
						query = {};
					}
				}
	
				return this.wpcom.req.post(this.path + '/new', query, body).then(function (data) {
					// update POST object
					_this._id = data.ID;
					debug('Set post _id: %s', _this._id);
	
					_this._slug = data.slug;
					debug('Set post _slug: %s', _this._slug);
	
					if ('function' === typeof fn) {
						fn(null, data);
					} else {
						return _promise2.default.resolve(data);
					}
				}).catch(function (err) {
					if ('function' === typeof fn) {
						fn(err);
					} else {
						return _promise2.default.reject(err);
					}
				});
			}
	
			/**
	   * Edit post
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Object} body - body object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'update',
			value: function update(query, body, fn) {
				return this.wpcom.req.put(this.getPostPath(), query, body, fn);
			}
	
			/**
	   * Delete post
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Promise} Promise
	   */
	
		}, {
			key: 'delete',
			value: function _delete(query, fn) {
				var path = this.getPostPath() + '/delete';
				return this.wpcom.req.del(path, query, fn);
			}
	
			/**
	   * Del post, alias of Delete
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Promise} Promise
	   */
	
		}, {
			key: 'del',
			value: function del(query, fn) {
				return this.delete(query, fn);
			}
	
			/**
	   * Restore post
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'restore',
			value: function restore(query, fn) {
				return this.wpcom.req.put(this.getPostPath() + '/restore', query, null, fn);
			}
	
			/**
	   * Search within a site for related posts
	   *
	   * @param {Object} body - body object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'related',
			value: function related(body, fn) {
				return this.wpcom.req.put(this.getPostPath() + '/related', body, null, fn);
			}
	
			/**
	   * Create a `Comment` instance
	   *
	   * @param {String} [cid] - comment id
	   * @return {Comment} Comment instance
	   */
	
		}, {
			key: 'comment',
			value: function comment(cid) {
				return new _site2.default(cid, this._id, this._sid, this.wpcom);
			}
	
			/**
	   * Return recent comments
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'comments',
			value: function comments(query, fn) {
				var comment = new _site2.default(null, this._id, this._sid, this.wpcom);
				return comment.replies(query, fn);
			}
	
			/**
	   * Create a `Like` instance
	   *
	   * @return {Like} Like instance
	   */
	
		}, {
			key: 'like',
			value: function like() {
				return new _sitePost2.default(this._id, this._sid, this.wpcom);
			}
	
			/**
	   * Create a `Reblog` instance
	   *
	   * @return {Reblog} Reblog instance
	   */
	
		}, {
			key: 'reblog',
			value: function reblog() {
				return new _sitePost4.default(this._id, this._sid, this.wpcom);
			}
	
			/**
	   * Return a `Subscriber` instance.
	   *
	   * *Example:*
	   *    // Create a Subscriber instance of a post
	   *    var post = wpcom.site( 'en.blog.wordpress.com' ).post( 1234 );
	   *    var subs = post.subscriber();
	   *
	   * @return {Subscriber} Subscriber instance
	   */
	
		}, {
			key: 'subscriber',
			value: function subscriber() {
				return new _sitePost6.default(this._id, this._sid, this.wpcom);
			}
		}]);
		return SitePost;
	}();
	
	// add methods in runtime
	
	
	(0, _runtimeBuilder2.default)(SitePost, _sitePost8.default, function (item, ctx) {
		return '/sites/' + ctx._sid + '/posts/' + ctx._id + '/' + item.subpath;
	});
	
	exports.default = SitePost;
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.post.js.map

/***/ },
/* 152 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Like;
	/**
	 * Like methods
	 *
	 * @param {String} pid - post id
	 * @param {String} sid - site id
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function Like(pid, sid, wpcom) {
	  if (!sid) {
	    throw new Error('`site id` is not correctly defined');
	  }
	
	  if (!pid) {
	    throw new Error('`post id` is not correctly defined');
	  }
	
	  if (!(this instanceof Like)) {
	    return new Like(pid, sid, wpcom);
	  }
	
	  this.wpcom = wpcom;
	  this._pid = pid;
	  this._sid = sid;
	}
	
	/**
	 * Get your Like status for a Post
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 */
	Like.prototype.mine = Like.prototype.state = function (query, fn) {
	  var path = '/sites/' + this._sid + '/posts/' + this._pid + '/likes/mine';
	  return this.wpcom.req.get(path, query, fn);
	};
	
	/**
	 * Like a post
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Like.prototype.add = function (query, fn) {
	  var path = '/sites/' + this._sid + '/posts/' + this._pid + '/likes/new';
	  return this.wpcom.req.put(path, query, null, fn);
	};
	
	/**
	 * Remove your Like from a Post
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 */
	Like.prototype.del = Like.prototype.delete = function (query, fn) {
	  var path = '/sites/' + this._sid + '/posts/' + this._pid + '/likes/mine/delete';
	  return this.wpcom.req.del(path, query, fn);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.post.like.js.map

/***/ },
/* 153 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Reblog;
	/**
	 * Reblog methods
	 *
	 * @param {String} pid post id
	 * @param {String} sid site id
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function Reblog(pid, sid, wpcom) {
		if (!sid) {
			throw new Error('`site id` is not correctly defined');
		}
	
		if (!pid) {
			throw new Error('`post id` is not correctly defined');
		}
	
		if (!(this instanceof Reblog)) {
			return new Reblog(pid, sid, wpcom);
		}
	
		this.wpcom = wpcom;
		this._pid = pid;
		this._sid = sid;
	}
	
	/**
	 * Get your reblog status for a Post
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Reblog.prototype.mine = Reblog.prototype.state = function (query, fn) {
		var path = '/sites/' + this._sid + '/posts/' + this._pid + '/reblogs/mine';
		return this.wpcom.req.get(path, query, fn);
	};
	
	/**
	 * Reblog a post
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Reblog.prototype.add = function (query, body, fn) {
		if ('function' === typeof body) {
			fn = body;
			body = query;
			query = {};
		}
	
		if (body && !body.destination_site_id) {
			return fn(new Error('destination_site_id is not defined'));
		}
	
		var path = '/sites/' + this._sid + '/posts/' + this._pid + '/reblogs/new';
		return this.wpcom.req.put(path, query, body, fn);
	};
	
	/**
	 * Reblog a post to
	 * It's almost an alias of Reblogs#add
	 *
	 * @param {Number|String} dest site id destination
	 * @param {String} [note] - post reblog note
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Reblog.prototype.to = function (dest, note, fn) {
		if (undefined === fn) {
			if (undefined === note) {
				note = null;
			} else if ('function' === typeof note) {
				fn = note;
				note = null;
			}
		}
	
		return this.add({ note: note, destination_site_id: dest }, fn);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.post.reblog.js.map

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SitePostSubscriber = function () {
		/**
	  * `SitePostSubscriber` constructor.
	  *
	  * @param {String} id - post identifier
	  * @param {String} sid - site identifier
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Null} null
	  */
		function SitePostSubscriber(id, sid, wpcom) {
			(0, _classCallCheck3.default)(this, SitePostSubscriber);
	
			if (!sid) {
				throw new Error('`side id` is not correctly defined');
			}
	
			if (!id) {
				throw new Error('`post id` is not correctly defined');
			}
	
			if (!(this instanceof SitePostSubscriber)) {
				return new SitePostSubscriber(id, sid, wpcom);
			}
	
			this.wpcom = wpcom;
			this._id = id;
			this._sid = sid;
			this.path = '/sites/' + this._sid + '/posts/' + this._id + '/subscribers';
		}
	
		/**
	  * Get subscriber status for the current user for the Post.
	  *
	  *
	  * *Example:*
	  *    Get subscriber status for the current user for the Post
	  *    wpcom
	  *    .site( 'en.blog.wordpress.com' )
	  *    .post( 1234 )
	  *    .subscriber()
	  *    .mine( function( err, data ) {
	  *      // subscription data
	  *    } );
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Promise} Promise
	  */
	
	
		(0, _createClass3.default)(SitePostSubscriber, [{
			key: 'mine',
			value: function mine(query, fn) {
				return this.wpcom.req.get(this.path + '/mine', query, fn);
			}
	
			/**
	   * Subscribe the current user to the post.
	   *
	   * *Example:*
	   *    // Subscribe the current user to the post
	   *    wpcom
	   *    .site( 'en.blog.wordpress.com' )
	   *    .post( 1234 )
	   *    .subscriber()
	   *    .add( function( err, data ) {
	   *      // current user has been subscribed to post
	   *    } );
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Promise} Promise
	   */
	
		}, {
			key: 'add',
			value: function add(query, fn) {
				return this.wpcom.req.put(this.path + '/new', query, null, fn);
			}
	
			/**
	   * Unsubscribe current user to the post
	   *
	   * *Example:*
	   *    // Unsubscribe current user to the post
	   *    wpcom
	   *    .site( 'en.blog.wordpress.com' )
	   *    .post( 1234 )
	   *    .subscriber()
	   *    .del( function( err, data ) {
	   *      // current user has been unsubscribed to post
	   *    } );
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Promise} Promise
	   */
	
		}, {
			key: 'del',
			value: function del(query, fn) {
				return this.wpcom.req.del(this.path + '/mine/delete', query, fn);
			}
		}]);
		return SitePostSubscriber;
	}();
	
	// method alias
	
	
	SitePostSubscriber.prototype.state = SitePostSubscriber.prototype.mine;
	SitePostSubscriber.prototype.delete = SitePostSubscriber.prototype.del;
	
	exports.default = SitePostSubscriber;
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.post.subscriber.js.map

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(110);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	exports.default = function (Class, list, buildPath) {
	  list.forEach(function (methodParams) {
	    methodParams = 'object' === (typeof methodParams === 'undefined' ? 'undefined' : (0, _typeof3.default)(methodParams)) ? methodParams : { name: methodParams };
	
	    debug('Adding %o', methodParams.name);
	    Class.prototype[methodParams.name] = methodBuilder(methodParams, buildPath);
	  });
	};
	
	var _debug = __webpack_require__(94);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module vars
	 */
	var debug = (0, _debug2.default)('wpcom:runtime');
	
	/**
	 * Build a generic method
	 *
	 * @param {Object} methodParams - method methodParams
	 * @param {Function} buildPath - function called to build method path
	 * @return {String} method path
	 */
	/**
	 * Module dependencies
	 */
	var methodBuilder = function methodBuilder(methodParams, buildPath) {
	  return function (query, fn) {
	    var path = buildPath(methodParams, this);
	    return this.wpcom.req.get(path, query, fn);
	  };
	};
	
	/**
	 * Add methods to the given Class in the
	 * runtime process.
	 *
	 * @param {*} Class - class to extend
	 * @param {Array} list - methods list
	 * @param {Function} buildPath - function to build the method endpoint path
	 */
	;
	module.exports = exports['default'];
	
	//# sourceMappingURL=runtime-builder.js.map

/***/ },
/* 156 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = [{ name: 'likesList', subpath: 'likes' }, { name: 'subscribersList', subpath: 'subscribers' }];
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.post.get.js.map

/***/ },
/* 157 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Tag;
	/**
	 * Tag methods
	 *
	 * @param {String} [slug] - tag slug
	 * @param {String} sid - site id
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function Tag(slug, sid, wpcom) {
	  if (!sid) {
	    throw new Error('`site id` is not correctly defined');
	  }
	
	  if (!(this instanceof Tag)) {
	    return new Tag(slug, sid, wpcom);
	  }
	
	  this.wpcom = wpcom;
	  this._sid = sid;
	  this._slug = slug;
	}
	
	/**
	 * Set tag `slug`
	 *
	 * @param {String} slug - tag slug
	 */
	Tag.prototype.slug = function (slug) {
	  this._slug = slug;
	};
	
	/**
	 * Get tag
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Tag.prototype.get = function (query, fn) {
	  var path = '/sites/' + this._sid + '/tags/slug:' + this._slug;
	  return this.wpcom.req.get(path, query, fn);
	};
	
	/**
	 * Add tag
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Tag.prototype.add = function (query, body, fn) {
	  var path = '/sites/' + this._sid + '/tags/new';
	  return this.wpcom.req.post(path, query, body, fn);
	};
	
	/**
	 * Edit tag
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Tag.prototype.update = function (query, body, fn) {
	  var path = '/sites/' + this._sid + '/tags/slug:' + this._slug;
	  return this.wpcom.req.put(path, query, body, fn);
	};
	
	/**
	 * Delete tag
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Tag.prototype.delete = Tag.prototype.del = function (query, fn) {
	  var path = '/sites/' + this._sid + '/tags/slug:' + this._slug + '/delete';
	  return this.wpcom.req.del(path, query, fn);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.tag.js.map

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * SitePostType class
	 */
	var SitePostType = function () {
		/**
	  * Create a SitePostType instance
	  *
	  * @param {String} postType - post type
	  * @param {String} siteId - site id
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Null} null
	  */
		function SitePostType(postType, siteId, wpcom) {
			(0, _classCallCheck3.default)(this, SitePostType);
	
			if (!siteId) {
				throw new TypeError('`siteId` is not correctly defined');
			}
	
			if (!postType) {
				throw new TypeError('`postType` is not correctly defined');
			}
	
			if (!(this instanceof SitePostType)) {
				return new SitePostType(postType, siteId, wpcom);
			}
	
			this.wpcom = wpcom;
	
			this._siteId = encodeURIComponent(siteId);
			this._postType = encodeURIComponent(postType);
			this._rootPath = '/sites/' + this._siteId + '/post-types/' + this._postType;
		}
	
		/**
	  * Get a list of taxonomies for the post type
	  *
	  * @param {Object} query - query object
	  * @param {Function} fn - callback function
	  * @return {Promise} Promise
	  */
	
	
		(0, _createClass3.default)(SitePostType, [{
			key: 'taxonomiesList',
			value: function taxonomiesList(query, fn) {
				var termsPath = this._rootPath + '/taxonomies';
				return this.wpcom.req.get(termsPath, query, fn);
			}
		}]);
		return SitePostType;
	}();
	
	exports.default = SitePostType;
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.post-type.js.map

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module vars
	 */
	var root = '/sites';
	
	var SiteDomain = function () {
		/**
	  * `SiteDomain` constructor.
	  *
	  * @param {Number|String} id - site identifier
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Undefined} undefined
	  */
		function SiteDomain(id, wpcom) {
			(0, _classCallCheck3.default)(this, SiteDomain);
	
			if (!(this instanceof SiteDomain)) {
				return new SiteDomain(id, wpcom);
			}
			this._sid = id;
			this.path = root + '/' + this._sid + '/domains';
			this.wpcom = wpcom;
		}
	
		/**
	  * Get the primary domain for a site
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Function} [fn] - callback function
	  * @return {Function} request handler
	  */
	
	
		(0, _createClass3.default)(SiteDomain, [{
			key: 'getPrimary',
			value: function getPrimary(query, fn) {
				return this.wpcom.req.get(this.path + '/primary', query, fn);
			}
	
			/**
	   * Set the primary domain for a site
	   *
	   * @param {String} domain - domain to set
	   * @param {Function} [fn] - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'setPrimary',
			value: function setPrimary(domain, fn) {
				return this.wpcom.req.put(this.path + '/primary', {}, { domain: domain }, fn);
			}
	
			/**
	   * Get the redirect status for a site
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} [fn] - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'getRedirect',
			value: function getRedirect(query, fn) {
				return this.wpcom.req.get(this.path + '/redirect', query, fn);
			}
	
			/**
	   * Set the redirect location for a site
	   *
	   * @param {String|Object} location - location to set
	   * @param {Function} [fn] - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'setRedirect',
			value: function setRedirect(location, fn) {
				if (typeof location === 'string') {
					location = { location: location };
				}
	
				return this.wpcom.req.put(this.path + '/redirect', {}, location, fn);
			}
		}]);
		return SiteDomain;
	}();
	
	/**
	 * Expose `SiteDomain` module
	 */
	
	
	exports.default = SiteDomain;
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.domain.js.map

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module vars
	 */
	var root = '/sites';
	
	var SitePlugin = function () {
	
		/**
	  * `SitePlugin` constructor.
	  *
	  * @param {String} [slug] - the plugin slug
	  * @param {Number|String} sid - site identifier
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Undefined} undefined
	  */
		function SitePlugin(slug, sid, wpcom) {
			(0, _classCallCheck3.default)(this, SitePlugin);
	
			if (!(this instanceof SitePlugin)) {
				return new SitePlugin(slug, sid, wpcom);
			}
	
			if (!slug) {
				throw new Error('`slug` is not correctly defined');
			}
	
			this._slug = encodeURIComponent(slug);
			this._sid = sid;
			this.wpcom = wpcom;
	
			var path = root + '/' + this._sid + '/plugins';
			this.pluginPath = path + '/' + this._slug;
		}
	
		/**
	  * Get informtion about the plugin
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Function} [fn] - callback function
	  * @return {Promise} Promise
	  */
	
	
		(0, _createClass3.default)(SitePlugin, [{
			key: 'get',
			value: function get(query, fn) {
				return this.wpcom.req.get(this.pluginPath, query, fn);
			}
	
			/**
	   * Update the plugin configuration
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Object} body - plugin body object
	   * @param {Function} [fn] - callback function
	   * @return {Promise} Promise
	   */
	
		}, {
			key: 'update',
			value: function update(query, body, fn) {
				return this.wpcom.req.put(this.pluginPath, query, body, fn);
			}
		}, {
			key: 'updateVersion',
	
	
			/**
	   * Update the plugin version
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} [fn] - callback function
	   * @return {Promise} Promise
	   */
			value: function updateVersion(query, fn) {
				return this.wpcom.req.put(this.pluginPath + '/update', query, fn);
			}
		}, {
			key: 'install',
	
	
			/**
	   * Install the plugin
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} [fn] - callback function
	   * @return {Promise} Promise
	   */
			value: function install(query, fn) {
				return this.wpcom.req.put(this.pluginPath + '/install', query, fn);
			}
		}, {
			key: 'delete',
	
	
			/**
	   * Delete the plugin
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} [fn] - callback function
	   * @return {Promise} Promise
	   */
			value: function _delete(query, fn) {
				return this.wpcom.req.put(this.pluginPath + '/delete', query, fn);
			}
		}, {
			key: 'activate',
	
	
			/**
	   * Activate the plugin
	   * This method is a shorthand of update()
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} [fn] - callback function
	   * @return {Promise} Promise
	   */
			value: function activate(query, fn) {
				return this.update(query, { active: true }, fn);
			}
		}, {
			key: 'deactivate',
	
	
			/**
	   * Deactivate the plugin
	   * This method is a shorthand of update()
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} [fn] - callback function
	   * @return {Promise} Promise
	   */
			value: function deactivate(query, fn) {
				return this.update(query, { active: false }, fn);
			}
	
			/**
	   * Enable plugin autoupdate
	   * This method is a shorthand of update()
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} [fn] - callback function
	   * @return {Promise} Promise
	   */
	
		}, {
			key: 'enableAutoupdate',
			value: function enableAutoupdate(query, fn) {
				return this.update(query, { autoupdate: true }, fn);
			}
	
			/**
	   * Disable plugin autoupdate
	   * This method is a shorthand of update()
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} [fn] - callback function
	   * @return {Promise} Promise
	   */
	
		}, {
			key: 'disableAutoupdate',
			value: function disableAutoupdate(query, fn) {
				return this.update(query, { autoupdate: false }, fn);
			}
		}]);
		return SitePlugin;
	}();
	
	/**
	 * Expose `SitePlugin` module
	 */
	
	
	exports.default = SitePlugin;
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.plugin.js.map

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _defineProperty2 = __webpack_require__(109);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _promise = __webpack_require__(12);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * SiteSettings methods
	 *
	 * @param {String} sid - site id
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	var SiteSettings = function () {
		function SiteSettings(sid, wpcom) {
			(0, _classCallCheck3.default)(this, SiteSettings);
	
			if (!sid) {
				throw new Error('`site id` is not correctly defined');
			}
	
			if (!(this instanceof SiteSettings)) {
				return new SiteSettings(sid, wpcom);
			}
	
			this.wpcom = wpcom;
			this._sid = sid;
			this.path = '/sites/' + this._sid + '/settings';
		}
	
		/**
	  * Get site-settings
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Function} request handler
	  */
	
	
		(0, _createClass3.default)(SiteSettings, [{
			key: 'get',
			value: function get(query, fn) {
				return this.wpcom.req.get(this.path, query, fn);
			}
	
			/**
	   * Get site-settings single option
	   *
	   * @param {String} option - option to ask
	   * @param {Function} [fn] - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'getOption',
			value: function getOption(option) {
				var _this = this;
	
				var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	
				var query = { fields: 'settings' };
				return new _promise2.default(function (resolve, reject) {
					_this.wpcom.req.get(_this.path, query, function (err, data) {
						if (err) {
							fn(err);
							return reject(err);
						}
	
						if (!data) {
							fn();
							return resolve();
						}
	
						var settings = data.settings;
	
						if (settings && typeof settings[option] !== 'undefined') {
							fn(null, settings[option]);
							return resolve(settings[option]);
						}
	
						fn(null, data);
						return resolve(data);
					});
				});
			}
	
			/**
	   * Update site-settings
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Object} body - body object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'update',
			value: function update(query, body, fn) {
				return this.wpcom.req.put(this.path, query, body, fn);
			}
	
			/**
	   * Set site-settings single option
	   *
	   * @param {String} option - option to set
	   * @param {*} value - value to assing to the given option
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'setOption',
			value: function setOption(option, value, fn) {
				return this.wpcom.req.put(this.path, {}, (0, _defineProperty3.default)({}, option, value), fn);
			}
		}]);
		return SiteSettings;
	}();
	
	exports.default = SiteSettings;
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.settings.js.map

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _siteTaxonomy = __webpack_require__(163);
	
	var _siteTaxonomy2 = _interopRequireDefault(_siteTaxonomy);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * SiteTaxonomy class
	 */
	var SiteTaxonomy = function () {
		/**
	  * Create a SiteTaxonomy instance
	  *
	  * @param {String} taxonomy - taxonomy type
	  * @param {String} siteId - site id
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Null} null
	  */
		function SiteTaxonomy(taxonomy, siteId, wpcom) {
			(0, _classCallCheck3.default)(this, SiteTaxonomy);
	
			if (!siteId) {
				throw new TypeError('`siteId` is not correctly defined');
			}
	
			if (!taxonomy) {
				throw new TypeError('`taxonomy` is not correctly defined');
			}
	
			if (!(this instanceof SiteTaxonomy)) {
				return new SiteTaxonomy(taxonomy, siteId, wpcom);
			}
	
			this.wpcom = wpcom;
	
			this._siteId = encodeURIComponent(siteId);
			this._taxonomy = encodeURIComponent(taxonomy);
			this._rootPath = '/sites/' + this._siteId + '/taxonomies/' + this._taxonomy;
		}
	
		/**
	  * Get a list of Terms for the Taxonomy
	  *
	  * @param {Object} [query] - query object
	 	 * @param {Function} fn - callback function
	 	 * @return {Promise} Promise
	 	 */
	
	
		(0, _createClass3.default)(SiteTaxonomy, [{
			key: 'termsList',
			value: function termsList(query, fn) {
				var termsPath = this._rootPath + '/terms';
				return this.wpcom.req.get(termsPath, query, fn);
			}
	
			/**
	   * Return `Term` instance
	   *
	   * @param {String} [term] - term slug
	   * @return {Term} Term instance
	   */
	
		}, {
			key: 'term',
			value: function term(_term) {
				return new _siteTaxonomy2.default(_term, this._taxonomy, this._siteId, this.wpcom);
			}
		}]);
		return SiteTaxonomy;
	}(); /**
	      * Module dependencies.
	      */
	
	
	exports.default = SiteTaxonomy;
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.taxonomy.js.map

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * SiteTaxonomyTerm class
	 */
	
	var SiteTaxonomyTerm = function () {
		/**
	  * Create a SiteTaxonomyTerm instance
	  *
	  * @param {String} term - term slug
	  * @param {String} taxonomy - taxonomy type
	  * @param {String} siteId - site id
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Null} null
	  */
		function SiteTaxonomyTerm(term, taxonomy, siteId, wpcom) {
			(0, _classCallCheck3.default)(this, SiteTaxonomyTerm);
	
			if (!siteId) {
				throw new TypeError('`siteId` is not correctly defined');
			}
	
			if (!taxonomy) {
				throw new TypeError('`taxonomy` is not correctly defined');
			}
	
			if (!(this instanceof SiteTaxonomyTerm)) {
				return new SiteTaxonomyTerm(term, taxonomy, siteId, wpcom);
			}
	
			this.wpcom = wpcom;
	
			this._siteId = encodeURIComponent(siteId);
			this._taxonomy = encodeURIComponent(taxonomy);
			this._term = encodeURIComponent(term);
			this._taxonomyPath = '/sites/' + this._siteId + '/taxonomies/' + this._taxonomy + '/terms';
		}
	
		/**
	  * Get Term details
	  *
	  * @param {Object} [query] - query parameters
	 	 * @param {Function} fn - callback function
	 	 * @return {Promise} Promise
	  */
	
	
		(0, _createClass3.default)(SiteTaxonomyTerm, [{
			key: 'get',
			value: function get(query, fn) {
				if (!this._term) {
					throw new Error('`term` is not correctly defined');
				}
	
				if ('function' === typeof query) {
					fn = query;
					query = {};
				}
	
				var path = this._taxonomyPath + '/slug:' + this._term;
	
				return this.wpcom.req.get(path, query, fn);
			}
	
			/**
	   * Add new Term
	   *
	   * @param {Object} [params] - term parameters
	  	 * @param {Function} fn - callback function
	  	 * @return {Promise} Promise
	   */
	
		}, {
			key: 'add',
			value: function add(params, fn) {
				if (!params || !params.name) {
					throw new Error('`params.name` is not correctly defined');
				}
	
				var path = this._taxonomyPath + '/new';
	
				return this.wpcom.req.post(path, params, fn);
			}
	
			/**
	   * Delete Term
	   *
	  	 * @param {Function} fn - callback function
	  	 * @return {Promise} Promise
	   */
	
		}, {
			key: 'delete',
			value: function _delete(fn) {
				if (!this._term) {
					throw new Error('`term` is not correctly defined');
				}
	
				var path = this._taxonomyPath + '/slug:' + this._term + '/delete';
	
				return this.wpcom.req.del(path, fn);
			}
	
			/**
	   * Update Term
	   *
	   * @param {Object} [params] - term parameters
	  	 * @param {Function} fn - callback function
	  	 * @return {Promise} Promise
	   */
	
		}, {
			key: 'update',
			value: function update(params, fn) {
				if (!this._term) {
					throw new Error('`term` is not correctly defined');
				}
	
				var path = this._taxonomyPath + '/slug:' + this._term;
				return this.wpcom.req.put(path, params, fn);
			}
		}]);
		return SiteTaxonomyTerm;
	}();
	
	exports.default = SiteTaxonomyTerm;
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.taxonomy.term.js.map

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * SiteCreditVouchers methods
	 *
	 * @param {String} sid - site id
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	var SiteCreditVouchers = function () {
		function SiteCreditVouchers(sid, wpcom) {
			(0, _classCallCheck3.default)(this, SiteCreditVouchers);
	
			if (!sid) {
				throw new Error('`site id` is not correctly defined');
			}
	
			if (!(this instanceof SiteCreditVouchers)) {
				return new SiteCreditVouchers(sid, wpcom);
			}
	
			this.wpcom = wpcom;
			this._sid = sid;
			this.path = '/sites/' + this._sid + '/vouchers';
		}
	
		/**
	  * Get site vouchers list
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Function} fn - callback function
	  * @return {Function} request handler
	  */
	
	
		(0, _createClass3.default)(SiteCreditVouchers, [{
			key: 'list',
			value: function list() {
				var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
				var fn = arguments[1];
	
				query.apiNamespace = 'wpcom/v2';
				return this.wpcom.req.get(this.path, query, fn);
			}
	
			/**
	   * Get site voucher
	   *
	   * @param {String} serviceType - service type
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'get',
			value: function get(serviceType) {
				var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
				var fn = arguments[2];
	
				query.apiNamespace = 'wpcom/v2';
				return this.wpcom.req.get(this.path + '/' + serviceType, query, fn);
			}
	
			/**
	   * Assign a new voucher to the site
	   *
	   * @param {String} serviceType - service type
	   * @param {Object} [query] - query object parameter
	   * @param {Function} fn - callback function
	   * @return {Function} request handler
	   */
	
		}, {
			key: 'assign',
			value: function assign(serviceType) {
				var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
				var fn = arguments[2];
	
				query.apiNamespace = 'wpcom/v2';
				return this.wpcom.req.post(this.path + '/' + serviceType + '/assign', query, {}, fn);
			}
		}]);
		return SiteCreditVouchers;
	}();
	
	exports.default = SiteCreditVouchers;
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.credit-vouchers.js.map

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = SiteWordAds;
	
	var _siteWordads = __webpack_require__(166);
	
	var _siteWordads2 = _interopRequireDefault(_siteWordads);
	
	var _siteWordads3 = __webpack_require__(167);
	
	var _siteWordads4 = _interopRequireDefault(_siteWordads3);
	
	var _siteWordads5 = __webpack_require__(168);
	
	var _siteWordads6 = _interopRequireDefault(_siteWordads5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * `SiteWordAds` constructor.
	 *
	 * Use a `WPCOM#Me` instance to create a new `SiteWordAds` instance.
	 *
	 * @param {String} sid - site identifier
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function SiteWordAds(sid, wpcom) {
	  if (!(this instanceof SiteWordAds)) {
	    return new SiteWordAds(sid, wpcom);
	  }
	
	  this._sid = sid;
	  this.wpcom = wpcom;
	}
	
	/**
	 * Return a `SiteWordAdsSettings` instance.
	 *
	 * *Example:*
	 *    // Create a SiteWordAdsSettings instance
	 *
	 *    var wordAds = wpcom
	 *      .site( 'my-blog.wordpress.com' )
	 *      .wordAds()
	 *      .settings();
	 *
	 * @return {SiteWordAdsSettings} site WordAds settings instance
	 */
	/**
	 * Module dependencies.
	 */
	SiteWordAds.prototype.settings = function () {
	  return new _siteWordads2.default(this._sid, this.wpcom);
	};
	
	/**
	 * Return a `SiteWordAdsEarnings` instance.
	 *
	 * *Example:*
	 *    // Create a SiteWordAdsEarnings instance
	 *
	 *    var wordAds = wpcom
	 *      .site( 'my-blog.wordpress.com' )
	 *      .wordAds()
	 *      .earnings();
	 *
	 * @return {SiteWordAdsEarnings} site WordAds earnings instance
	 */
	SiteWordAds.prototype.earnings = function () {
	  return new _siteWordads4.default(this._sid, this.wpcom);
	};
	
	/**
	 * Return a `SiteWordAdsTOS` instance.
	 *
	 * *Example:*
	 *    // Create a SiteWordAdsTOS instance
	 *
	 *    var wordAds = wpcom
	 *      .site( 'my-blog.wordpress.com' )
	 *      .wordAds()
	 *      .tos();
	 *
	 * Return  SiteWordAdsTOS object for the site.
	 *
	 * @return {SiteWordAdsTOS} site wordAds TOS instance
	 */
	SiteWordAds.prototype.tos = function () {
	  return new _siteWordads6.default(this._sid, this.wpcom);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.wordads.js.map

/***/ },
/* 166 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = SiteWordAdsSettings;
	/**
	 * `SiteWordAdsSettings` constructor.
	 *
	 * @param {String} sid - site identifier
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function SiteWordAdsSettings(sid, wpcom) {
	  if (!(this instanceof SiteWordAdsSettings)) {
	    return new SiteWordAdsSettings(sid, wpcom);
	  }
	
	  this._sid = sid;
	  this.wpcom = wpcom;
	}
	
	/**
	 * Get detailed WordAds settings information about the site.
	 *
	 * *Example:*
	 *    // Get site settings information
	 *    wpcom
	 *    .site( 'my-blog.wordpress.com' )
	 *    .wordAds()
	 *    .settings()
	 *    .get( function( err, data ) {
	 *      // `settings` information object
	 *    } );
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	SiteWordAdsSettings.prototype.get = function (query, fn) {
	  return this.wpcom.req.get('/sites/' + this._sid + '/wordads/settings', query, fn);
	};
	
	/**
	 * Update WordAds settings for the site.
	 *
	 * *Example:*
	 *    var settings = {}; // your settings here
	 *
	 *    // Get site settings information
	 *    wpcom
	 *    .site( 'my-blog.wordpress.com' )
	 *    .wordAds()
	 *    .settings()
	 *    .update( settings, function( err, data ) {
	 *      // data settings information object
	 *    } );
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	SiteWordAdsSettings.prototype.update = function (query, body, fn) {
	  var path = '/sites/' + this._sid + '/wordads/settings';
	  return this.wpcom.req.post(path, query, body, fn);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.wordads.settings.js.map

/***/ },
/* 167 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = SiteWordAdsEarnings;
	/**
	 * `SiteWordAdsEarnings` constructor.
	 *
	 * @param {String} sid - site identifier
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function SiteWordAdsEarnings(sid, wpcom) {
	  if (!(this instanceof SiteWordAdsEarnings)) {
	    return new SiteWordAdsEarnings(sid, wpcom);
	  }
	
	  this._sid = sid;
	  this.wpcom = wpcom;
	}
	
	/**
	 * Get detailed WordAds earnings information about the site.
	 *
	 * *Example:*
	 *    // Get site earnings information
	 *    wpcom
	 *    .site( 'my-blog.wordpress.com' )
	 *    .wordAds()
	 *    .earnings()
	 *    .get( function( err, data ) {
	 *      // `earnings` information object
	 *    } );
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	SiteWordAdsEarnings.prototype.get = function (query, fn) {
	  return this.wpcom.req.get('/sites/' + this._sid + '/wordads/earnings', query, fn);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.wordads.earnings.js.map

/***/ },
/* 168 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = SiteWordAdsTOS;
	/**
	 * `SiteWordAdsTOS` constructor.
	 *
	 * @param {String} sid - site identifier
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function SiteWordAdsTOS(sid, wpcom) {
	  if (!(this instanceof SiteWordAdsTOS)) {
	    return new SiteWordAdsTOS(sid, wpcom);
	  }
	
	  this._sid = sid;
	  this.wpcom = wpcom;
	}
	
	/**
	 * GET site's WordAds TOS
	 *
	 * *Example:*
	 *    // Get site TOS information
	 *    wpcom
	 *    .site( 'my-blog.wordpress.com' )
	 *    .wordAds()
	 *    .tos()
	 *    .get( function( err, data ) {
	 *      // `settings` information object
	 *    } );
	
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	SiteWordAdsTOS.prototype.get = function (query, fn) {
	  return this.wpcom.req.get('/sites/' + this._sid + '/wordads/tos', query, fn);
	};
	
	/**
	 * UPDATE site's WordAds TOS
	 *
	 * *Example:*
	 *    // Update TOS
	 *    wpcom
	 *    .site( 'my-blog.wordpress.com' )
	 *    .wordAds()
	 *    .tos()
	 *    .update( { tos: 'signed' }, function( err, data ) {
	 *      // data settings information object
	 *    } );
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Object} body - body object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	SiteWordAdsTOS.prototype.update = function (query, body, fn) {
	  var path = '/sites/' + this._sid + '/wordads/tos';
	  return this.wpcom.req.post(path, query, body, fn);
	};
	
	/**
	 * SIGN site's WordAds TOS
	 *
	 * *Example:*
	 *    // Sign TOS
	 *    wpcom
	 *    .site( 'my-blog.wordpress.com' )
	 *    .wordAds()
	 *    .tos()
	 *    .sign( function( err, data ) {
	 *      // data settings information object
	 *    } );
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	SiteWordAdsTOS.prototype.sign = function (query, fn) {
	  var path = '/sites/' + this._sid + '/wordads/tos';
	  return this.wpcom.req.post(path, query, { tos: 'signed' }, fn);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.wordads.tos.js.map

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(98);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(99);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module vars
	 */
	var root = '/sites';
	
	var SiteWPComPlugin = function () {
	
		/**
	  * `SiteWPComPlugin` constructor.
	  *
	  * @param {String} [slug] - the plugin slug
	  * @param {Number|String} sid - site identifier
	  * @param {WPCOM} wpcom - wpcom instance
	  * @return {Undefined} undefined
	  */
		function SiteWPComPlugin(slug, sid, wpcom) {
			(0, _classCallCheck3.default)(this, SiteWPComPlugin);
	
			if (!(this instanceof SiteWPComPlugin)) {
				return new SiteWPComPlugin(slug, sid, wpcom);
			}
	
			if (!slug) {
				throw new Error('`slug` is not correctly defined');
			}
	
			this._slug = encodeURIComponent(slug);
			this._sid = sid;
			this.wpcom = wpcom;
	
			var path = root + '/' + this._sid + '/wpcom-plugins';
			this.pluginPath = path + '/' + this._slug;
		}
	
		/**
	  * Update the plugin configuration
	  *
	  * @param {Object} [query] - query object parameter
	  * @param {Object} body - plugin body object
	  * @param {Function} [fn] - callback function
	  * @return {Promise} Promise
	  */
	
	
		(0, _createClass3.default)(SiteWPComPlugin, [{
			key: 'update',
			value: function update(query, body, fn) {
				return this.wpcom.req.put(this.pluginPath, query, body, fn);
			}
		}, {
			key: 'activate',
	
	
			/**
	   * Activate the plugin
	   * This method is a shorthand of update()
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} [fn] - callback function
	   * @return {Promise} Promise
	   */
			value: function activate(query, fn) {
				return this.update(query, { active: true }, fn);
			}
		}, {
			key: 'deactivate',
	
	
			/**
	   * Deactivate the plugin
	   * This method is a shorthand of update()
	   *
	   * @param {Object} [query] - query object parameter
	   * @param {Function} [fn] - callback function
	   * @return {Promise} Promise
	   */
			value: function deactivate(query, fn) {
				return this.update(query, { active: false }, fn);
			}
		}]);
		return SiteWPComPlugin;
	}();
	
	/**
	 * Expose `SiteWPComPlugin` module
	 */
	
	
	exports.default = SiteWPComPlugin;
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.wpcom-plugin.js.map

/***/ },
/* 170 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = [{ name: 'categoriesList', subpath: 'categories' }, { name: 'commentsList', subpath: 'comments' }, { name: 'domainsList', subpath: 'domains' }, { name: 'embedsList', subpath: 'embeds' }, { name: 'followsList', subpath: 'follows' }, { name: 'mediaList', subpath: 'media' }, { name: 'pageTemplates', subpath: 'page-templates' }, { name: 'pluginsList', subpath: 'plugins' }, { name: 'postsList', subpath: 'posts' }, { name: 'postTypesList', subpath: 'post-types' }, { name: 'shortcodesList', subpath: 'shortcodes' }, { name: 'stats', subpath: 'stats' }, { name: 'statsClicks', subpath: 'stats/clicks' }, { name: 'statsCommentFollowers', subpath: 'stats/comment-followers' }, { name: 'statsComments', subpath: 'stats/comments' }, { name: 'statsCountryViews', subpath: 'stats/country-views' }, { name: 'statsFollowers', subpath: 'stats/followers' }, { name: 'statsInsights', subpath: 'stats/insights' }, { name: 'statsPublicize', subpath: 'stats/publicize' }, { name: 'statsReferrers', subpath: 'stats/referrers' }, { name: 'statsSearchTerms', subpath: 'stats/search-terms' }, { name: 'statsStreak', subpath: 'stats/streak' }, { name: 'statsSummary', subpath: 'stats/summary' }, { name: 'statsTags', subpath: 'stats/tags' }, { name: 'statsTopAuthors', subpath: 'stats/top-authors' }, { name: 'statsTopPosts', subpath: 'stats/top-posts' }, { name: 'statsVideoPlays', subpath: 'stats/video-plays' }, { name: 'statsVisits', subpath: 'stats/visits' }, { name: 'tagsList', subpath: 'tags' }, { name: 'usersList', subpath: 'users' }, { name: 'wpcomPluginsList', subpath: 'wpcom-plugins' }];
	module.exports = exports['default'];
	
	//# sourceMappingURL=site.get.js.map

/***/ },
/* 171 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Users;
	/**
	 * Create a `Users` instance
	 *
	 * @param {WPCOM} wpcom - wpcom instance
	 * @return {Null} null
	 */
	function Users(wpcom) {
	  if (!(this instanceof Users)) {
	    return new Users(wpcom);
	  }
	
	  this.wpcom = wpcom;
	}
	
	/**
	 * A list of @mention suggestions for the current user
	 *
	 * @param {Object} [query] - query object parameter
	 * @param {Function} fn - callback function
	 * @return {Function} request handler
	 */
	Users.prototype.suggest = function (query, fn) {
	  return this.wpcom.req.get('/users/suggest', query, fn);
	};
	module.exports = exports['default'];
	
	//# sourceMappingURL=users.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map