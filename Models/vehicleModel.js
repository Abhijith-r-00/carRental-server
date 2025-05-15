const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, 'Make is required'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [2000, 'Year must be 2000 or later'],
    max: [new Date().getFullYear() + 1, `Year cannot be in the future`]
  },
  type: {
    type: String,
    required: [true, 'Vehicle type is required'],
    enum: [
      'Sedan', 'SUV', 'Truck', 'Hatchback', 
      'Coupe', 'Convertible', 'Van', 'Luxury'
    ]
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Price per day is required'],
    min: [1, 'Price must be at least $1']
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'],
    default: 'Petrol'
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Automatic', 'Manual'],
    default: 'Automatic'
  },
  seats: {
    type: Number,
    required: [true, 'Number of seats is required'],
    min: [1, 'Vehicle must have at least 1 seat'],
    max: [40, 'Vehicle cannot have more than 40 seats']
  },
  mileage: {
    type: Number,
    required: [true, 'Mileage is required'],
    min: [0, 'Mileage cannot be negative']
  },
  features: {
    type: [String],
    default: []
  },
  image: {
    type: String, // This would store the path or URL to the image
    default: ''
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  owner:{
    type:String,
    required:true
  },
  vehicleNumber:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  }
});

// Update the updatedAt field before saving
vehicleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = vehicle;