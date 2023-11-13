const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  userId: {
    type: Number
  },
  carId: {
    type: Number
  },
});

favoriteSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    // Find the highest existing id in the collection
    const highestFav = await this.constructor.findOne({}, 'id').sort({ id: -1 });
    const highestId = highestFav ? highestFav.id : 0;

    // Set the id for the new fav to one higher than the highest existing id
    this.id = parseInt(highestId) + 1;
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("Favorite", favoriteSchema);