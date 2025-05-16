import { scrypt, randomBytes } from "node:crypto";

const hashPassword = async (password,oldSalt=null) => {
  const salt = oldSalt ||  randomBytes(16).toString("hex");
  let hashedPassword=null;
  await new Promise((resolve,reject)=>{
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        reject();
      }    
      password = derivedKey.toString('hex')  // '3745e48...08d59ae'
       hashedPassword = `${salt}:${password}`;
      resolve(hashedPassword);
    });
  });
  return hashedPassword;
  

};

const verifyPassword =async (inputPassword, dbPassword) => {
  const [salt, hash] = dbPassword.split(":");
  const newHash = await hashPassword(inputPassword,salt);
  
  return newHash.split(":")[1] === hash // true or false;
}
export default {
  hashPassword,
  verifyPassword
};
