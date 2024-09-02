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
    const carId = req.params.carId;
    console.log(`req.body ${req.body}`);
    const modifiedData = req.body
    console.log(`modified data: ${JSON.stringify(modifiedData, null, 2)}`);
    console.log(`car id is ${carId}`);
     // Update only the modified fields
     const updatedCar = await CarModel.findByIdAndUpdate(
      carId,
      { $set: modifiedData },
      { new: true } // Return the updated document
    );
    console.log(updatedCar);
    
    if (!updatedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }

    return res.status(200).json({ message: 'Car updated successfully', updatedCar });
  } catch (error) {
    console.error(`Error updating car: ${error.message}`, error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  }
