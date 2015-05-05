## Members
<dl>
<dt><a href="#CommentLike">CommentLike</a></dt>
<dd><p>Module dependencies.</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#Comment">Comment([cid], [pid], sid, wpcom)</a></dt>
<dd><p>Comment methods</p>
</dd>
</dl>
<a name="CommentLike"></a>
## CommentLike
Module dependencies.

**Kind**: global variable  
<a name="Comment"></a>
## Comment([cid], [pid], sid, wpcom)
Comment methods

**Kind**: global function  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| [cid] | <code>String</code> | comment id |
| [pid] | <code>String</code> | post id |
| sid | <code>String</code> | site id |
| wpcom | <code>WPCOM</code> |  |


* [Comment([cid], [pid], sid, wpcom)](#Comment)
  * [.del](#Comment#del)
  * [.get([query], fn)](#Comment#get)
  * [.replies([query], fn)](#Comment#replies)
  * [.add([query], body, fn)](#Comment#add)
  * [.update([query], body, fn)](#Comment#update)
  * [.reply([query], body, fn)](#Comment#reply)
  * [.like()](#Comment#like)
  * [.likesList([query], fn)](#Comment#likesList)

<a name="Comment#del"></a>
### comment.del
Delete a comment

**Kind**: instance property of <code>[Comment](#Comment)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Comment#get"></a>
### comment.get([query], fn)
Return a single Comment

**Kind**: instance method of <code>[Comment](#Comment)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Comment#replies"></a>
### comment.replies([query], fn)
Return recent comments for a post

**Kind**: instance method of <code>[Comment](#Comment)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Comment#add"></a>
### comment.add([query], body, fn)
Create a comment on a post

**Kind**: instance method of <code>[Comment](#Comment)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| body | <code>String</code> &#124; <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Comment#update"></a>
### comment.update([query], body, fn)
Edit a comment

**Kind**: instance method of <code>[Comment](#Comment)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| body | <code>String</code> &#124; <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Comment#reply"></a>
### comment.reply([query], body, fn)
Create a Comment as a reply to another Comment

**Kind**: instance method of <code>[Comment](#Comment)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| body | <code>String</code> &#124; <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Comment#like"></a>
### comment.like()
Create a `CommentLike` instance

**Kind**: instance method of <code>[Comment](#Comment)</code>  
**Api**: public  
<a name="Comment#likesList"></a>
### comment.likesList([query], fn)
Get comment likes list

**Kind**: instance method of <code>[Comment](#Comment)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

