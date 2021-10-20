require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Database!');
});

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const orderRoutes = require('./routes/orders');
const categoryRoutes = require('./routes/categories');

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(session({
    secret: 'let us do it',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/',(req, res) => {
    return res.redirect('/api/posts')
})

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);


app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
});