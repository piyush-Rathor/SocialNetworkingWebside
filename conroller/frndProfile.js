const User=require("../models/User");
exports.openfrndProfile = (req, res, next) => {
    const frndId = req.params.frndId;
    const userId = req.query.userId;
    User.findById({_id:userId}).then(user=>{
        User.findOne({_id:frndId}).then(frnd=>{
            User.find({$or:[{$and:[{_id:frnd.friends.friendsId},{_id:user.friends.friendsId}]}]}).then(CommanFrnd=>{
                User.find({$and:[{_id:frnd.friends.friendsId},{_id:{$nin:user.friends.friendsId}},{_id:{$nin:user._id}}]}).then(suggestfriends=>{
                    if(!req.session.isLoggedIn){
                        return res.redirect("/Login");
                    }
                    return res.render('frndProfile.ejs',{
                        frnd:frnd,
                        suggestfriends:suggestfriends,
                        CommanFrnd:CommanFrnd,
                        userId:userId,
                        isLoggedIn:req.session.isLoggedIn
                    })
                })
               
            })
            
        })
    })
    
    
}