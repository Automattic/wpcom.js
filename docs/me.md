## Members
<dl>
<dt><a href="#debug">debug</a></dt>
<dd><p>Module dependencies.</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#Me">Me(wpcom)</a></dt>
<dd><p>Create a <code>Me</code> instance</p>
</dd>
</dl>
<a name="debug"></a>
## debug
Module dependencies.

**Kind**: global variable  
<a name="Me"></a>
## Me(wpcom)
Create a `Me` instance

**Kind**: global function  
**Api**: public  

| Param | Type |
| --- | --- |
| wpcom | <code>WPCOM</code> | 


* [Me(wpcom)](#Me)
  * [.get([query], fn)](#Me#get)
  * [.sites([query], fn)](#Me#sites)
  * [.likes([query], fn)](#Me#likes)
  * [.groups([query], fn)](#Me#groups)
  * [.connections([query], fn)](#Me#connections)

<a name="Me#get"></a>
### me.get([query], fn)
Meta data about auth token's User

**Kind**: instance method of <code>[Me](#Me)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

**Example**  
```js
// returns 2
   globalNS.method1(5, 10);
```
<a name="Me#sites"></a>
### me.sites([query], fn)
A list of the current user's sites

**Kind**: instance method of <code>[Me](#Me)</code>  
**Api**: private  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Me#likes"></a>
### me.likes([query], fn)
List the currently authorized user's likes

**Kind**: instance method of <code>[Me](#Me)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Me#groups"></a>
### me.groups([query], fn)
A list of the current user's group

**Kind**: instance method of <code>[Me](#Me)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

<a name="Me#connections"></a>
### me.connections([query], fn)
A list of the current user's connections to third-party services

**Kind**: instance method of <code>[Me](#Me)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

