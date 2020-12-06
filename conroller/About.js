const User = require('../models/User');
const bcrypt = require('bcryptjs');
const fs = require("fs");
const Feeds = require("../models/Feeds");

const deleteFile = (filePath) => {
   fs.unlink(filePath, (err) => {
      if (err) {
         throw err;
      }
   })
}
const nodemailer = require('nodemailer'); //import nodemailer to send mails to varify

const transporter = nodemailer.createTransport({ //transporter bnaya using nodemailer 
   service: 'gmail',
   auth: {
      user: 'psrathor16072000@gmail.com',
      pass: 'Piyush*123'
   }
});

exports.AboutProfession = (req, res, next) => {
   const id = req.body.userId;
   const AboutProfession = req.body.AboutProfession;
   User.findOne({
      _id: id
   }).then(user => {
      if(!req.session.isLoggedIn){
         return res.redirect("/Login");
     }
      user.AboutProfession = AboutProfession;
      user.save()
      return res.send("<h1>Your Profile Upgrated<h1>")
   })
}
exports.AboutWorkPlace = (req, res, next) => {
   const id = req.body.userId;
   const AboutWorkPlaceCampanyName = req.body.AboutWorkPlaceCampanyName;
   const AboutWorkPlaceCampanyPosition = req.body.AboutWorkPlaceCampanyPosition;
   const AboutWorkPlaceCampanyCity = req.body.AboutWorkPlaceCampanyCity;
   if(!req.session.isLoggedIn){
      return res.redirect("/Login");
  }
   User.findOne({
      _id: id
   }).then(user => {
      if(!req.session.isLoggedIn){
         return res.redirect("/Login");
     }
      user.AboutWorkPlaceCampanyName = AboutWorkPlaceCampanyName;
      user.AboutWorkPlaceCampanyPosition = AboutWorkPlaceCampanyPosition;
      user.AboutWorkPlaceCampanyCity = AboutWorkPlaceCampanyCity;
      user.save()
      return res.send("<h1>Your Profile Upgrated<h1>")
   })
}
exports.AboutCollege = (req, res, next) => {
   const id = req.body.userId;
   const AboutCollegeCollegeName = req.body.AboutCollegeCollegeName;
   const AboutCollegeGraduationIn = req.body.AboutCollegeGraduationIn;
   const AboutCollegeCollegeHighSchool = req.body.AboutCollegeCollegeHighSchool;
   if(!req.session.isLoggedIn){
      return res.redirect("/Login");
  }
   User.findOne({
      _id: id
   }).then(user => {
      if(!req.session.isLoggedIn){
         return res.redirect("/Login");
     }
      user.AboutCollegeCollegeName = AboutCollegeCollegeName;
      user.AboutCollegeGraduationIn = AboutCollegeGraduationIn;
      user.AboutCollegeCollegeHighSchool = AboutCollegeCollegeHighSchool;
      user.save()
      return res.send("<h1>Your Profile Upgrated<h1>")
   })
}

exports.AboutCity = (req, res, next) => {
   const id = req.body.userId;
   const CurrentCity = req.body.CurrentCity;
   if(!req.session.isLoggedIn){
      return res.redirect("/Login");
  }
   User.findOne({
      _id: id
   }).then(user => {
      if(!req.session.isLoggedIn){
         return res.redirect("/Login");
     }
      user.AboutCity = CurrentCity;
      user.save()
      return res.send("<h1>Your Profile Upgrated<h1>")
   })
}
exports.AboutHomeTown = (req, res, next) => {
   const id = req.body.userId;
   const HomeTown = req.body.HomeTown;
   if(!req.session.isLoggedIn){
      return res.redirect("/Login");
  }
   User.findOne({
      _id: id
   }).then(user => {
      if(!req.session.isLoggedIn){
         return res.redirect("/Login");
     }
      user.AboutHomeTown = HomeTown;
      user.save()
      return res.send("<h1>Your Profile Upgrated<h1>")
   })
}
exports.AboutMobileNumber = (req, res, next) => {
   const id = req.body.userId;
   const MobileNumber = req.body.MobileNumber;
   if(!req.session.isLoggedIn){
      return res.redirect("/Login");
  }
   User.findOne({
      _id: id
   }).then(user => {
      if(!req.session.isLoggedIn){
         return res.redirect("/Login");
     }
      user.AboutMobileNumber = MobileNumber;
      user.save()
      return res.send("<h1>Your Profile Upgrated<h1>")
   })
}
exports.AboutDateofBith = (req, res, next) => {
   const id = req.body.userId;
   const DateofBirth = req.body.DateofBirth;
   if(!req.session.isLoggedIn){
      return res.redirect("/Login");
  }
   User.findOne({
      _id: id
   }).then(user => {
      if(!req.session.isLoggedIn){
         return res.redirect("/Login");
     }
      user.AboutDateofBith = DateofBirth;
      user.save()
      return res.send("<h1>Your Profile Upgrated<h1>")
   })
}
exports.AboutGender = (req, res, next) => {
   const id = req.body.userId;
   const Gender = req.body.Gender;
   if(!req.session.isLoggedIn){
      return res.redirect("/Login");
  }
   User.findOne({
      _id: id
   }).then(user => {
      if(!req.session.isLoggedIn){
         return res.redirect("/Login");
     }
      user.AboutGender = Gender;
      user.save()
      return res.send("<h1>Your Profile Upgrated<h1>")
   })
}
exports.AboutRelationshipStatus = (req, res, next) => {
   const id = req.body.userId;
   const RelationStatus = req.body.RelationStatus;
   if(!req.session.isLoggedIn){
      return res.redirect("/Login");
  }
   User.findOne({
      _id: id
   }).then(user => {
      if(!req.session.isLoggedIn){
         return res.redirect("/Login");
     }
      user.AboutRelationshipStatus = RelationStatus;
      user.save()
      return res.send("<h1>Your Profile Upgrated<h1>")
   })
}

exports.changePassword = (req, res, next) => {
   const userId = req.query.userId;
   const currentPassword = req.body.currentPassword;
   const newPassword = req.body.newPassword;
   const confirmPassword = req.body.confirmPassword;
   if(!req.session.isLoggedIn){
      return res.redirect("/Login");
  }
   if (newPassword != confirmPassword) {
      return res.send("Your New Password and Confirm Password do not Match");
   }
   User.findById({
      _id: userId
   }).then(user => {
      bcrypt
         .compare(currentPassword, user.password).then(doMatch => {
            if (doMatch) {
               bcrypt.hash(newPassword, 12).then(val => {
                  if(!req.session.isLoggedIn){
                     return res.redirect("/Login");
                 }
                  user.password = val;
                  user.save();
                  return res.send("Your New Password Saved");
               })
            } else {
               return res.send("Your current Password is Wrong");
            }
         })
   })
}

exports.delAccountfromprofile = (req, res, next) => {
   const confirmPassword = req.body.confirmPassword;
   const userId = req.query.userId;
   if(!req.session.isLoggedIn){
      return res.redirect("/Login");
  }
   User.findOne({
      _id: userId
   }).then(user => {
      bcrypt.compare(confirmPassword, user.password).then(doMatch => {
         if (doMatch) {
            User.find({
               _id: user.friends.friendsId
            }).then(frnds => {
               frnds.forEach(frnd => {
                  frnd.friends.friendsId = frnd.friends.friendsId.filter(function (item) {
                     return item.toString() != userId.toString()
                  })
                  frnd.save();
               })
               Feeds.find({
                  userId: userId
               }).then(feeds => {
                  feeds.forEach(feed => {
                     if (feed.timeline) {
                        deleteFile(feed.timeline);
                     }
                     feed.remove()
                  })
               })

            })
            user.remove()
            res.send("Your Account Deleted");
         } else {
            res.send("Your Password is not Currect");
         }

      })

   })
}

exports.changeEmailProfile = (req, res, next) => {
   const val = Math.floor(1000 + Math.random() * 9000).toString();
   const email = req.body.email;
   const userId = req.query.userId;
   const password = req.body.Password;
   if(!req.session.isLoggedIn){
      return res.redirect("/Login");
  }
   User.findById({
      _id: userId
   }).then(user => {
      bcrypt.compare(password, user.password).then(doMatch => {
         if (doMatch) {
            if (user.email.toString() == email.toString()) {
               return res.send("You send Your Old Email ..");
            }
            var mailOptions = {
               from: 'psrathor16072000@gmail.com',
               to: email,
               subject: 'Otp for Email changing ',
               html: `<p>hey dude</p>
                <p>You gonna change your email on iConnect ${user.email} </p>
                <h4>Now You Wanna this ${email}</h4>
                <p>Your OTP is </p>
                <h1>${val}</h1>`
            }
            bcrypt.hash(val, 12).then(val => {
               res.render('normal-view/forChangeEmailOtp.ejs', {
                  otp: val,
                  password: password,
                  Otp4forgeeting: false,
                  userId: user._id,
                  email: email
               })
               return transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                     console.log(error);
                  } else {
                     console.log('Email Sent:' + info.response);
                  }
               })
            })



         } else {
            return res.send("Your Password is not correct")
         }
      })
   })
}

exports.ConfirmOTPforChangeEmail = (req, res, next) => {
   const otp = req.body.otp;
   const userOtp = req.body.userOtp;
   const userId = req.body.userId;
   const email = req.body.userNewEmail;
   if(!req.session.isLoggedIn){
      return res.redirect("/Login");
  }
   bcrypt.compare(userOtp, otp).then(doMatch => {
      if (doMatch) {
         User.findById({
            _id: userId
         }).then(user => {
            user.email = email
            user.save();
            return res.redirect('/login');
         })
      } else {
         return res.send("Your otp didnt Match")
      }
   })
}