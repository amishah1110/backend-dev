const exp = require('constants');
const express = require('express');
const morgan = require('morgan');

const userModel = require('./models/user');
const dbConnection = require('./config/db');
const { userInfo } = require('os');

const app = express();

app.set("view engine", 'ejs');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public")); //to access the static files in the "public" folder

app.use((req, res, next)=> {
    console.log("this is middleware");
    next();
})

//creating 1st route
app.get('/', (req, res)=> {
    res.render('index');
})
//creating 2nd route
app.get('/about', (req, res) => {
    res.send('About page');
})

//creating 3rd route
app.post('/get-form-data', (req, res)=> { //usin get method the username and password are visible in the url itself which is unwanted, hence we use post method here
    console.log(req.body);
    res.send('received data');
})

 app.get('/register', (req, res) => {
     res.render('register'); //create register.ejs file in public->assets
 })

//CRUD - Create
app.post('/register', async (req, res) =>{ //when we want a certain sequence for a procrdure, we need to use Await command
    const {username, email, password } = req.body;
    const newUser = await userModel.create({
        username: username,
        email:email,
        password : password
    });
    res.send('user created');
})

//CRUD - read
app.get('/get-users', (req, res) => {
    userModel.find( ).then((users)=> { //userModel.find({username:'Ami'}).then((users) for specific query
        res.send(users);
    })
})

//CRUD - Update
app.get('/update-user', (req, res) => {
    userModel.findOneAndUpdate({username:'Ami'}, {email:'ami@yahoo.com'});
    res.send("user updated");
})
app.listen(3000);