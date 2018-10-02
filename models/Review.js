const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: "business"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  stars: { type: Number, min: 0, max: 5, required: true },
  avatar: {
    type: String
  },
  useful: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  funny: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  cool: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Review = mongoose.model("review", ReviewSchema);
