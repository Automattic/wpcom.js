## Members
<dl>
<dt><a href="#debug">debug</a></dt>
<dd><p>Module dependencies.</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#Category">Category([slug], sid, wpcom)</a></dt>
<dd><p>Category methods</p>
</dd>
</dl>
<a name="debug"></a>
## debug
Module dependencies.

**Kind**: global variable  
<a name="Category"></a>
## Category([slug], sid, wpcom)
Category methods

**Kind**: global function  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| [slug] | <code>String</code> |  |
| sid | <code>String</code> | site id |
| wpcom | <code>WPCOM</code> |  |


* [Category([slug], sid, wpcom)](#Category)
  * [.'delete'](#Category#'delete')
  * [.slug(slug)](#Category#slug)
  * [.get([query], fn)](#Category#get)
  * [.add([query], body, fn)](#Category#add)
  * [.update([query], body, fn)](#Category#update)

<a name="Category#'delete'"></a>
### category.'delete'
Delete category

**Kind**: instance property of <code>[Category](#Category)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Category#slug"></a>
### category.slug(slug)
Set category `slug`

**Kind**: instance method of <code>[Category](#Category)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| slug | <code>String</code> | 

<a name="Category#get"></a>
### category.get([query], fn)
Get category

**Kind**: instance method of <code>[Category](#Category)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Category#add"></a>
### category.add([query], body, fn)
Add category

**Kind**: instance method of <code>[Category](#Category)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| body | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Category#update"></a>
### category.update([query], body, fn)
Edit category

**Kind**: instance method of <code>[Category](#Category)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| body | <code>Object</code> | 
| fn | <code>function</code> | 

