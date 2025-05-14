import { scrypt, randomBytes } from "node:crypto";

const hashPassword = async (password) => {
  const salt = randomBytes(16).toString("hex");
  console.log(password,salt);
  let hashedPassword=null;
  await new Promise((resolve,reject)=>{
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        reject();
      }    
      password = derivedKey.toString('hex')  // '3745e48...08d59ae'
      console.log(password);
       hashedPassword = `${salt}:${password}`;
      resolve(hashedPassword);
    });
  });
  return hashedPassword;
  

};

const verifyPassword =async (password, hashedPassword) => {
  const [salt, hash] = hashedPassword.split(":");
  const newHash = await hashPassword(password);
  return newHash === hash // true or false;
}
export default {
  hashPassword,
  verifyPassword
};
