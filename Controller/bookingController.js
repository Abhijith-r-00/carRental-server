const jwt = require('jsonwebtoken');
const Booking = require('../Models/bookingModel');
const Vehicle = require('../Models/vehicleModel'); // If you need to fetch vehicle info
const User = require('../Models/userModel'); // Optional if you want to verify owner

exports.addBooking = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const {
      _id, // vehicle ID
      owner,   // owner ID
      pickupDate,
      returnDate

    } = req.body;

    if (!_id || !owner || !pickupDate || !returnDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const timeDiff = Math.abs(end - start);
    const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

    // Get price per day from Vehicle model
    const vehicleData = await Vehicle.findById(_id);
    if (!vehicleData) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const pricePerDay = vehicleData.pricePerDay;
    const totalAmount = totalDays * pricePerDay;

    const newBooking = await Booking.create({
      user: userId,
      _id,
      owner,
      fromDate: start,
      toDate: end,
      totalDays,
      totalAmount,
      paymentStatus: 'Paid',
      bookingStatus: 'Confirmed',
    });

    return res.status(201).json({
      message: "Booking successful",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
