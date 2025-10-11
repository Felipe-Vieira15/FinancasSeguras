const express = require('express');
const router = express();
const path = require('path');

const viewsPath = path.join(__dirname, '..', 'frontend', 'screens');

router.get('/index', async (req, res) => {
    res.sendFile(path.join(viewsPath, 'index.html'));
});

module.exports = router;