const router = require('express').Router();
const ensureAuthenticated = require('../Middlewares/Auth');


router.get('/', ensureAuthenticated, (req, res) => {
  res.status(200).json([
    {
    name: "mobile",
    price: 10000
  },
   {
    name: "TV",
    price: 8000
  },
   {
    name: "fridge",
    price: 12000
  }
])
});

module.exports = router;