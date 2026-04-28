const bcrypt = require('bcryptjs'); 

const User = require('../models/User'); 

  

exports.showRegister = (req, res) => { 

  res.render('auth/register', { title: 'Register' }); 

}; 

  

exports.register = async (req, res) => { 

  try { 

    const { name, email, password, confirmPassword } = req.body; 

  

    if (!name || !email || !password || !confirmPassword) { 

      req.flash('error', 'All fields are required.'); 

      return res.redirect('/register'); 

    } 

  

    if (password !== confirmPassword) { 

      req.flash('error', 'Passwords do not match.'); 

      return res.redirect('/register'); 

    } 

  

    const existingUser = await User.findOne({ email }); 

    if (existingUser) { 

      req.flash('error', 'Email is already registered.'); 

      return res.redirect('/register'); 

    } 

  

    const hashedPassword = await bcrypt.hash(password, 10); 

  

    await User.create({ 

      name, 

      email, 

      password: hashedPassword 

    }); 

  

    req.flash('success', 'Registration successful. Please login.'); 

    return res.redirect('/login'); 

  } catch (error) { 

    console.error(error); 

    req.flash('error', 'Something went wrong during registration.'); 

    return res.redirect('/register'); 

  } 

}; 

  

exports.showLogin = (req, res) => { 

  res.render('auth/login', { title: 'Login' }); 

}; 

  

exports.login = async (req, res) => { 

  try { 

    const { email, password } = req.body; 

  

    if (!email || !password) { 

      req.flash('error', 'Email and password are required.'); 

      return res.redirect('/login'); 

    } 

  

    const user = await User.findOne({ email }); 

    if (!user) { 

      req.flash('error', 'Invalid email or password.'); 

      return res.redirect('/login'); 

    } 

  

    const isMatch = await bcrypt.compare(password, user.password); 

    if (!isMatch) { 

      req.flash('error', 'Invalid email or password.'); 

      return res.redirect('/login'); 

    } 

  

    req.session.user = { 

      id: user._id, 
      name: user.name, 
      email: user.email 

    }; 

  

    req.flash('success', 'Login successful.'); 
    return res.redirect('/employees'); 
  } catch (error) { 

    console.error(error); 

    req.flash('error', 'Something went wrong during login.'); 

    return res.redirect('/login'); 

  } 

}; 

  

exports.logout = (req, res) => { 

  req.session.destroy(() => { 

    res.redirect('/login'); 

  }); 

}; 

