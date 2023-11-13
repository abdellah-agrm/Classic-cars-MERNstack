const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user", 
  }, 
  photo: {
    type: String, 
    default: 'profile-img.jpg',
  },
  registrationDate: { 
    type: Date, 
    default: Date.now 
  },
  block: {
    type: Boolean,
    default: false
  }
});

// Define a pre-save hook to auto-increment the id
userSchema.pre('save', async function (next) {
  if (!this.isNew) {
    // If the document is not new, skip auto-increment logic
    return next();
  }

  try {
    // Find the highest existing id in the collection
    const highestUser = await this.constructor.findOne({}, 'id').sort({ id: -1 });
    const highestId = highestUser ? highestUser.id : 0;

    // Set the id for the new user to one higher than the highest existing id
    this.id = parseInt(highestId) + 1;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
