const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).json('selfcare micro service account manager!');
});

module.exports = router;