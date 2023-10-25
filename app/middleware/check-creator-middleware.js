const Item = require('../db/models/item');

module.exports = async (req, res, next) => {
  const user = req.user;
  const itemId = req.params.id;

  try {
    const item = await Item.findById(itemId);
    if (item.user.toString() !== user.id) throw new Error('Forbidden!');
    next();
  } catch(e) {
    res.status(403).json({ errors: { message: e.message } });   
  };
};