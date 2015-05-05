## Members
<dl>
<dt><a href="#debug">debug</a></dt>
<dd><p>Module dependencies.</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#Reblog">Reblog(pid, sid, wpcom)</a></dt>
<dd><p>Reblog methods</p>
</dd>
</dl>
<a name="debug"></a>
## debug
Module dependencies.

**Kind**: global variable  
<a name="Reblog"></a>
## Reblog(pid, sid, wpcom)
Reblog methods

**Kind**: global function  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| pid | <code>String</code> | post id |
| sid | <code>String</code> | site id |
| wpcom | <code>WPCOM</code> |  |


* [Reblog(pid, sid, wpcom)](#Reblog)
  * [.mine](#Reblog#mine)
  * [.add([query], body, fn)](#Reblog#add)
  * [.to(dest, [note], fn)](#Reblog#to)

<a name="Reblog#mine"></a>
### reblog.mine
Get your reblog status for a Post

**Kind**: instance property of <code>[Reblog](#Reblog)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Reblog#add"></a>
### reblog.add([query], body, fn)
Reblog a post

**Kind**: instance method of <code>[Reblog](#Reblog)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| body | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Reblog#to"></a>
### reblog.to(dest, [note], fn)
Reblog a post to
It's almost an alias of Reblogs#add

**Kind**: instance method of <code>[Reblog](#Reblog)</code>  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| dest | <code>Number</code> &#124; <code>String</code> | site id destination |
| [note] | <code>String</code> |  |
| fn | <code>function</code> |  |

