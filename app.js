const express = require("express")
const path = require('path')

const app = express()
const userRouter = require('./routes/userRoutes')
const viewRouter = require('./routes/viewRoutes')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')

const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())

app.use('/api/v1/users', userRouter)
app.use('/', viewRouter)

const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

var obj 

app.get('/feeds', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    
    try {
        obj = JSON.parse(req.cookies.token)
        // console.log(articles)
        res.render('articles/index', { articles: articles, obj: obj['_id'] })

    } catch (e) {      
        res.render('articles/index', { articles: articles, obj: ''})

    }
})


app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    const top = await Article.find().sort({ likes: -1 })

    const articles1 = articles.slice(0, 2);
    const articles2 = articles.slice(2, 4);
    const toparticles = top.slice(0, 2);

    // console.log(articles2)

    
    try {
        obj = JSON.parse(req.cookies.token)
        // console.log(articles)
        res.render('articles/home', { articles: articles1, articles2: articles2, top: toparticles, obj: obj['_id'] })

    } catch (e) {      
        res.render('articles/home', { articles: articles1, articles2: articles2, top: toparticles, obj: ''})

    }
})


app.get('/top', async (req, res) => {
    const articles = await Article.find().sort({ likes: -1 })

    try {
        obj = JSON.parse(req.cookies.token)
    
        // console.log(articles)
        res.render('articles/top', { articles: articles, obj: obj['_id'] })

    } catch (e) {      
        // console.log(articles)
        res.render('articles/top', { articles: articles , obj: ''})
    }
    
})

app.use('/articles', articleRouter)

app.use(express.static(path.join(__dirname, 'views')))

module.exports = app