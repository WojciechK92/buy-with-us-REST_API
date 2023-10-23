module.exports = {
  validateString(value) {
    const re = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻqvxQVX1234567890 -]+$/;
    return re.test(value);
  },

  validateCategory(value) {
    const categories = ['motorization', 'real-estate', 'house-and-garden', 'services', 'for-children', 'rtv-agd'];
    return categories.includes(value);
  },
};