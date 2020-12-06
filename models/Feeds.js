const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newFeedSchema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    required: true
  },
   timeline: {
      type:String
    },
    date:{
        type: Date
      },
    username:{
      type:String
    },
    profilephoto:{
      type:String
    },
    imagecaption:{
      type:String
    },
    Like:{
      type:Number,
      default:0
    },
    comments:[[]],
    Likers:[{type: Schema.Types.ObjectId}
    ]
    
});
module.exports = mongoose.model('Feeds', newFeedSchema);