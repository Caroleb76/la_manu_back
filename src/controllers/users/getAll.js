import userService from "../../services/userService.js";
import contractService from "../../services/contractService.js";
export default async (req, res) => {
    try {
      await userService.getUsers({})
      await contractService.create({})
      res.send("utilisator");
    } catch (error) {}
  };