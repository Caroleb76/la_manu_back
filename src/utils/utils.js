import { scrypt, randomBytes } from "node:crypto";

const hashPassword = (password) => {
  const salt = randomBytes(16).toString("hex");
  const hash = scrypt(password, salt, 64).toString("hex");
  const hashedPassword = `${salt}:${hash}`;
  return hashedPassword;
};
export default {
  hashPassword,
};
