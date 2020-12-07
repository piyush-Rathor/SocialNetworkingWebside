const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  friends: {
    friendsId: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }]
  },
  friendsReq: {
    friendsId: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }],
  },
  imageUrl: {
    type: String,
    default: "images/profile.png"
  },
  AboutProfession: {
    type: String,
    default: "Website User"
  },
  AboutWorkPlaceCampanyName: {
    type: String,
    default: ""
  },
  AboutWorkPlaceCampanyPosition: {
    type: String,
    default: ""
  },
  AboutWorkPlaceCampanyCity: {
    type: String,
    default: ""
  },
  AboutCollegeCollegeName: {
    type: String,
    default: ""
  },
  AboutCollegeGraduationIn: {
    type: String,
    default: ""
  },
  AboutCollegeCollegeHighSchool: {
    type: String,
    default: ""
  },
  AboutCity: {
    type: String,
    default: ""
  },
  AboutHomeTown: {
    type: String,
    default: ""
  },
  AboutMobileNumber: {
    type: Number,
    default: ""
  },
  AboutDateofBith: {
    type: Date,
    default: ""
  },
  AboutGender: {
    type: String,
    default: ""
  },
  AboutRelationshipStatus: {
    type: String,
    default: ""
  },

  timeline: [
    [{
        type: String
      },
      {
        type: String
      },
      {
        type: Date,
        required: true
      }
    ]
  ],
  lastSeen: {
    type: Date,
    default: ""
  }

});
module.exports = mongoose.model('User', userSchema);