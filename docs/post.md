  - [Post()](#postidstringsidstringwpcomwpcom)
  - [Post.id()](#postididstring)
  - [Post.slug()](#postslugslugstring)
  - [Post.get()](#postgetqueryobjectfnfunction)
  - [Post.getBySlug()](#postgetbyslugqueryobjectfnfunction)
  - [Post.add()](#postaddqueryobjectbodyobjectfnfunction)
  - [Post.update()](#postupdatequeryobjectbodyobjectfnfunction)
  - [Post.prototype.del](#postprototypedel)
  - [Post.restore()](#postrestorequeryobjectfnfunction)
  - [Post.likesList()](#postlikeslistqueryobjectfnfunction)
  - [Post.related()](#postrelatedbodyobjectfnfunction)
  - [Post.like()](#postlike)
  - [Post.reblog()](#postreblog)
  - [Post.comment()](#postcommentcidstring)
  - [Post.comments()](#postcommentsqueryobjectfnfunction)

## Post(id:String, sid:String, wpcom:WPCOM)

  Post methods

## Post.id(id:String)

  Set post `id`

## Post.slug(slug:String)

  Set post `slug`

## Post.get([query]:Object, fn:Function)

  Get post

## Post.getBySlug([query]:Object, fn:Function)

  Get post by slug

## Post.add([query]:Object, body:Object, fn:Function)

  Add post

## Post.update([query]:Object, body:Object, fn:Function)

  Edit post

## Post.prototype.del

  Delete post

## Post.restore([query]:Object, fn:Function)

  Restore post

## Post.likesList([query]:Object, fn:Function)

  Get post likes list

## Post.related(body:Object, fn:Function)

  Search within a site for related posts

## Post.like()

  Create a `Like` instance

## Post.reblog()

  Create a `Reblog` instance

## Post.comment([cid]:String)

  Create a `Comment` instance

## Post.comments([query]:Object, fn:Function)

  Return recent comments
