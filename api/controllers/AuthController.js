import User from '../models/users';
import Bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Secrets from '../../config/secrets';

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
        return res.status(204).json({
            message:'deleted all user',
            response:del
        });
    } catch(e) {
         return res.status(500).json({
            message:'failed to delete all users',
            error: e
        });
    };
};


const login = async (req,res) => {
    const {email, password} = req.body;

    try {
        const user = await User.find({email: email});

        if (user && Bcrypt.compareSync(password, user[0].password)){
            const token = genToken(user);

            return res.status(200).json({
                message:`${email} successfully logged in`,
                jwt: token
            });
        } else {
            return res.statu(404).json({
                message:'user/password is wrong',
            });
        };

    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'failed to login',
            error: e
        })
    }
};


function genToken(user) {

    // create the payload...
    const payload = {
            userid: user.id,
            username: user.username,
    }
      const options = {
          expiresIn: '1h'
      };
      const token = jwt.sign(payload, Secrets.jwtSecret, options);

      return token;
}



export  {
    register,
    deleteAll,
    login
}