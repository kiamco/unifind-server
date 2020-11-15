import User from '../models/users';
import Bcrypt from 'bcryptjs';
import Token from 'jsonwebtoken';

const register = async (req,res) => {
    const {name, password, email} = req.body;

    // hash password
    Bcrypt.hash(password,10, (err, hashedPass) => {
        if(err){
            res.json({
                error:err
            });
        };
    });

    // create user object
    const user = new User ({
        name: name,
        email: email,
        password: password
    });

    //save new user to database
    try{
        response = await user.save();
        
        return res.status(200).json({
            message:`User ${name} created`,
            response: response
        });

    } catch(e) {
        return res.status(500).json({
            message:`failed to create user ${name}`,
            error: e
        });
    };
    
};

const login = async (req,res) => {
    
}

export  {
    register
}