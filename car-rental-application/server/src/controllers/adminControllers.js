const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');
const {generateToken} = require('../jwt/jwtGenerator');
const AdminModel = require('../models/Admin');
const CarModel = require('../models/Cars');

exports.register = async (req,res) =>{
    const { adminID, adminName, password, role } = req.body;

    if(adminID && adminName && password && role){
    const existingID = await AdminModel.findOne({adminID});
    if (existingID) return res.status(400).json({message: "The adminID Is Already Existed", code:"Username"});
    
    const existingName = await AdminModel.findOne({adminName});
    if (existingName) return res.status(400).json({message: "The adminName Is Already Existed", code:"Email"})
  

    bcrypt.hash(password, 10).then((hash) => {
      const newAdmin = new AdminModel({adminID: adminID, adminName: adminName, password:hash, role:role});
      newAdmin.save()
      .then(()=>{
        return res.status(201).json({message: 'Admin registered successfully' });
      })
      .catch((err) => {
          if(err) {
              return res.status(400).json({error: err});
          }
      })
    })  
}
  }


  const authenticateAdmin = async (loginAdmin) => {
    const {adminID, password} = loginAdmin;
    const admin = await AdminModel.findOne({adminID:adminID});
  
    if(!admin) return null;
  
    const db_password = admin.password;
    const match = await bcrypt.compare(password, db_password)
  
      if(!match)
          return null;
      else{
  
        return admin; 
      }
    
  
  }
    exports.login = async (req,res) => {
      const {adminID, password} = req.body;
      console.log(`admin id : ${adminID} password: ${password}`);
      const admin = await authenticateAdmin({adminID, password}); // authenticate admin function
      console.log(admin);
      if (admin) {
          const token = generateToken(admin); // function to generate the JWT token
  
          res.cookie('accessToken', token, {
              httpOnly: true,       // Prevents JavaScript access to the cookie
              // secure: true,         // Ensures cookie is sent only over HTTPS
              sameSite: 'Strict',   // Prevents CSRF attacks
              maxAge: 3600000       // Set the cookie expiration time (1 hour)
          });
  
         return res.status(200).json({ adminID:adminID, adminName:admin.adminName, success: true, message: "Logged in successfully" });
      } else {
         return res.status(401).json({ success: false, message: "Authentication failed" });
      }
  };
  
  exports.updateCarDetails = async (req,res) =>{
    try{
    const admin_id = req.user.id;
    const role = req.user.role;
    const carId = req.params.carId;
    const modifiedData = req.body

     // Update only the modified fields with authenticated role
     if(admin_id && role){
      if(role==="super_admin"){
     const updatedCar = await CarModel.findByIdAndUpdate(
      carId,
      { $set: modifiedData },
      { new: true } // Return the updated document
    );
    if (!updatedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }

  }
  else {
    return res.status(404).json("You have no such authorization")
  }
  }



    return res.status(200).json({ message: 'Car updated successfully'});
  } catch (error) {
    console.error(`Error updating car: ${error.message}`, error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  }


  exports.insertNewCar = async (req,res) => {
    try {
      const admin_id = req.user.id;
      const role = req.user.role;

      const request = req.body;
      // Insert data with authenticated role
     if(admin_id && role){
      if(role==="super_admin"){
      const newCar = new CarModel(request);
      newCar.save()
      .
      then(() =>{
        return res.status(201).json({message: 'Inserted new car successfully' });
      }).catch((err) =>{
        return res.status(400).json({error:err});
      }) 
    }
    else{
      return res.status(400).json("You have no such authorization")
    }
  }

    } catch(err){
      console.log(err);
      return res.status(400).json({error:err});
    }
  }

  exports.deleteExistingCar = async (req,res) => {
    try {
      const admin_id = req.user.id;
      const role = req.user.role;
      const carId = req.params.carId;

      if(admin_id && role){
        if(role==="super_admin"){
      const removedCar = await CarModel.findByIdAndDelete(carId);
  
      if (!removedCar) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      return res.status(200).json({ message: 'Car deleted successfully', removedCar });
    }
    else {
      return res.status(400).json("You have no such authorization")
    }
  }

    } catch (error) {
      return res.status(500).json({ message: 'Error deleting car', error });
    }
  };
