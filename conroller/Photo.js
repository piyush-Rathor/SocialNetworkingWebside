const User = require('../models/User');
const Feeds = require('../models/Feeds');



exports.profilePhotoUpload = (req, res, next) => {
    const profilePhoto = req.file;
    const userId = req.body.userId;
    User.findOne({
        _id: userId
    }).then(user => {
        const feeds = new Feeds({
            userId: user._id,
            timeline: profilePhoto.path,
            date: new Date(),
            username:user.name,
            profilephoto:user.imageUrl,
            imagecaption:user.name+" update his profile Photo",
        });
        feeds.save();
        user.imageUrl = profilePhoto.path;
        user.timeline.splice(0, 0, [profilePhoto.path, "", new Date()]);
        user.save();
       
    })
    res.send("your dp changed");

}
exports.removeProfilePhoto = (req, res, next) => {
    const userId = req.body.userId;
    User.findOne({
        _id: userId
    }).then(user => {
        user.imageUrl = "images/2020-11-21T07:15:31.202Z-def.png";
        user.save();
    })
    res.send("your dp Removed");

}

exports.uploadTimelinePhoto = (req, res, next) => {
    const userId = req.body.userId;
    const Photo = req.file;
    var captionImage = req.body.captionImage;
    if (!Photo) {
        return res.send("<h1>Please Upload Photo</h1>")
    }
    if (!captionImage) {
        captionImage = "$2a$12$y2zXdKow.MQn/HUE2RnIS.12CMzooEtKCs4i/cUTndZ6nT8OkiR96 Much"
    }
    User.findOne({
        _id: userId
    }).then(user => {
        const feeds = new Feeds({
            userId: user._id,
            timeline: Photo.path,
            date: new Date(),
            username:user.name,
            profilephoto:user.imageUrl,
            imagecaption:captionImage!= "$2a$12$y2zXdKow.MQn/HUE2RnIS.12CMzooEtKCs4i/cUTndZ6nT8OkiR96 Much"?captionImage:""
        });
        feeds.save();
        // user.imageUrl="images/2020-11-21T07:15:31.202Z-def.png";
        // user.save();
        user.timeline.splice(0, 0, [Photo.path, captionImage, new Date()]);
        user.save();
        return res.send("Your Photo Uploaded");


    })
    // res.send("your dp Removed");

}


exports.uploadTimelinePhotoorchaption = (req, res, next) => {
    const userId = req.body.userId;
    var Photo = req.file;
    var captionImage = req.body.captionImage;
    if (!(Photo || captionImage)) {
        return res.send("<h1>Please Upload Photo Or Caption</h1>")
    }
    if (!Photo) {
        Photo = "$2a$12$y2zXdKow.MQn/HUE2RnIS.12CMzooEtKCs4i/cUTndZ6nT8OkiR96 Much"
    }
    if (!captionImage) {
        captionImage = "$2a$12$y2zXdKow.MQn/HUE2RnIS.12CMzooEtKCs4i/cUTndZ6nT8OkiR96 Much"
    }
    User.findOne({
        _id: userId
    }).then(user => {
        // user.imageUrl="images/2020-11-21T07:15:31.202Z-def.png";
        // user.save();
        const feeds = new Feeds({
            userId: user._id,
            timeline: Photo.path,
            date: new Date(),
            username:user.name,
            profilephoto:user.imageUrl,
            imagecaption:captionImage!= "$2a$12$y2zXdKow.MQn/HUE2RnIS.12CMzooEtKCs4i/cUTndZ6nT8OkiR96 Much"?captionImage:""
        });
        feeds.save();
        user.timeline.splice(0, 0, [Photo == "$2a$12$y2zXdKow.MQn/HUE2RnIS.12CMzooEtKCs4i/cUTndZ6nT8OkiR96 Much" ? "$2a$12$y2zXdKow.MQn/HUE2RnIS.12CMzooEtKCs4i/cUTndZ6nT8OkiR96 Much" : Photo.path, captionImage, new Date()]);
        user.save();
        return res.send("<h1>Your timeline added</h1>")


    })
    // res.send("your dp Removed");

}