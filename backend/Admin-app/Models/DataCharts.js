const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let dataSchema = new Schema({
  id: {
    type: Number,
  },
  signDate: {
    type: Date,
  },
  typeOfSign: {
    type: String,
    enum: ["signin", "signup"],
  },
}, {
    collection: 'DataCharts'
  })

dataSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    // Find the highest existing id in the collection
    const highestData = await this.constructor.findOne({}, 'id').sort({ id: -1 });
    const highestId = highestData ? highestData.id : 0;

    // Set the id for the new car to one higher than the highest existing id
    this.id = parseInt(highestId) + 1;
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model('DataCharts', dataSchema)