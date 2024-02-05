const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path')

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", 'index.html'))
})
app.post('/save-order', (req, res) =>{
    const data = req.body;
    console.log(data);
})
app.listen(PORT, ()=>{
    console.log(`Server work on PORT: ${PORT}`);
})