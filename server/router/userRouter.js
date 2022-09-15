const express = require('express');
const {User} = require('../models/user.models');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authentication');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

//Setting router
const router = new express.Router();
router.use(cookieParser()); // cookie parser

//Register User
router.post('/api/signup', async (req, res) => {
    try{
        const {name, email, password, confirmPassword} = req.body;
        if(password === confirmPassword){
            const beforeUser = new User({name, email, password});
            const salt = await bcrypt.genSalt(10);
            beforeUser.password = await bcrypt.hash(beforeUser.password, salt);
            const user = await beforeUser.save();
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET_KEY);
            
            res.cookie("jwt_token", token, {
                expires: new Date(Date.now() + (24*60*60*1000)), httpOnly: true, 
            });

            res.status(200).json({status: 200 , user: token});
        }
        else {
            res.status(401).json({status: 401, message: "Password & Confirm Password not matched"});
        }    
    } catch(err) {
        console.log(err);
        res.status(404).json({status: 404, message: "Email Already Registered!!!"});
    }
    
});


// Log In User
router.post('/api/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    
    if(user){
        const validUser = await bcrypt.compare(password, user.password);
        if(validUser){
            const token = jwt.sign({
                _id: user._id
            }, process.env.TOKEN_SECRET_KEY);

            res.cookie("jwt_token", token, {
                expires: new Date(Date.now() + (24*60*60*1000)), httpOnly: true, 
            });
            res.status(200).json({status: 200 , user: token});
        } else {
            res.status(401).json({status: 401 , user: false, message: "Incorrect Password"});
        }
    } else {
        res.status(404).json({status: 404 , user: false, message: "Invalid Email! Please Register First"});
    }
})

// Create New Note - Post Route
router.post('/api/createnote', async(req, res) => {
    const {heading, content, userId} = req.body;
    const user = await User.findOne({_id: userId});
    user.blogs.push({heading: heading, body: content});
    user.save();
    res.status(200).json({status: 200, msg: 'Success'});
})

//Dashboard 
router.get('/api/dashboard', authenticate, async (req, res) => {
    if(!req.user){
        res.status(401).json({status: 401, user: false});
    }

    if(req.user){
        res.status(200).json({status: 200, user: req.user});
    }
    
});

// Delete a Note
router.delete('/api/deletenote/:id', authenticate, async (req, res) => {
    const user = req.user;
    await user.blogs.id({_id: req.params.id}).remove();
    const rep = await user.save();
    if(rep.user){
        res.status(200).json({status: 200, msg: "Success"});
    } else {
        res.status(401).json({status: 401, msg: "Failure"});
    }
})

//Log Out Route
router.get('/api/logout', async (req, res) => {
    console.log("In Log Out");
    res.clearCookie('jwt_token', {path: "/"});
    res.status(200).send('Log Out Ka Page');
    
});

module.exports = router;