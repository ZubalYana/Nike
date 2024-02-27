const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs');


const users = [
    { id: 1, username: 'admin', password: 'hello0000' },
    { id: 2, username: 'vitaliy', password: '1111' },
];
passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username == username && u.password == password);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'Невірний логін або пароль' });
    }
}))
passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id == id);
    done(null, user);
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/admin', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin'));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong!');
})


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/getorders', (req, res) => {
    let content = JSON.parse(fs.readFileSync('orders.txt', 'utf-8'));
    res.json(content);
})
app.get('/getGoodsData', (req, res) => {
    fs.readFile('goods.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading goods data');
        } else {
            const goodsData = JSON.parse(data);
            res.json(goodsData);
        }
    });
});
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
});
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
});
app.post('/saveNewGoods', (req, res) => {
    const data = req.body;
    res.sendStatus(200);
    let content = JSON.parse(fs.readFileSync('goods.txt', 'utf-8'));
    content.push({
        id: data.id,
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
});
app.listen(PORT, () => {
    console.log(`Server work on PORT: ${PORT}`)
})