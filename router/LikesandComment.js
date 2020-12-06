const express = require("express");

const likeandCommentController = require('../conroller/LikesandComments');

const isAuth=require("../middleware/auth");


const router = express.Router();

router.post('/like/:FeedId',isAuth, likeandCommentController.like);

router.post('/Comment/:FeedId',isAuth, likeandCommentController.Comment);

router.post('/commentArray/:FeedId',isAuth, likeandCommentController.CommentArray);

router.post('/shareLink/:FeedId', isAuth,likeandCommentController.shareLink);




module.exports = router;