const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let carSchema = new Schema({
  id: {
    type: Number,
  },
  model: {
    type: String
  },
  brand: {
    type: String
  },
  details: {
    type: String
  },
  year: {
    type: Number
  },
  maxSpeed: {
    type: Number
  },
  img: {
    type: String
  },
  userId: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  creationDate: { 
    type: Date, 
    default: Date.now 
  },
  rejectedDate: {
    type: Date,
    index: { expires: '1d' },
  },
}, {
    collection: 'cars'
  })

carSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    // Find the highest existing id in the collection
    const highestCar = await this.constructor.findOne({}, 'id').sort({ id: -1 });
    const highestId = highestCar ? highestCar.id : 0;

    // Set the id for the new car to one higher than the highest existing id
    this.id = parseInt(highestId) + 1;
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model('Cars', carSchema)