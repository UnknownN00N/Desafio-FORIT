const express = require("express");
const router = express.Router();
const path = require('path');

const {index, search, create, save} = require('../controllers/indexControllers');

router
.get('/', index)

.get('/search', search) // Ruta para la búsqueda

.get('/add', create)

.post('/add', save)


module.exports = router;

module.exports = router;