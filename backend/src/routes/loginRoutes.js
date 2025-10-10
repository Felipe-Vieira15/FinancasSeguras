const express = require('express');
const router = express.Router();
const LoginMiddleware = require('../middlewares/loginMiddleware');

router.post("/", LoginMiddleware.login);

module.exports = router;