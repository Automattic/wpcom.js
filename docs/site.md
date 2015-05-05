## Members
<dl>
<dt><a href="#Post">Post</a></dt>
<dd><p>Module dependencies.</p>
</dd>
<dt><a href="#resources">resources</a></dt>
<dd><p>Resources array
A list of endpoints with the same structure</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#Site">Site(wpcom)</a></dt>
<dd><p>Create a Site instance</p>
</dd>
<dt><a href="#list">list(subpath)</a></dt>
<dd><p>List method builder</p>
</dd>
</dl>
<a name="Post"></a>
## Post
Module dependencies.

**Kind**: global variable  
<a name="resources"></a>
## resources
Resources array
A list of endpoints with the same structure

**Kind**: global variable  
<a name="Site"></a>
## Site(wpcom)
Create a Site instance

**Kind**: global function  
**Api**: public  

| Param | Type |
| --- | --- |
| wpcom | <code>WPCOM</code> | 


* [Site(wpcom)](#Site)
  * [.cat](#Site#cat)
  * [.get([query], fn)](#Site#get)
  * [.post(id)](#Site#post)
  * [.addPost(body, fn)](#Site#addPost) ⇒ <code>[Post](#Post)</code>
  * [.deletePost(id, fn)](#Site#deletePost) ⇒ <code>[Post](#Post)</code>
  * [.media(id)](#Site#media)
  * [.addMediaFiles([query], files, fn)](#Site#addMediaFiles) ⇒ <code>[Post](#Post)</code>
  * [.addMediaUrls([query], files, fn)](#Site#addMediaUrls) ⇒ <code>[Post](#Post)</code>
  * [.deleteMedia(id, fn)](#Site#deleteMedia) ⇒ <code>[Post](#Post)</code>
  * [.comment(id)](#Site#comment)
  * [.follow()](#Site#follow)
  * [.tag([slug])](#Site#tag)
  * [.renderShortcode(url, [query], fn)](#Site#renderShortcode)
  * [.renderEmbed(url, [query], fn)](#Site#renderEmbed)
  * [.statsReferrersSpamNew(domain, fn)](#Site#statsReferrersSpamNew)
  * [.statsReferrersSpamDelete(domain, fn)](#Site#statsReferrersSpamDelete)
  * [.statsVideo(videoId, [query], fn)](#Site#statsVideo)
  * [.statsPostViews(postId, [query], fn)](#Site#statsPostViews)

<a name="Site#cat"></a>
### site.cat
Create a `Category` instance
Set `cat` alias

**Kind**: instance property of <code>[Site](#Site)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [slug] | <code>String</code> | 

<a name="Site#get"></a>
### site.get([query], fn)
Require site information

**Kind**: instance method of <code>[Site](#Site)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Site#post"></a>
### site.post(id)
:POST:
Create a `Post` instance

**Kind**: instance method of <code>[Site](#Site)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 

<a name="Site#addPost"></a>
### site.addPost(body, fn) ⇒ <code>[Post](#Post)</code>
:POST:
Add a new blog post

**Kind**: instance method of <code>[Site](#Site)</code>  
**Returns**: <code>[Post](#Post)</code> - new Post instance  

| Param | Type |
| --- | --- |
| body | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Site#deletePost"></a>
### site.deletePost(id, fn) ⇒ <code>[Post](#Post)</code>
:POST:
Delete a blog post

**Kind**: instance method of <code>[Site](#Site)</code>  
**Returns**: <code>[Post](#Post)</code> - remove Post instance  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 
| fn | <code>function</code> | 

<a name="Site#media"></a>
### site.media(id)
Create a `Media` instance

**Kind**: instance method of <code>[Site](#Site)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 

<a name="Site#addMediaFiles"></a>
### site.addMediaFiles([query], files, fn) ⇒ <code>[Post](#Post)</code>
Add a media from a file

**Kind**: instance method of <code>[Site](#Site)</code>  
**Returns**: <code>[Post](#Post)</code> - new Post instance  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| files | <code>Array</code> &#124; <code>String</code> | 
| fn | <code>function</code> | 

<a name="Site#addMediaUrls"></a>
### site.addMediaUrls([query], files, fn) ⇒ <code>[Post](#Post)</code>
Add a new media from url

**Kind**: instance method of <code>[Site](#Site)</code>  
**Returns**: <code>[Post](#Post)</code> - new Post instance  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| files | <code>Array</code> &#124; <code>String</code> | 
| fn | <code>function</code> | 

<a name="Site#deleteMedia"></a>
### site.deleteMedia(id, fn) ⇒ <code>[Post](#Post)</code>
Delete a blog media

**Kind**: instance method of <code>[Site](#Site)</code>  
**Returns**: <code>[Post](#Post)</code> - removed Media instance  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 
| fn | <code>function</code> | 

<a name="Site#comment"></a>
### site.comment(id)
Create a `Comment` instance

**Kind**: instance method of <code>[Site](#Site)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 

<a name="Site#follow"></a>
### site.follow()
Create a `Follow` instance

**Kind**: instance method of <code>[Site](#Site)</code>  
**Api**: public  
<a name="Site#tag"></a>
### site.tag([slug])
Create a `Tag` instance

**Kind**: instance method of <code>[Site](#Site)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [slug] | <code>String</code> | 

<a name="Site#renderShortcode"></a>
### site.renderShortcode(url, [query], fn)
Get a rendered shortcode for a site.

Note: The current user must have publishing access.

**Kind**: instance method of <code>[Site](#Site)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Site#renderEmbed"></a>
### site.renderEmbed(url, [query], fn)
Get a rendered embed for a site.

Note: The current user must have publishing access.

**Kind**: instance method of <code>[Site](#Site)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Site#statsReferrersSpamNew"></a>
### site.statsReferrersSpamNew(domain, fn)
Mark a referrering domain as spam

**Kind**: instance method of <code>[Site](#Site)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| domain | <code>String</code> | 
| fn | <code>function</code> | 

<a name="Site#statsReferrersSpamDelete"></a>
### site.statsReferrersSpamDelete(domain, fn)
Remove referrering domain from spam

**Kind**: instance method of <code>[Site](#Site)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| domain | <code>String</code> | 
| fn | <code>function</code> | 

<a name="Site#statsVideo"></a>
### site.statsVideo(videoId, [query], fn)
Get detailed stats about a VideoPress video

**Kind**: instance method of <code>[Site](#Site)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| videoId | <code>String</code> | 
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Site#statsPostViews"></a>
### site.statsPostViews(postId, [query], fn)
Get detailed stats about a particular post

**Kind**: instance method of <code>[Site](#Site)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| postId | <code>String</code> | 
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="list"></a>
## list(subpath)
List method builder

**Kind**: global function  
**Api**: private  

| Param | Type |
| --- | --- |
| subpath | <code>String</code> | 
|  | <code>function</code> | 

<a name="list..listMethod"></a>
### list~listMethod([query], fn)
Create and return the <names>List method

**Kind**: inner method of <code>[list](#list)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

