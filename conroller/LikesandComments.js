const Feed = require("../models/Feeds");
const Feeds = require("../models/Feeds");
exports.like = (req, res, next) => {
  const FeedId = req.params.FeedId;
  const userId = req.query.userId;
  if(!req.session.isLoggedIn){
    return res.redirect("/Login");
}
  var flag = 1;
  Feed.findById({ _id: FeedId }).then((feed) => {
    feed.Likers.forEach((element) => {
      if (userId == element) {
        flag = 0;
      }
    });
    if (flag) {
      feed.Like += 1;
      feed.Likers.push(userId);
      feed.save();
      return res.status(201).send({Likes:feed.Like});
    } else {
      return res.status(201).send({Likes:feed.Like});
    }
  });
};
exports.Comment = (req, res, next) => {
  if(!req.session.isLoggedIn){
    return res.redirect("/Login");
}  const FeedId = req.params.FeedId;
  const username = req.body.usernameforComment;
  const Comment = req.body.Comment;
  var flag = 1;
  Feed.findById({ _id: FeedId }).then((feed) => {
    feed.comments.push([Comment, username, new Date()]);
    feed.save();
    return res.send(feed.comments);
  });
};
exports.CommentArray = (req, res, next) => {
  const FeedId = req.params.FeedId;
  if(!req.session.isLoggedIn){
    return res.redirect("/Login");
}
  Feed.findById({ _id: FeedId }).then((feed) => {
    return res.send(feed.comments);
  });
};
exports.shareLink = (req, res, next) => {
  if(!req.session.isLoggedIn){
    return res.redirect("/Login");
}  const url = req.originalUrl;
  a = "your Link is " + url + "  ";
  return res.send(a);
};
