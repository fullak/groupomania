const sql = require('../models/db');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const Reaction = require('../models/reaction.model');

// ! ### Posts controllers ###

// ? Add a post to the database
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

//? Get likes per posts
exports.getLikesPerPosts = (req, res) => {
    console.log('#########');
    console.log(req.params.id);
    sql.query('SELECT * FROM reactions WHERE postId="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
};

//? Get feed posts
exports.getAllPosts = (req, res) => {
    sql.query('SELECT posts.id, message, users.profile_picture, posts.image, users.firstname, users.name, posts.isFlagged, DATE_FORMAT(date, "le %d/%m/%Y à %T") date FROM posts INNER JOIN users ON posts.authorId = users.id ORDER BY posts.date DESC', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
};

// ? get all the posts of one user
exports.getUserPosts = (req, res) => {
    sql.query('SELECT posts.authorId, posts.id, message, posts.image, users.firstname, users.profile_picture, DATE_FORMAT(date, "le %d/%m/%Y à %T") date FROM posts INNER JOIN users ON posts.authorId = users.id WHERE authorId="' + req.params.id + '"ORDER BY id DESC', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
};

// ? Delete a post and all comments linked
exports.deleteAPost = (req, res) => {
    sql.query('DELETE comments, posts FROM posts INNER JOIN comments ON post.id = comments.postsId WHERE postId="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
};

// ? Like a post
exports.likeAPost = (req, res) => {

    const reaction = new Reaction({
        userId: req.body.userId,
        postId: req.body.postId,
    });

    Reaction.create(reaction, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error has appeared"
            });
            return;
        }
        res.send(data);
    })
};

//? Flagged a post
exports.flaggedAPost = (req, res) => {
    sql.query('UPDATE posts SET isFlagged = isFlagged+1 WHERE id="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    });
};

// ! ### Comments controllers ### 

// ? post a comment on a post
exports.postAComment = (req, res) => {
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

// ? get all comments on a post
exports.getPostComments = (req, res) => {
    sql.query('SELECT message, users.firstname, users.profile_picture, comments.id, DATE_FORMAT(date, "le %d/%m/%Y à %T") date FROM comments INNER JOIN users ON comments.authorId = users.id WHERE postId="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
};

exports.flaggedAComment = (req, res) => {
    sql.query('UPDATE comments SET isFlagged = isFlagged+1 WHERE id="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    });
};

