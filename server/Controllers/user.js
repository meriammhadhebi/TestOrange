const bcrypt= require('bcryptjs');
const jwt= require ('jsonwebtoken');
const mongoose=require('mongoose');
const UserModal = require('../Models/user');

const secret = "test";

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModal.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: user, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const user = await UserModal.findOne({ email });

    if (user)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const doc = await UserModal.find();

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const doc = await UserModal.findById(req.params.id);

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};
const archive = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedUser = { archive: 'true' };

    await UserModal.findByIdAndUpdate(id, updatedUser, { new: true });
  res.json({ message: "user archived successfully." });
} catch (error) {
    next(error);
  }
  
}
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post Found ! ');

  const updatedUser = {firstName, lastName, email, hashedPassword, _id: id };

  await UserModal.findByIdAndUpdate(id, updatedUser, { new: true });
  res.json(updatedUser);
};
module.exports = {
  signin,
  signup,
  getUsers,
  archive,
  getUser,
  updateUser
};
