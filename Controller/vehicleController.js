const jwt = require("jsonwebtoken");
const vehicleModel = require("../Models/vehicleModel");
exports.addVehicle = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Authorization token missing",
      });
    }
    const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
    // console.log(req.body);
    // console.log(decoded);
    const {
      make,
      model,
      year,
      type,
      pricePerDay,
      fuelType,
      transmission,
      seats,
      mileage,
      features,
      vehicleNumber,
      location
    } = req.body;
    const image = req.file ? req.file.filename : "";
    // const owner=

    // console.log("vehicleNumber:", vehicleNumber);
    // console.log("image: ",image)
    const existingVehicle = await vehicleModel.findOne({
      vehicleNumber: vehicleNumber,
    });
    // console.log(existingVehicle)
    if (existingVehicle) {
      return res.status(409).json("Vehicle already exists!");
    }

    const newVehicle = new vehicleModel({
      make,
      model,
      year,
      type,
      pricePerDay,
      fuelType,
      transmission,
      seats,
      mileage,
      features: features || [],
      image: image || "",
      owner: decoded.userId,
      isAvailable: true,
      vehicleNumber,
      location,
    });

    await newVehicle.save();
    // console.log(newVehicle);
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getVehicleList = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
const userId=decoded.userId
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Authorization token missing",
      });
    }
    const vehicles= await vehicleModel.find({owner:userId})
    res.status(200).json(vehicles)
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.deleteVehicle=async(req,res)=>{
  try {
    const id=req.params.id
  //  console.log(id);
   
       const deletedVehicle = await vehicleModel.findOneAndDelete({ _id: id});
// console.log(deletedVehicle)
    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found or you are not authorized to delete it" });
    }

    return res.status(200).json({ message: "Vehicle deleted successfully", deletedVehicle });
   
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getVehiclesByLocation = async (req, res) => {
  try {
  //  console.log(req)
    const { search } = req.query;
 const location=search
    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    const vehicles = await vehicleModel.find({
      location: location,
      isAvailable: true
    });

    res.status(200).json({ vehicles });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
