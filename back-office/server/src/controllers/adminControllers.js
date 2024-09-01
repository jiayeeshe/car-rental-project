const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');
const {generateToken} = require('../jwt/jwtGenerator');
const AdminModel = require('../models/Admin');

exports.register = async (req,res) =>{
    const { adminID, adminName, password, role } = req.body;

    if(adminID && adminName && password && role){
    const existingID = await AdminModel.findOne({adminID});
    if (existingID) return res.status(400).json({message: "The adminID Is Already Existed", code:"Username"});
    
    const existingName = await AdminModel.findOne({adminName});
    if (existingName) return res.status(400).json({message: "The adminName Is Already Existed", code:"Email"})
  

    bcrypt.hash(password, 10).then((hash) => {
      const newUser = new AdminModel({adminID: adminID, adminName: adminName, password:hash, role:role});
      newUser.save()
      .then(()=>{
        return res.status(201).json({ message: 'Admin registered successfully' });
      })
      .catch((err) => {
          if(err) {
              return res.status(400).json({error: err});
          }
      })
    })  
}
  }