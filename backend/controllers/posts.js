const sql = require('../models/db');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');

// ! ### Posts controllers ###

exports.addPost = (req, res) => {

    const post = new Post({
        authorId: req.body.authorId,
        image: `${req.protocol}://${req.get('host')}/posts/${req.file.filename}`,
        message: req.body.message,
    });
    Post.create(post, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error has appeared"
            });
            return;
        }
        res.send(data);
    })
};

exports.getAllPosts = (req, res, next) => {
    sql.query('SELECT posts.id, message, users.profile_picture, posts.image, users.firstname, DATE_FORMAT(date, "le %d/%m/%Y à %T") date FROM posts INNER JOIN users ON posts.authorId = users.id ORDER BY posts.id DESC', (err, result) => {
        if (err) throw err;
        // console.log(result);
        return res.status(200).json(result);
    })
};

exports.getUserPosts = (req, res, next) => {
    sql.query('SELECT posts.id, message, posts.image, users.firstname, users.profile_picture, DATE_FORMAT(date, "le %d/%m/%Y à %T") date FROM posts INNER JOIN users ON posts.authorId = users.id WHERE authorId="' + req.params.id + '"ORDER BY id DESC', (err, result) => {
        if (err) throw err;
        console.log(result);
        return res.status(200).json(result);
    })
};

exports.deleteAPost = (req, res, next) => {
    sql.query('DELETE FROM posts WHERE id="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        console.log(result);
        return res.status(200).json(result);
    })
}

exports.like = (req, res) => {
    console.log(req.params.id);
    sql.query('UPDATE posts SET isLiked = isLiked+1 WHERE id="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        console.log(req.params.message);
        return res.status(200).json(result);
    });
};

// ! ### Comments controllers ### 

exports.postAComment = (req, res, next) => {
    console.log(req.body);
    const comment = new Comment({
        authorId: req.body.authorId,
        message: req.body.message,
        postId: req.body.postId,
    });
    Comment.create(comment, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error has appeared"
            });
            return;
        }
        res.send(data);
    })
};

exports.getPostComments = (req, res, next) => {
    sql.query('SELECT message, users.firstname, users.profile_picture, DATE_FORMAT(date, "le %d/%m/%Y à %T") date FROM comments INNER JOIN users ON comments.authorId = users.id WHERE postId="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        // console.log(result);
        return res.status(200).json(result);
    })
};
