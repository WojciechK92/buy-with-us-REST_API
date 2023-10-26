const path = require('path');
console.log();

class PageController {
  showHomePage(req, res) {
    res.sendFile(path.join(__dirname + '/../../views/home.html'));
  };
};

module.exports = new PageController();