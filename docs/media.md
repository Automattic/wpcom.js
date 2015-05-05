## Members
<dl>
<dt><a href="#fs">fs</a></dt>
<dd><p>Module dependencies.</p>
</dd>
<dt><a href="#def">def</a></dt>
<dd><p>Default</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#Media">Media(id, sid, wpcom)</a></dt>
<dd><p>Media methods</p>
</dd>
</dl>
<a name="fs"></a>
## fs
Module dependencies.

**Kind**: global variable  
<a name="def"></a>
## def
Default

**Kind**: global variable  
<a name="Media"></a>
## Media(id, sid, wpcom)
Media methods

**Kind**: global function  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> |  |
| sid | <code>String</code> | site id |
| wpcom | <code>WPCOM</code> |  |


* [Media(id, sid, wpcom)](#Media)
  * [.'delete'](#Media#'delete')
  * [.get([query], fn)](#Media#get)
  * [.update([query], body, fn)](#Media#update)
  * [.addFiles([query], files, fn)](#Media#addFiles)
  * [.addUrls([query], files, fn)](#Media#addUrls)

<a name="Media#'delete'"></a>
### media.'delete'
Delete media

**Kind**: instance property of <code>[Media](#Media)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Media#get"></a>
### media.get([query], fn)
Get media

**Kind**: instance method of <code>[Media](#Media)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Media#update"></a>
### media.update([query], body, fn)
Edit media

**Kind**: instance method of <code>[Media](#Media)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| body | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Media#addFiles"></a>
### media.addFiles([query], files, fn)
Add media file

**Kind**: instance method of <code>[Media](#Media)</code>  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| files | <code>String</code> &#124; <code>Object</code> &#124; <code>Array</code> | 
| fn | <code>function</code> | 

<a name="Media#addUrls"></a>
### media.addUrls([query], files, fn)
Add media files from URL

**Kind**: instance method of <code>[Media](#Media)</code>  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| files | <code>String</code> &#124; <code>Array</code> &#124; <code>Object</code> | 
| fn | <code>function</code> | 

