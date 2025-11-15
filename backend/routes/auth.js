const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const axios = require('axios')
const JWT_SECRET = process.env.JWT_SECRET;

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', async (req, res) => {
  let success = false;

  // If there are errors, return Bad request and the errors
  if (req.body.googleAccessToken) {
    const { googleAccessToken } = req.body;
    axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        "Authorization": `Bearer ${googleAccessToken}`
      }
    })
      .then(async response => {
        const name = response.data.given_name;

        const email = response.data.email;
        const userType = 'Student';
        const profilepic = response.data.picture;
        let user = await User.findOne({ email })

        if (user) {
          return res.status(400).json({ message: "User already exist!" })
        }
        success = true;
        user = await User.create({ name, email, userType, profilepic })
        const data = {
          user: {
            id: user.id
          }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
  
        const firstTime = true;
        res.status(200).json({ result: user, success, firstTime, authtoken, userType })
      })
      .catch(err => {
        res.status(400).json({ message: "Invalid access token!" })
      })

  }
  else {
    try {
      // Check whether the user with this email exists already
   
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        userType: req.body.userType
      });
      const data = {
        user: {
          id: user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);

      const userwithoutpassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        profilepic: user.profilepic,
        resume: user.resume,
        datecreated: user.date
      }

      success = true;
      const userType = user.userType;
      res.json({ result: userwithoutpassword, success, authtoken, userType })

    } catch (error) {
      console.error("Signup error:", error.message);
      console.error("Full error:", error);
      res.status(500).json({ success: false, error: "Internal Server Error", message: error.message });
    }
  }
});


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', async (req, res) => {
  console.log('Login route hit:', req.method, req.path);
  console.log('Request body:', req.body);
  let success = false;
  // If there are errors, return Bad request and the errors


  if (req.body.googleAccessToken) {
    console.log('Google login attempt detected');

    // google-auth
    const { googleAccessToken } = req.body;

    axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        "Authorization": `Bearer ${googleAccessToken}`
      }
    })
      .then(async response => {
        const firstName = response.data.given_name;
        const lastName = response.data.family_name;
        const email = response.data.email;
        const profilepic = response.data.picture;

        const user = await User.findOne({ email })

        if (!user)
          return res.status(404).json({ message: "User don't exist!" })
        success = true;

        const data = {
          user: {
            id: user.id
          }
        }

        let authtoken = jwt.sign(data, JWT_SECRET);
        const userType = user.userType
        res
          .status(200)
          .json({ result: user, success, authtoken, userType })

      })
      .catch(err => {
        res
          .status(400)
          .json({ message: "Invalid access token!" })
      })
  }
  else {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        success = false
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      const userwithoutpassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        profilepic: user.profilepic,
        resume: user.resume,
        datecreated: user.date
      }
      success = true;
      const userType = user.userType;
      res.json({ result: userwithoutpassword, success, authtoken, userType })

    } catch (error) {
      console.error(error.message);
      res.status(500).send(JSON.stringify("Internal Server Error"));

    }
  }
}
);


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send(JSON.stringify("Internal Server Error"));

  }
})

router.put('/updateuser', fetchuser, async (req, res) => {
  const { name, userType, profilepic, resume } = req.body;
  try {
    // Create a newUser object
    const newUser = {};
    if (name) { newUser.name = name };
    if (userType) { newUser.userType = userType };
    if (profilepic) { newUser.profilepic = profilepic };
    if (resume) { newUser.resume = resume };

    // Find the user to be updated and update it
    const user = await User.findById(req.user.id).select("-password")
    //  return res.status(404).send(`Not Found ${(newUser)}`)

    if (!user) { return res.status(404).send(`Not Found ${req.user.id}`) }
    //  return res.status(404).send(`Not Found ${user}`)

    let newuser = await User.findByIdAndUpdate(req.user.id, { $set: newUser }, { new: true })
    res.json(newuser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router