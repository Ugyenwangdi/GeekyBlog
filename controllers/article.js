const Article = require("../models/article")

exports.like = (req, res) => {

    Article.findByIdAndUpdate(
        req.body.postId, 
        {$push: {likes: req.body.userId}}, 
        {new: true}
    ).exec((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        } else {
            res.json(result);
        }
    })
};

exports.unlike = (req, res) => {
    Article.findByIdAndUpdate(
        req.body.postId, 
        {$pull: {likes: req.body.userId}}, 
        {new: true}
    ).exec((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        } else {
            res.json(result);
        }
    })
};

exports.getAllArticles = async (req, res, next) => { 
    try {
        const articles = await Article.find()
        res.status(280).json( {data: articles, status: 'success' }) 
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
}
