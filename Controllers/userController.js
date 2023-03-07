const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const crypto = require('crypto');

const userGrid = async () => {
    const userDetails = await User.find();
    if (userDetails) {
        return userDetails;
    }

    return null;
}

const userCreate = async (data) => {
    try {
        /**
            TODO: Insert into the DB
         *  1: Fetch records by given user email Id 
         *  2: Insert into the DB
         */
        // const available = false;
        const available = await User.find({username: data.username});
        
        if (available.length > 0) {
            // Username already exists
            return {
                status: 409,
                message: "Username already exists",
            }
        }
        
        // Insert given record here
        data.password = await crypto.createHash('sha256').update(data.password).digest('base64');
        const userDetails = new User(data);
        const userDetailsResponse = await userDetails.save();
        return {
            status: 201,
            message: userDetailsResponse,
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Something went wrong',
        }
    }
    
}

const userLogin = async (data) => {
    try {
        // TODO: Fetch given user details and compare the password
        data.password = crypto.createHash('sha256').update(data.password).digest('base64');
        let available = await User.findOne(
            {
                username: data.username,
                password: data.password
            });
        // const valid = true;
        if (Object.keys(available).length > 0) {
            available = JSON.parse(JSON.stringify(available));
            const token = jwt.sign(available, process.env.JWT_SECRET_KEY);
            
            return {
                status: 200,
                access_token: token,
            }
        }
        
        return {
            status: 401,
            message: 'Invalid username or password',
        }
        
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Something went wrong',
        }
    }
}




 
module.exports = {
    userGrid,
    userCreate,
    userLogin,
}