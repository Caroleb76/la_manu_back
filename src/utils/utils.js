import { scrypt, randomBytes } from "node:crypto";

const hashPassword = (password) => {
  const salt = randomBytes(16).toString("hex");
  const hash = scrypt(password, salt, 64).toString("hex");
  const hashedPassword = `${salt}:${hash}`;
  return hashedPassword;
};

const verifyPassword = (password, hashedPassword) => {
  const [salt, hash] = hashedPassword.split(":");
  const newHash = scrypt(password, salt, 64).toString("hex");
  return newHash === hash // true or false;
}
export default {
  hashPassword,
  verifyPassword
};
