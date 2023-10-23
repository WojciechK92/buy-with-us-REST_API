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
  
  showItem(req, res) {
    const { id } = req.params;    

    try {
      // database connection
      res.status(200).json('One item');
    } catch(e) {
      console.log(e);
      // error message
    };
  };

  addItem(req, res) {
    const body = req.body;

    try {
      // database connection

      res.status(201).json('Success!');
    } catch(e) {
      console.log(e);
      // error message
    };
  };
};

module.exports = new ItemController();