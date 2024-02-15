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
app.get('/getorders', (req,res) => {
    let fileData = JSON.parse(fs.readFileSync('orders.txt', 'utf-8'));
    res.json(fileData);
})
app.get('/saveNewItem', (req, res) => {
    const newItem = req.body;
    console.log('Received newItem:', newItem);
    res.send('New item saved successfully');
});

app.post('/save-order', (req, res) => {
    const data = req.body;
    console.log(data);
    let fileData = JSON.parse(fs.readFileSync('orders.txt', 'utf-8'));
    console.log(fileData)
    fileData.push({
        name: data.name,
        phone: data.phone,
        list: data.list,
        orderTime: data.orderTime
    })
    fs.writeFile('orders.txt', JSON.stringify(fileData), (err)=>{
        if(err){
            console.log('err')
        }else{
            console.log(`Замовлення збережено`)
        }
    })

    res.sendStatus(200);

})
// app.post('/all-orders', (req, res) => {
//     const data = req.body;
//     console.log(data);

// })



app.delete('/delete-order', (req, res) => {
    const { name, phone } = req.body;
    let fileData = JSON.parse(fs.readFileSync('orders.txt', 'utf-8'));
    fileData = fileData.filter(order => !(order.name === name && order.phone === phone));
    fs.writeFile('orders.txt',JSON.stringify(fileData), (err) => {
        if (err) {
            console.error('Error deleting order:', err);
            res.status(500).send('Error deleting order');
        } else {
            console.log('Order deleted successfully');
            res.sendStatus(200);
        }
    });
});





app.listen(PORT, () => {
    console.log(`Server work on PORT: ${PORT}`)
})