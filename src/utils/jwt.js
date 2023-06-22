const jwt = require("jsonwebtoken");
const { PRIVATE_KEY_JWT } = require("../config/config");
const usersService = require("../repository/users.service");

const generateToken = (payload) => {
  const token = jwt.sign({ payload }, PRIVATE_KEY_JWT, { expiresIn: "1h" });
  return token;
};

// const getPayloadByCookie = (req, res, next) => {
//     const token = req.cookies.token;
//     console.log(token);
//     if (!token) {
//       return res.status(403).send({ error: 'token inexistente' });
//     }
//     if (token) {
//       jwt.verify(token, PRIVATE_KEY_JWT, async (error, credential) => {
//         if (error) {
//           res.status(403).send({ error: 'error inesperado', description: error });
//         } else {
//           const user = await usersService.getSession(credential.payload.id);
//           req.payload = user;
//           next();
//         }
//       });
//     } else {
//       res.status(401).send({ error: 'no se encontro token' });
//     }
//   };

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
