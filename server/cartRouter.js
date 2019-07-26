const express = require('express');
const fs = require('fs');
const handler = require('./handler');

const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('db/userCart.json', 'utf8', (err, data) => {
        if(err){
            res.send({result: 0, text: 'Error!'})
        } else {
            res.send(data)
        }
    })
});

router.post('/', (req, res) => {
    handler(req, res, 'add', 'db/userCart.json');
});
router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'db/userCart.json');
});
router.delete('/:id', (req, res) => {
    handler(req, res, 'delete', 'db/userCart.json')
});
module.exports = router;