var express = require('express');
var router = express.Router();

router.get('/api/hello', function (req, res, next) {
    res.json({message: 'Hello PL from Express Backend'});
});

module.exports = router;
