const path = require('path')

/* LOGIN PAGE */
exports.getLoginForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'login.html'))
}

/* SIGN UP PAGE */
exports.getSignupForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'signup.html'))
}


// /* HOME PAGE  */ 
// exports.getHome = (req, res) => {
//     res.sendFile(path.join(__dirname, '../', 'views', 'home.html'))
// }


/* HOME PAGE PRIVATE */ 
exports.getHomePrivate = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'homefirst.html'))
}

/* TOP */ 
// exports.getTop = (req, res) => {
//     res.sendFile(path.join(__dirname, '../', 'views', 'top.html'))
// }

/* BOOKMARKS */ 
exports.getBookMarks = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'bookmarks.html'))
}

/* ABOUT */ 
exports.getAbout = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'about.html'))
}

/* PROFILE PAGE */
exports.getProfile = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'myprofilepage.html'))
}

