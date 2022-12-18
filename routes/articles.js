const express = require('express')

const { default: mongoose } = require('mongoose')
const Article = require('./../models/article')
// const ArticleLike = require('./../models/like')
const User = require('./../models/userModels')
const AppError = require("../utils/appError")
const requireLogin  = require('../middleware/requireLogin')
const router = express.Router()
const {like, unlike, getAllArticles} = require("../controllers/article")

// Like and Unlike 

router.put("/like", requireLogin, like);
router.put("/unlike", requireLogin, unlike);

router
   .route('/all') 
   .get(getAllArticles) 

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article()})
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
})


router.get('/:slug', async (req, res) => {

    try {
        const article = await Article.findOne({ slug: req.params.slug })
        // console.log(article.likes)
        var obj = JSON.parse(req.cookies.token)

        const user = await User.findOne({ _id: obj['_id'] })

        const likesCount = article.likes.length
        // var likes = JSON.stringify(article.likes)
        // var bookmarks = JSON.stringify(user.bookmarks)

        // console.log(JSON.stringify(article.likes))
        if (article == null) res.redirect('/')

        res.render('articles/show', { article: article, likesCount: likesCount, likes: "likes", bookmarks: "bookmarks", userId: obj['_id'] })

    } catch (err) {
        const article = await Article.findOne({ slug: req.params.slug })
        // var obj = JSON.parse(req.cookies.token)

        // const user = await User.findOne({ _id: obj['_id'] })
        
        let bookmarks 
        let likes
        let likesCount
        if (typeof article !== 'undefined' && typeof article.likes !== 'undefined'){
            likesCount = article.likes.length
            likes = JSON.stringify(article.likes)
        } else {
            likesCount = 0
            likes = "none"
            
        }

        res.render('articles/show', { article: article, likesCount: likesCount, likes: likes, obj: '', bookmarks: 'none', userId: 'none' })
    }
    

})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body);
    req.article = await Article.findById(req.params.id)
    next()
}, updateArticleAndRedirect('edit'))


router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/feeds')
})



// router.put('/like', (req,res)=>{

//     try {
//         var obj = JSON.parse(req.cookies.token)
//         Article.findByIdAndUpdate(req.body.postId,{
//             $push:{likes:obj['_id']}
//         },{
//             new:true
//         }).exec((err,result)=>{
//             if(err){
//                 return res.status(422).json({error:err})
//             }else{
//                 res.json(result)
//             }
//         })
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
    
// })
// router.put('/unlike', (req,res)=>{

//     try {
//         var obj = JSON.parse(req.cookies.token)
//         Article.findByIdAndUpdate(req.body.postId,{
//             $pull:{likes:obj['_id']}
//         },{
//             new:true
//         }).exec((err,result)=>{
//             if(err){
//                 return res.status(422).json({error:err})
//             }else{
//                 res.json(result)
//             }
//         })
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
    
// })


function saveArticleAndRedirect(path) {
    return async (req, res) => {

        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        
    
        try {
            var obj = JSON.parse(req.cookies.token)
            article.user = obj['_id']
            // console.log(obj['photo'])
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {      
            res.render(`articles/${path}`, { article: article })
        }
    }
}

function updateArticleAndRedirect(path) {
    return async (req, res) => {

        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown

            
        try {
            var obj = JSON.parse(req.cookies.token)
            article.user = obj['_id']
            // console.log(obj['photo'])

            if (article.user === article.user._id) {
                article = await article.save()
                // res.status(200).json(({ status: 'success' }))
                res.redirect(`/articles/${article.slug}`)
                
            }

        } catch (e) {      
            res.render(`articles/${path}`, { article: article })
        }
    }
}

module.exports = router 