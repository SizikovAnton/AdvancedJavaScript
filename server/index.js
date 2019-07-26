const express = require('express');
const fs = require('fs'); //модуль для работы с файловой системой
const cart = require('./cartRouter');

const app = express();

app.use(express.json());
app.use('/', express.static('../public'));
app.use('/api/cart', cart);

//GET запросы
app.get('/api/getProducts', (req, res) => {
    fs.readFile('db/products.json', 'utf8', (err, data) => {
        if(err){
            res.send(
                        {
                            result: 0, 
                            data: err
                        }
                    );
        } else {
            res.send(data);
        }
    });
});

app.listen(80, () => console.log('Star server....')); //Почему мы используем порт 3000, а не стандартный 80, что бы не указывать номер порта в url?