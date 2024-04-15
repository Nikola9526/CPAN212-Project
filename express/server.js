const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const JWT_SECRET = 'your_jwt_secret';

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
}
app.use(cors(corsOptions));

  //Body Parser middleware 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Passport Middleware
//Intializing Passport for user  authentication and integrating it with Express sessions
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

mongoose.connect('mongodb://localhost:27017/recipeapp', {
    useUnifiedTopology: true
}).then(() => console.log('Connected to Mongo Database'))
.catch(() => console.log(err));



/*app.post('/register', async (req,res)=> {
    try {
        const hashedPassword = await bcrypt.hash (req.body.password, 10);
        const user = new User ({ 
            fname: req.body.fname, 
            lname: req.body.lname,   
            email: req.body.email,
            phonenum: req.body.phonenum,
            username: req.body.username,
            password: hashedPassword 
        });
        await user.save(); // saveing a new user to DB 
        console.log( 'User is Registered');
        res.status(201).send('User is Registered');
    }catch (err) {
        res.status(500).send('Error Registering new user');
    }
});*/

/*app.post ('/login', passport.authenticate('local'), (req,res) => {
 try {
    // if authentication is sucessfull, generate JWT token
    console.log("Login Successfull")
    //res.send('Login Successfull')
    const token = jwt.sign({ user: req.user._id}, JWT_SECRET, { expiresIn: '1h'});
    res.send({token, username: user.username})
    console.log(token)
    console.log('user logged in token issued')
    

 } catch (error) {
    res.status(500).send({ error: 'Internal Server Error'});
 }
    
    
});*/
// post endpoint for login 
/*app.post('/login', async (req,res) => {
    
    try{
        const {username, password} = req.body;
        const user = await User.findOne({ username });
        if(!user) {
            console.log("User Not Found whie trying to log in");
            return res.status(401).send({error: 'Invaild username or password'});
        }
        //console.log('never reached here')
        //Checks  if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(401).send({error: 'Invaild username or password'});
        }

        //Create a JWT Token //session being controlled by here 
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h'}); // creates json web token 
        res.json({token, username: user.username, });
        console.log(token)
        console.log('loggined in')
    } catch(error) {
        res.status(500).send({ error: 'Internal Server Error'});
    }
});*/

const requireAuth = (req,res,next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        console.log('It not worked')
        return res.status(401).send("Authorization token required");
        
    }
    const token = authorization.split(' ')[1];
    console.log('worked')
    console.log(authorization);
    try {
        const {userId} = jwt.verify(token, JWT_SECRET);
        username = userId;
        next();
    } catch (error){
        return res.status(401).send("Authorization Failed");
    }
};


app.post('/recipeAdd', requireAuth, async  (req,res) => {
    //const { name, description,servingsize, ingredients, directions, note} =req.body;
    //const info = req.body.arrayField;
    const userID = req.userId;
    const recipes = new Recipe ({
        name: req.body.name,
        description: req.body.description,
        info: req.body.info,
        servingsize: req.body.servingsize,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        note: req.body.note,
        user: userID //set up the user ID from JWT payload

    });
    await recipes.save();
    res.status(201).json(recipes);
});



app.get('/api/data', (req,res) => {
    const data= { message: 'Hello from express backend'};
    res.json(data);
});


app.get ('/logout',(req,res) => {
    req.logout();
    console.log('User Logged Out');
    res.send('User Logged Out');

});

app.get('/sessionCheck', (req,res) => {
    console.log(req.session);
   console.log(req.user); // THis will log the deserialized user information, if avabile
   console.log('Is authenticalted: ', req.isAuthenticated()); // THis checks if the user is authenticated 
   res.send('Check your server logs for the session details and user info');

});

//use Routes
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);


const port = process.env.PORT || 9001;

app.listen ( port , () => {
    console.log(`Server is Running on http://localhost:${port}`)
});
