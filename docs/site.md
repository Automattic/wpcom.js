  - [resources](#resources)
  - [Site()](#sitewpcomwpcom)
  - [Site.get()](#sitegetqueryobjectfnfunction)
  - [listMethod()](#listmethodqueryobjectfnfunction)
  - [Site.post()](#sitepostidstring)
  - [Site.addPost()](#siteaddpostbodyobjectfnfunction)
  - [Site.deletePost()](#sitedeletepostidstringfnfunction)
  - [Site.media()](#sitemediaidstring)
  - [Site.addMediaFiles()](#siteaddmediafilesqueryobjectfilesarraystringfnfunction)
  - [Site.addMediaUrls()](#siteaddmediaurlsqueryobjectfilesarraystringfnfunction)
  - [Site.deleteMedia()](#sitedeletemediaidstringfnfunction)
  - [Site.comment()](#sitecommentidstring)
  - [Site.follow()](#sitefollow)
  - [Site.prototype.cat](#siteprototypecat)
  - [Site.tag()](#sitetagslugstring)
  - [Site.renderShortcode()](#siterendershortcodeurlstringqueryobjectfnfunction)
  - [Site.renderEmbed()](#siterenderembedurlstringqueryobjectfnfunction)
  - [Site.statsReferrersSpamNew()](#sitestatsreferrersspamnewdomainstringfnfunction)
  - [Site.statsReferrersSpamDelete()](#sitestatsreferrersspamdeletedomainstringfnfunction)
  - [Site.statsVideo()](#sitestatsvideovideoidstringqueryobjectfnfunction)
  - [Site.statsPostViews()](#sitestatspostviewspostidstringqueryobjectfnfunction)

## resources

  Resources array
  A list of endpoints with the same structure

## Site(wpcom:WPCOM)

  Create a Site instance

## Site.get([query]:Object, fn:Function)

  Require site information

## listMethod([query]:Object, fn:Function)

  Create and return the <names>List method

## Site.post(id:String)

  :POST:
  Create a `Post` instance

## Site.addPost(body:Object, fn:Function)

  :POST:
  Add a new blog post

## Site.deletePost(id:String, fn:Function)

  :POST:
  Delete a blog post

## Site.media(id:String)

  Create a `Media` instance

## Site.addMediaFiles([query]:Object, files:Array|String, fn:Function)

  Add a media from a file

## Site.addMediaUrls([query]:Object, files:Array|String, fn:Function)

  Add a new media from url

## Site.deleteMedia(id:String, fn:Function)

  Delete a blog media

## Site.comment(id:String)

  Create a `Comment` instance

## Site.follow()

  Create a `Follow` instance

## Site.prototype.cat

  Create a `Category` instance
  Set `cat` alias

## Site.tag([slug]:String)

  Create a `Tag` instance

## Site.renderShortcode(url:String, [query]:Object, fn:Function)

  Get a rendered shortcode for a site.
  
  Note: The current user must have publishing access.

## Site.renderEmbed(url:String, [query]:Object, fn:Function)

  Get a rendered embed for a site.
  
  Note: The current user must have publishing access.

## Site.statsReferrersSpamNew(domain:String, fn:Function)

  Mark a referrering domain as spam

## Site.statsReferrersSpamDelete(domain:String, fn:Function)

  Remove referrering domain from spam

## Site.statsVideo(videoId:String, [query]:Object, fn:Function)

  Get detailed stats about a VideoPress video

## Site.statsPostViews(postId:String, [query]:Object, fn:Function)

  Get detailed stats about a particular post
