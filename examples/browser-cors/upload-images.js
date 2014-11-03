
var site_id = ""; // <- your site here
var client_id = ""; // <- your client id here

if (!client_id.length) {
  alert('Define your client_id !! :-)');
}

if (!site_id.length) {
  alert('Define your site !! :-)');
}

/**
 * Get access token and start the app
 */

getAccess(function(token){
  var wpcom = WPCOM(token);

  // select files on the "input" element
  var filecontainer = document.getElementById('message');
  var input = document.getElementById('file');

  input.onchange = function (e) {
    var files = [];
    for (var i = 0; i < e.target.files.length; i++) {
      files.push({
        title: 'testing file number ' + i,
        file: e.target.files[i]
      });
    }

    filecontainer.innerHTML = 'Uploading ' + files.length + ' images ...';

    var req = wpcom
    .site(site_id)
    .addMediaFiles(files, function(err, data){
      if (err) {
        console.error(err.message);
      }

      filecontainer.innerHTML = data.media.length + ' files uploaded';
    });

    req.upload.onprogress = onprogress;
  };
});

/**
 * Return access token gotten from URL or by localStorage
 *
 * @api private
 */

function getAccess(fn){
  // try to get access_token from URI
  var access_token = location.hash.match(/access_token=([a-zA-Z0-9%]*)/);
  access_token = access_token ? decodeURIComponent(access_token[1]) : null; 

  if (access_token) {
    // access token is present in URI
    localStorage.access_token = access_token;
    window.location = location.href.replace(/\#.*$/, '');
  } else if (!localStorage.access_token) {
    // access token is not present
    auth();
  } else {
    // access_token is stored
    access_token = localStorage.access_token;
  }
  fn(access_token);
}

/**
 * Authentication request
 *
 * @api private
 */

function auth () {
  // redirect to OAuth page
  var auth_endpoint = 'https://public-api.wordpress.com/oauth2/authorize';
  var params = "client_id=" + client_id + '&' +
               "response_type=token&" +
               "redirect_uri=" + location.href.replace(/\#.*$/, '');

  window.location = auth_endpoint + '?' + params;
}

/**
 * Bind to `onprogress` upload event
 *
 * @api private
 */

function onprogress (e) {
  if (e.lengthComputable) {
    var percentComplete = e.loaded / e.total * 100;
    console.log('progress event! %s%', percentComplete.toFixed(2));
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}
