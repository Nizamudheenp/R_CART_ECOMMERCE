const jwt = require('jsonwebtoken')
require('dotenv').config()
const userDB = require('../models/usermodel')



exports.auth = async(req,res,next)=>{
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader ) {
          return res.status(401).json({ message: "No token provided" });
        }   
        const token = authHeader.split(" ")[1]; 
        const decoded = jwt.verify(token,process.env.JWT_CODE)
        const user = await userDB.findById(decoded._id);
        if (!user) {
            return res.status(403).json({ message: "User not found, access denied" });
        }
  
      req.user = user; 
      next();
      
    
    } catch (error) {
      console.error("Auth server error:", error);
      return res.status(401).json({ message: "Invalid or expired token", error });
    }
}

exports.adminOnly = async (req,res,next)=>{
  try {
    if(req.user.isAdmin !== true){
      return res.status(403).json({ message: 'Access denied' }) 

    }
    next()
  } catch (error) {
    return res.status(401).json({ message: "server error - isAdmin", error: error.error });
  }
}