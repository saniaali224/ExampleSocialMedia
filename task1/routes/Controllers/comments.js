const config = require('../../config');
const Comments = require("../../models/Comment");
const Posts= require("../../models/posts")

const comments = {
   getAll:async (req, res) => {
      const response = {};
      try {
          Comments.find(async (err, data) => {
              if (err) {
                  response.statusCode = 500;
                  response.body = JSON.stringify({err});
                  res.status(response.statusCode).send(response.body);
              } else {
                  response.statusCode = 200;
                  response.body = JSON.stringify({
                      message: 'Ok',
                      data: data
                  });
              }
              await res.status(response.statusCode).send(response.body);
          })
      } catch (err) {
          response.statusCode = 500;
          response.body = JSON.stringify({err});
          res.status(response.statusCode).send(response.body);
      }
  },
   addComment: async (req, res) => {
      const {userid}=req.userId
      const response={};
      const post = await Posts.findOne({_id:req.params.postid});

      const comment = new Comments();
      comment.commentval = req.body.commentval;
      comment.post=post._id;
      comment.UserID=userid
      

      await comment.save();
      post.comments.push(comment._id);

      await post.save()
      res.send(comment)
      .then( async result=>{
         response.statusCode = 200;
      response.body = JSON.stringify({
          message: 'Ok',
          data: result
      });
      await res.status(response.statusCode).send(response.body);
   })
   .catch(err=>{
      response.statusCode = 500;
      response.body = JSON.stringify({ "err": err });
      console.log(err)
      res.status(response.statusCode).send(response.body);

  
   })
     
      },
      addreplies:async (req, res) => {
         const {userid}=req.userId;
         const { commentid, text } = req.body;
         const comment = await Comments.findByIdAndUpdate(
            commentid,
            {
               $push: {
                  replies: {
                     text,
                     UserID: userid,
                  },
               },
            },
            {
               new: true,
               upsert: true,
            },
            
         )
         res.status(200).json({
            text,
            // userId: user,
            _id: comment.replies[comment.replies.length - 1]
         });

   
      //    const response={};
      //    const posts = await Posts.findOne({_id:req.params.postid});
      //    const comments = await Comments.findOne({_id:req.params.commentid});
   
      //    const reply = new Reply();
      //    reply.text = req.body.text;
      //    reply.commentid=comments._id;
      //    reply.post=posts._id;
   
      //    await reply.save();
      //    comments.replies.push(reply._id);
   
      //    await comments.save()
      //    res.send(reply)
         
      //    await posts.save()
      //    res.send(reply)
      //    then( async result=>{
      //       response.statusCode = 200;
      //    response.body = JSON.stringify({
      //        message: 'Ok',
      //        data: result
      //    });
      //    await res.status(response.statusCode).send(response.body);
      // })
      // .catch(err=>{
      //    response.statusCode = 500;
      //    response.body = JSON.stringify({ "err": err });
      //    console.log(err)
      //    res.status(response.statusCode).send(response.body);
   
     
      // })
        
   }
   }
 
      
module.exports = comments;