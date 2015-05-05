## Members
<dl>
<dt><a href="#debug">debug</a></dt>
<dd><p>Module dependencies.</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#Tag">Tag([slug], sid, wpcom)</a></dt>
<dd><p>Tag methods</p>
</dd>
</dl>
<a name="debug"></a>
## debug
Module dependencies.

**Kind**: global variable  
<a name="Tag"></a>
## Tag([slug], sid, wpcom)
Tag methods

**Kind**: global function  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| [slug] | <code>String</code> |  |
| sid | <code>String</code> | site id |
| wpcom | <code>WPCOM</code> |  |


* [Tag([slug], sid, wpcom)](#Tag)
  * [.'delete'](#Tag#'delete')
  * [.slug(slug)](#Tag#slug)
  * [.get([query], fn)](#Tag#get)
  * [.add([query], body, fn)](#Tag#add)
  * [.update([query], body, fn)](#Tag#update)

<a name="Tag#'delete'"></a>
### tag.'delete'
Delete tag

**Kind**: instance property of <code>[Tag](#Tag)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Tag#slug"></a>
### tag.slug(slug)
Set tag `slug`

**Kind**: instance method of <code>[Tag](#Tag)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| slug | <code>String</code> | 

<a name="Tag#get"></a>
### tag.get([query], fn)
Get tag

**Kind**: instance method of <code>[Tag](#Tag)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Tag#add"></a>
### tag.add([query], body, fn)
Add tag

**Kind**: instance method of <code>[Tag](#Tag)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| body | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Tag#update"></a>
### tag.update([query], body, fn)
Edit tag

**Kind**: instance method of <code>[Tag](#Tag)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| body | <code>Object</code> | 
| fn | <code>function</code> | 

