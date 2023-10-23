class ItemController {
  showItemList(req, res) {
    try {
      // database connection
      res.status(200).json('List of items');
    } catch(e) {
      console.log(e);
      // error message
    };
  };
};

module.exports = new ItemController();