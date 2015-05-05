## Members
<dl>
<dt><a href="#debug">debug</a></dt>
<dd><p>Module dependencies.</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#CommentLike">CommentLike(cid, sid, wpcom)</a></dt>
<dd><p>CommentLike methods</p>
</dd>
</dl>
<a name="debug"></a>
## debug
Module dependencies.

**Kind**: global variable  
<a name="CommentLike"></a>
## CommentLike(cid, sid, wpcom)
CommentLike methods

**Kind**: global function  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| cid | <code>String</code> | comment id |
| sid | <code>String</code> | site id |
| wpcom | <code>WPCOM</code> |  |


* [CommentLike(cid, sid, wpcom)](#CommentLike)
  * [.mine](#CommentLike#mine)
  * [.del](#CommentLike#del)
  * [.add([query], fn)](#CommentLike#add)

<a name="CommentLike#mine"></a>
### commentLike.mine
Get your Like status for a Comment

**Kind**: instance property of <code>[CommentLike](#CommentLike)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="CommentLike#del"></a>
### commentLike.del
Remove your Like from a Comment

**Kind**: instance property of <code>[CommentLike](#CommentLike)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="CommentLike#add"></a>
### commentLike.add([query], fn)
Like a comment

**Kind**: instance method of <code>[CommentLike](#CommentLike)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

