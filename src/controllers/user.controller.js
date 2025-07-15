import UserModel from "../models/user.model.js";

class UserController {
  static async create (req, res) {
    const { name, username, password, type } = req.body;
    const user = await UserModel.create({ name, username, password, type });

    if (user) return res.json(user);
    res.status(400).json({ message: "User not created" });
  }
}

export default UserController;
