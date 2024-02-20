const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

app.get('/getorders', (req, res) => {
    let content = JSON.parse(fs.readFileSync('orders.txt', 'utf-8'));
    res.json(content);
})
app.post('/remove-order', (req, res) => {
    const data = req.body;
    console.log(data.id);
    let content = JSON.parse(fs.readFileSync('orders.txt', 'utf-8'));
    let updateContent = [];
    for(let el of content){
        if(el.time != data.id){
            updateContent.push(el);
        }
    }
    console.log(updateContent)
    fs.writeFile('orders.txt', JSON.stringify(updateContent), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Замовлення видалено`)
        }
    })
})
app.post('/save-order', (req, res) => {
    const data = req.body;
    res.sendStatus(200);
    let content = JSON.parse(fs.readFileSync('orders.txt', 'utf-8'));
    content.push({
        list: data.list,
        name: data.name,
        phone: data.phone,
        time: data.time
    });
    fs.writeFile('orders.txt', JSON.stringify(content), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Замовлення збережено`)
        }
    })
})
app.post('/saveNewGoods', (req, res) => {
    const data = req.body;
    res.sendStatus(200);
    let content = JSON.parse(fs.readFileSync('goods.txt', 'utf-8'));
    content.push({
        name: data.name,
        price: data.price,
        img: data.img,
        bg: data.bg,
        backGroundColor: data.bg, 
    });
    fs.writeFile('goods.txt', JSON.stringify(content), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Товар збережено`)
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server work on PORT: ${PORT}`)
})

