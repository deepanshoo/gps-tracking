const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required:true, default: false },
  location: {
    type: {
      latitude: { type: Number, required: true, default: 0 },
      longitude: { type: Number, required: true,default:0 }
    }
  }
});

//Sets the default value for latitude and longitude
userSchema.pre('save', function (next) {
  if (!this.location) {
    this.location = { latitude: 0, longitude: 0 };
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
