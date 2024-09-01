const UserModel = require('../models/Users');
const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');
const {generateToken} = require('../jwt/jwtGenerator');

 exports.register = async (req,res) =>{
    const { username, email, password } = req.body;

    if(username && email && password){
    const existingUser = await UserModel.findOne({username});
    if (existingUser) return res.status(400).json({message: "The User Is Already Existed", code:"Username"});
    
    const existingEmail = await UserModel.findOne({email});
    if (existingEmail) return res.status(400).json({message: "The Email Is Already Existed", code:"Email"})
  

    bcrypt.hash(password, 10).then((hash) => {
      const newUser = new UserModel({username: username, email:email, password:hash, role:"User"});
      newUser.save()
      .then(()=>{
        return res.status(201).json({ message: 'User registered successfully' });
      })
      .catch((err) => {
          if(err) {
              return res.status(400).json({error: err});
          }
      })
    })  
}
  }
  
const authenticateUser = async (loginUser) => {
  const {username, password} = loginUser;
  const user = await UserModel.findOne({username:username});

  if(!user) return null;

  const db_password = user.password;
  const match = await bcrypt.compare(password, db_password)

    if(!match)
        return null;
    else{

      return user; 
    }
  

}
  exports.login = async (req,res) => {
    const {username, password} = req.body;
    const user = await authenticateUser({username, password}); // authenticate user function
    console.log(user);
    if (user) {
        const token = generateToken(user); // function to generate the JWT token

        res.cookie('accessToken', token, {
            httpOnly: true,       // Prevents JavaScript access to the cookie
            // secure: true,         // Ensures cookie is sent only over HTTPS
            sameSite: 'Strict',   // Prevents CSRF attacks
            maxAge: 3600000       // Set the cookie expiration time (1 hour)
        });

       return res.status(200).json({ username: username, success: true, message: "Logged in successfully" });
    } else {
       return res.status(401).json({ success: false, message: "Authentication failed" });
    }
};

