require('dotenv').config();  
const express = require('express'); 
const mongoose = require('mongoose'); 
const session = require('express-session'); 
const flash = require('connect-flash'); 
const methodOverride = require('method-override'); 
const expressLayouts = require('express-ejs-layouts'); 
const path = require('path'); 
const authRoutes = require('./routes/authRoutes'); 
const employeeRoutes = require('./routes/employeeRoutes'); 

const app = express(); 

const PORT = process.env.PORT || 3039; 

  
mongoose 

  .connect(process.env.MONGO_URI) 
  .then(() => console.log('MongoDB connected successfully')) 
  .catch((error) => console.error('MongoDB connection error:', error)); 

  

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 
app.use(expressLayouts); 
app.set('layout', 'layouts/main'); 

  

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(methodOverride('_method')); 
app.use(express.static(path.join(__dirname, 'public'))); 

  

app.use( 

  session({ 

    secret: process.env.SESSION_SECRET || 'dev_secret_change_me', 
    resave: false, 
    saveUninitialized: false, 
    cookie: { 
      httpOnly: true, 
      maxAge: 1000 * 60 * 60 

    } 

  }) 

); 

  

app.use(flash()); 

  

app.use((req, res, next) => { 

  res.locals.currentUser = req.session.user || null; 

  res.locals.success = req.flash('success'); 

  res.locals.error = req.flash('error'); 

  next(); 

}); 

  

app.get('/', (req, res) => { 

  if (req.session.user) { 

    return res.redirect('/employees'); 

  } 

  return res.redirect('/login'); 

}); 

  

app.use('/', authRoutes); 

app.use('/employees', employeeRoutes); 

  

app.use((req, res) => { 

  res.status(404).render('404', { title: 'Page Not Found' }); 

}); 

  

app.listen(PORT, () => { 

  console.log(`Server running on http://localhost:${PORT}`); 

}); 