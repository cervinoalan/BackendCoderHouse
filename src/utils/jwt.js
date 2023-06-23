const jwt = require("jsonwebtoken");
const { PRIVATE_KEY_JWT } = require("../config/config");
const usersService = require("../repository/users.service");

const generateToken = (payload) => {
  const token = jwt.sign({ payload }, PRIVATE_KEY_JWT, { expiresIn: "1h" });
  return token;
};


const getUserByToken = (token) => {
  return jwt.verify(token,PRIVATE_KEY_JWT,async(error,credential)=>{
    if(error){
      return null
    } else{
      console.log(credential.payload.id)
      const user = await usersService.getById(credential.payload.id)
      return user
    }
  })
}



module.exports = {
    generateToken,
    getUserByToken
  };
