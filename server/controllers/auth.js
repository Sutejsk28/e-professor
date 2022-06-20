import User from "../models/users"
import {hashPassword, compareHash} from '../utils/auth'

export const register = async (req,res) =>{

    // User.find({}).then(function (users) {
    //     console.log(users)
    //     });

    const {name, email, password} = req.body

    // console.log(name, email, password)
    

    try{
        
        if(!name) return res.status(400).send("Enter your name")
        if(!password || password.length<8) return res.status(400).send("Enter a password with minimum of 8 characters")
        if(!email) return res.status(400).send("Enter your email")

        let userExist = await User.findOne({ email }).exec();
        if (userExist) return res.status(400).send("Email is taken");

        const hashed = await hashPassword(password);
        const user = new User({
            name,
            email,
            password: hashed
        });

        await user.save();

        res.json({ok: true})

    }catch(err){
        console.log(err)
        return res.status(400).send("Error try again")
    }
    
    // res.json("This is register page from controllers");
} 