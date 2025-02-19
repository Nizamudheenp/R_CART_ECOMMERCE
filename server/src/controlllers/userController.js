const userDB = require('../models/usermodel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


// regiatration
exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body
    const user = await userDB.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "user already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newuser = await userDB.create({ username, email, password: hashedPassword });

    // new user in db

    if (newuser) {
      res.status(201).json({
        _id: newuser._id,
        name: newuser.name,
        email: newuser.email,
        isAdmin: newuser.isAdmin,
        message: "user registered successfully"
      })
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "registration failed" })
  }
}

// login

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body
    const user = await userDB.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }
    const isPasswordMatches = await bcrypt.compare(password, user.password)
    if (!isPasswordMatches) {
      return res.status(400).json({ message: 'password is incorrect' })
    }

    // signing


    const token = jwt.sign({ _id: user.id, username: user.username, email }, process.env.JWT_CODE, { expiresIn: '7d' })
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "login failed" })
  }
}
exports.userDashboard = async (req, res) => {
  try {
    if (!req.user) {
      console.log("Authenticated User:", req.user);
      return res.status(401).json({ message: "Unauthorized. Token is missing ." });
    }
    const user = await userDB.findById(req.user._id).select('-password')

    res.json(user)
  } catch (error) {
    console.log('server error', error);
  }
}

