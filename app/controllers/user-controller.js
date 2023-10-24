const User = require('../db/models/user');
const errorsHandler = require('../db/errorsHandler');

class UserController {
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error("User doesn't exist!")
      const validPassword = user.comparePassword(req.body.password);
      if (!validPassword) throw new Error('Invalid password!');

      res.status(200).json(user);
    } catch(e) {
      res.status(401).json({ errors: { message: 'Wrong email or password!' } });
    };
  };

  async register(req, res) {
    try {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
      });

      await user.save();
      res.status(201).json(user);
    } catch(e) {
      const [status, errors] = errorsHandler(e);
      res.status(status).json(errors);
    };
  };
};

module.exports = new UserController();