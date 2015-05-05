## Members
<dl>
<dt><a href="#Like">Like</a></dt>
<dd><p>Module dependencies.</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#Post">Post(id, sid, wpcom)</a></dt>
<dd><p>Post methods</p>
</dd>
</dl>
<a name="Like"></a>
## Like
Module dependencies.

**Kind**: global variable  
<a name="Post"></a>
## Post(id, sid, wpcom)
Post methods

**Kind**: global function  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> |  |
| sid | <code>String</code> | site id |
| wpcom | <code>WPCOM</code> |  |


* [Post(id, sid, wpcom)](#Post)
  * [.del](#Post#del)
  * [.id(id)](#Post#id)
  * [.slug(slug)](#Post#slug)
  * [.get([query], fn)](#Post#get)
  * [.getBySlug([query], fn)](#Post#getBySlug)
  * [.add([query], body, fn)](#Post#add)
  * [.update([query], body, fn)](#Post#update)
  * [.restore([query], fn)](#Post#restore)
  * [.likesList([query], fn)](#Post#likesList)
  * [.related(body, fn)](#Post#related)
  * [.like()](#Post#like)
  * [.reblog()](#Post#reblog)
  * [.comment([cid])](#Post#comment)
  * [.comments([query], fn)](#Post#comments)

<a name="Post#del"></a>
### post.del
Delete post

**Kind**: instance property of <code>[Post](#Post)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Post#id"></a>
### post.id(id)
Set post `id`

**Kind**: instance method of <code>[Post](#Post)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 

<a name="Post#slug"></a>
### post.slug(slug)
Set post `slug`

**Kind**: instance method of <code>[Post](#Post)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| slug | <code>String</code> | 

<a name="Post#get"></a>
### post.get([query], fn)
Get post

**Kind**: instance method of <code>[Post](#Post)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Post#getBySlug"></a>
### post.getBySlug([query], fn)
Get post by slug

**Kind**: instance method of <code>[Post](#Post)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Post#add"></a>
### post.add([query], body, fn)
Add post

**Kind**: instance method of <code>[Post](#Post)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| body | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Post#update"></a>
### post.update([query], body, fn)
Edit post

**Kind**: instance method of <code>[Post](#Post)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| body | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Post#restore"></a>
### post.restore([query], fn)
Restore post

**Kind**: instance method of <code>[Post](#Post)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Post#likesList"></a>
### post.likesList([query], fn)
Get post likes list

**Kind**: instance method of <code>[Post](#Post)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Post#related"></a>
### post.related(body, fn)
Search within a site for related posts

**Kind**: instance method of <code>[Post](#Post)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| body | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Post#like"></a>
### post.like()
Create a `Like` instance

**Kind**: instance method of <code>[Post](#Post)</code>  
**Api**: public  
<a name="Post#reblog"></a>
### post.reblog()
Create a `Reblog` instance

**Kind**: instance method of <code>[Post](#Post)</code>  
**Api**: public  
<a name="Post#comment"></a>
### post.comment([cid])
Create a `Comment` instance

**Kind**: instance method of <code>[Post](#Post)</code>  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| [cid] | <code>String</code> | comment id |

<a name="Post#comments"></a>
### post.comments([query], fn)
Return recent comments

**Kind**: instance method of <code>[Post](#Post)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

