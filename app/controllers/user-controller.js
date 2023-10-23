class UserController {
  login(req, res) {
    const body = req.body;

    try {
      // database connection
      res.status(200).json('Logged in');
    } catch(e) {
      console.log(e);
      // error message
    };
  };
};

module.exports = new UserController();