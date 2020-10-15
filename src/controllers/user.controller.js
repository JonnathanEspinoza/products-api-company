import User from "../models/User";

export const createUser = (req, res) => {
    res.json("User create")
}

export const getUsers = async (req, res) => {
    //const users = await User.find().populate("roles");

    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    const users = await User.paginate({}, { limit, page });
    res.json(users);
}