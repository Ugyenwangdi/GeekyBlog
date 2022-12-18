const express = require('express') 
const userController = require('./../controllers/userController') 
const authController = require('./../controllers/authController')
const requireLogin  = require('../middleware/requireLogin')
const Article = require("../models/article")
const User = require('./../models/userModels')

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.patch(
   '/updateMyPassword',
   authController.protect,
   authController.updatePassword,
)
router.patch(
   '/updateMe',
   authController.protect,
   userController.uploadUserPhoto,
   userController.updateMe,
)

router
   .route('/') 
   .get(userController.getAllUsers) 
   .post(userController.createUser)

router
   .route('/:id') 
   .get(userController.getUser) 
   .patch(userController.updateUser) 
   .delete(userController.deleteUser)

// router
//    .route('/bookmarks/:id') 
//    .get(requireLogin, userController.getUserBookmarks) 

var obj 

router.get('/bookmarks/:id', async (req, res) => {
   bookmarks = []

   try {
      obj = JSON.parse(req.cookies.token)
      const user = await User.findById(obj['_id']); 
      const articles = await Article.find()
      // console.log(obj['_id'])

      for (let i = 0; i < articles.length; i++) {


          // console.log(JSON.stringify(articles[i]._id))
          if ((user.bookmarks).includes(articles[i]._id)){
              bookmarks.push(articles[i]);
              
          }
          i++;
      } 
      // console.log(bookmarks)
      // res.json({ data: bookmarks, status: "success" }); 

      res.render('articles/bookmarks', { bookmarks: bookmarks, obj, userId: user._id })

    } catch (err) {
      // res.status(560).json({ error: err.message });
      res.render('articles/bookmarks', { bookmarks: bookmarks, obj: '', userId: '' })

    }

   // const articles = await Article.find().sort({ createdAt: 'desc' })
    
   //  try {
   //      obj = JSON.parse(req.cookies.token)
   //      console.log(articles)
   //      res.render('articles/bookmarks', { articles: articles, obj: obj['_id'] })

   //  } catch (e) {      
   //      res.render('articles/bookmarks', { articles: articles, obj: obj})

   // }
  
})   

// Bookmark and remove bookmark
router.put("/bm", requireLogin, userController.bookmark);
router.put("/removebm", requireLogin, userController.removeBookmark);

module.exports = router

