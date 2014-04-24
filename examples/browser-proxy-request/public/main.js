/**
 * Create wpcom instance.
 * WPCOM is a window global function
 */

var wpcom = WPCOM();

// upgrade to "access all user's blogs" mode
wpcom.request({
  metaAPI: { accessAllUsersBlogs: true }
}, function(err) {
  if (err) throw err;
  console.log('proxy now running in "access all user\'s blogs" mode');
});

/**
 * Create Me instance
 */

var me = wpcom.me();

/**
 * Get user information
 */

me.get(function(err, me){
  if (err) throw err;
  console.log('me: ', me);

  // inject username DOM element
  var div = document.createElement('div');
  div.innerHTML = 'Your WordPress.com "username" is: <b>@' + me.username + '<\/b>';
  document.body.appendChild(div);
});
