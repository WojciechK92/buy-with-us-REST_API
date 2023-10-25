const Item = require('../db/models/item');
const errorsHandler = require('../db/errorsHandler');

class ItemController {
  async showItemList(req, res) {
    try {
      const items = await Item.find({});
      res.status(200).json(items);
    } catch(e) {
      const [status, errors] = errorsHandler(e);
      res.status(status).json(errors);
    };
  };
  
  async showItem(req, res) {
    const { id } = req.params;    

    try {
      const item = await Item.findById(id);
      res.status(200).json(item);
    } catch(e) {
      const [status, errors] = errorsHandler(e);
      res.status(status).json(errors);
    };
  };

  async addItem(req, res) {
    try {
      const item = new Item({
        name: req.body.name , 
        category: req.body.category , 
        amount: req.body.amount , 
        description: req.body.description , 
        user: req.user.id,
      });
      
      const response = await item.save();
      res.status(201).json(response);
    } catch(e) {
      const [status, errors] = errorsHandler(e);
      res.status(status).json(errors);
    };
  };

  async editItem(req, res) {
    const { id } = req.params;    
    
    try {
      let item = await Item.findById(id);

      for (let key in req.body) {
        item[key] = req.body[key];
      };

      const response = await item.save();
      res.status(200).json(response);
    } catch(e) {
      const [status, errors] = errorsHandler(e);
      res.status(status).json(errors);
    };
  };

  async deleteItem(req, res) {
    const { id } = req.params;
    try {
      await Item.deleteOne({ _id: id });
      res.sendStatus(204);
    } catch(e) {
      const [status, errors] = errorsHandler(e);
      res.status(status).json(errors);
    };
  };
};

module.exports = new ItemController();