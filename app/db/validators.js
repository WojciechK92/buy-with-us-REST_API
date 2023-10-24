module.exports = {
  validateString(value) {
    const re = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻqvxQVX1234567890 -]+$/;
    return re.test(value);
  },

  validateCategory(value) {
    const categories = ['motorization', 'real-estate', 'house-and-garden', 'services', 'for-children', 'rtv-agd'];
    return categories.includes(value);
  },

  validateEmail(value) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(value);
  },
  
  validatePassword(value) {
    const re = /^(?=.*[A-Z])(?=.*[$@!%*?&]).{6,}$/;
    return re.test(value);
  },
};