import bcrypt from "bcrypt"

export const hashPassword = (password)=>{
    return new Promise( (resolve,reject) =>{
        bcrypt.genSalt(12, (err,salt) => {
            if(!err){
                bcrypt.hash(password, salt, (err, hash)=>{
                    if(!err){
                        resolve(hash)
                    }else{
                        reject(err)
                    }
                });
            }else{
                reject(err)
            }
        });
    });
};

export const compareHash =(password, hashed) => {
    return bcrypt.compare(password, hashed)
}
