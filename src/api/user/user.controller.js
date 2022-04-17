const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const Role = require('../../models/role');
const { Api400Error, Api500Error, Api404Error } = require('../../utils/error');
const { generateToken } = require('../../utils/auth');

class UserController {
  static async createUser(req, res, next) {
    const { name, email, password } = req.body;

    try {
      // simple validation. change to JOI later
      if (!name || !email || !password) {
        throw new Api400Error('validation error. All required fields need to be filled');
      }

      // check if the email already registered
      const userExist = await User.findOne({ email });
      if (userExist) {
        throw new Api400Error('User already registered');
      }

      // its not effective. each register need to get role db first
      // TODO: find the more effective method
      const role = await Role.findOne({ name: 'admin' });

      // check if role not exist
      if (!role) {
        throw new Api500Error();
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // try to register
      const registeredUser = await User.create({
        name, email, password: hashedPassword, role: role._id,
      });

      // check if somehow registering process is failed
      if (!registeredUser) {
        throw new Api500Error();
      }

      res.status(201).send({ message: 'Success register. please login' });
    } catch (error) {
      next(error);
    }
  }

  // for internal only
  static async createAdmin(req, res, next) {
    const { name, email, password } = req.body;

    try {
      // simple validation. change to JOI later
      if (!name || !email || !password) {
        throw new Api400Error('validation error. All field need to be filled');
      }

      // check if the email already registered
      const userExist = await User.findOne({ email });
      if (userExist) {
        throw new Api400Error('User already registered');
      }

      // its not effective. each register need to get role db first
      const role = await Role.findOne({ name: 'user' });

      // check if role not exist
      if (!role) {
        throw new Api500Error();
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // try to register
      const registeredUser = await User.create({
        name, email, password: hashedPassword, role: role._id,
      });

      // check if somehow failed to register
      if (!registeredUser) {
        throw new Api500Error();
      }

      res.status(201).send({ message: 'Success register. please login' });
    } catch (error) {
      next(error);
    }
  }

  static async authUser(req, res, next) {
    // take req.body: email, password
    // validate
    // check if user exist
    // check if password match
    // generate jwt
    // send to client

    try {
      const { email, password } = req.body;

      // validate
      if (!email || !password) {
        throw new Api400Error('validation error. All field need to be filled');
      }

      // check is user exist
      const user = await User.findOne({ email });
      if (!user) {
        throw new Api400Error('Wrong email or password');
      }

      // check is password matched
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) throw new Api400Error('Wrong email or password');

      // send data
      const dataUser = {
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      };
      res.status(200).send({ user: dataUser });
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(req, res, next) {
    // verify valid token
    // fill req.user with the user
    // if role is user, send the user data
    // if role is admin, send all user data
    try {
      if (req.user.role.name === 'user') {
        res.send({ user: req.user });
      } else if (req.user.role.name === 'admin') {
        const users = await User.find().populate('role', 'name -_id').select('-password');
        res.send({ users });
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      let { id } = req.query;

      // take the data
      const { name, email, password } = req.body;

      if (req.user.role.name === 'user') {
        id = req.user._id;
      }

      const updatedUser = await User.findByIdAndUpdate(id, { name, email, password });
      if (!updatedUser) throw new Api404Error('User not found');
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    // take the id
    // try to delete the user

    try {
      let { id } = req.query;

      if (req.user.role.name === 'user') id = req.user._id;

      await User.findByIdAndDelete(id);
      res.status(200).send({
        id,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
