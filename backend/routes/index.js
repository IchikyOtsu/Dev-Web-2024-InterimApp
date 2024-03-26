var express = require('express');
var router = express.Router();

router.get('/api/hello', function(req, res, next) {
  res.json({ message: 'Hello from Express Backend' });
});

router.get('/', (req, res) => {
  res.send('Hello World!');
});
module.exports = router;
