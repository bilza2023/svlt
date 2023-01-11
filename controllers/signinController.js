require('dotenv').config();
const  {db,User} = require('../database/db.js');
const jwt = require('jsonwebtoken');
const isValidEmail = require("./util/isValidEmail");
const bcrypt = require('bcrypt');

//-----------------------------------
////////////////////////////////////////////////
module.exports =  async (req, res ) => {
// return res.status(200).json({"ok" : "ok"});
try{
const email = req.body.email;
const passwordRec = req.body.password;
//--
if (email === undefined){
return res.status(404).json({ "error" : "email is missing"  });
}
if (passwordRec === undefined){
return res.status(404).json({ "error" : "password is missing"  });
}
/////////////////////////////////////////////////////////////////////
const user = await User.findOne({ email: email });

if (await bcrypt.compare(passwordRec, user.password)){

const accessToken = jwt.sign({ "email": user.email,"id" : user.id },process.env.JWT_SECRET);
 
return res.status(200).json({"message" : "success" , accessToken});
}else {

return res.status(400).json({  message : "failed to singin :" });
}

///////////////////////////////////////////////////////////////////
} catch(err){
    return res.status(400).json({  message : "failed to singin :" + err });
}

}
////////////////////////////////////////////////////
