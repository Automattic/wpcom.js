## Members
<dl>
<dt><a href="#debug">debug</a></dt>
<dd><p>Module dependencies.</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#Batch">Batch(wpcom)</a></dt>
<dd><p>Create a <code>Batch</code> instance</p>
</dd>
</dl>
<a name="debug"></a>
## debug
Module dependencies.

**Kind**: global variable  
<a name="Batch"></a>
## Batch(wpcom)
Create a `Batch` instance

**Kind**: global function  
**Api**: public  

| Param | Type |
| --- | --- |
| wpcom | <code>WPCOM</code> | 


* [Batch(wpcom)](#Batch)
  * [.add(url)](#Batch#add)
  * [.run([query], fn)](#Batch#run)

<a name="Batch#add"></a>
### batch.add(url)
Add url to batch requests

**Kind**: instance method of <code>[Batch](#Batch)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 

<a name="Batch#run"></a>
### batch.run([query], fn)
Run the batch request

**Kind**: instance method of <code>[Batch](#Batch)</code>  
**Api**: public  

| Param | Type |
| --- | --- |
| [query] | <code>Object</code> | 
| fn | <code>function</code> | 

