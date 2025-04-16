import userService from "../../services/userService.js";
export default async (req, res) => {
    try {
      await userService.getUsers({})
      res.send("utilisator");
    } catch (error) {}
  };