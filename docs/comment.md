  - [Comment()](#commentcidstringpidstringsidstringwpcomwpcom)
  - [Comment.get()](#commentgetqueryobjectfnfunction)
  - [Comment.replies()](#commentrepliesqueryobjectfnfunction)
  - [Comment.add()](#commentaddqueryobjectbodystringobjectfnfunction)
  - [Comment.update()](#commentupdatequeryobjectbodystringobjectfnfunction)
  - [Comment.reply()](#commentreplyqueryobjectbodystringobjectfnfunction)
  - [Comment.prototype.del](#commentprototypedel)
  - [Comment.like()](#commentlike)
  - [Comment.likesList()](#commentlikeslistqueryobjectfnfunction)

## Comment([cid]:String, [pid]:String, sid:String, wpcom:WPCOM)

  Comment methods

## Comment.get([query]:Object, fn:Function)

  Return a single Comment

## Comment.replies([query]:Object, fn:Function)

  Return recent comments for a post

## Comment.add([query]:Object, body:String|Object, fn:Function)

  Create a comment on a post

## Comment.update([query]:Object, body:String|Object, fn:Function)

  Edit a comment

## Comment.reply([query]:Object, body:String|Object, fn:Function)

  Create a Comment as a reply to another Comment

## Comment.prototype.del

  Delete a comment

## Comment.like()

  Create a `CommentLike` instance

## Comment.likesList([query]:Object, fn:Function)

  Get comment likes list
