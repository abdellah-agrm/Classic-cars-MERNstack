const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  userId: {
    type: Number
  },
  usernameMsg: {
    type: String
  },
  emailMsg: {
    type: String
  },
  photoMsg: {
    type: String
  },
  subject: {
    type: String
  },
  textMsg: {
    type: String
  },
  typeMsg: {
    type: String,
    enum: ["report", "opinion"],
  },
  statusMsg: {
    type: String,
    enum: ["pending", "approved", "rejected", "done"],
    default: "pending",
  },
  rejectedDate: {
    type: Date,
    index: { expires: '1d' },
  },
});

messageSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    // Find the highest existing id in the collection
    const highestMsg = await this.constructor.findOne({}, 'id').sort({ id: -1 });
    const highestId = highestMsg ? highestMsg.id : 0;

    // Set the id for the new Msg to one higher than the highest existing id
    this.id = parseInt(highestId) + 1;
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("Message", messageSchema);