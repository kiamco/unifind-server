import User from '../models/users';
import Bcrypt from 'bcryptjs';
import Token from 'jsonwebtoken';

const register = async (req,res) => {
    const {name, password, email} = req.body;

    // hash password
    const hashedPassword = Bcrypt.hashSync(password,10);

    // create user object
    const user = new User ({
        name: name,
        email: email,
        password: hashedPassword
    });

    //save new user to database
    try{
        const response = await user.save();
        
        return res.status(200).json({
            message:`User ${name} created`,
            response: response
        });

    } catch(e) {
        console.log(e)
        return res.status(500).json({
            message:`failed to create user ${name}`,
            error: e
        });
    };
    
};


const deleteAll = async (req,res) => {
    try{
        const del = User.remove({});
        res.status(204).json({
            message:'deleted all user',
            response:del
        });
    } catch(e) {
        console.log(e)

        res.status(500).json({
            message:'failed to delete all users',
            error: e
        });
    };
};


const login = async (req,res) => {
    
}



export  {
    register,
    deleteAll
}