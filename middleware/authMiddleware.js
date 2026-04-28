function requireLogin(req, res, next) { 

  if (!req.session.user) { 

    req.flash('error', 'Please login first.'); 

    return res.redirect('/login'); 

  } 

  next(); 

} 

  

function redirectIfLoggedIn(req, res, next) { 

  if (req.session.user) { 

    return res.redirect('/employees'); 

  } 

  next(); 

} 

  

module.exports = { 

  requireLogin, 

  redirectIfLoggedIn 

}; 
