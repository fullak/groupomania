const sql = require('../models/db');
const Post = require('../models/post.model');

exports.addPost = (req, res) => {
    console.log(req.body);
    const post = new Post({
        authorId: req.body.authorId,
        image: '',
        message: req.body.message,
    });
    Post.create(post, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error has appeared"
            });
            return;
        }
        // let file = `${req.protocol}://${req.get('host')}/posts/${req.file.filename}`;
        // this.image = file;
        res.send(data);
    })
};

exports.getAllPosts = (req, res, next) => {
    sql.query('SELECT *, DATE_FORMAT(date, "le %d/%m/%Y à %T") date FROM posts INNER JOIN users ON posts.authorId = users.id ORDER BY posts.id DESC', (err, result) => {
        if (err) throw err;
        // console.log(result);
        return res.status(200).json(result);
    })
};

exports.getUserPosts = (req, res, next) => {
    sql.query('SELECT *, DATE_FORMAT(date, "le %d/%m/%Y à %T") date FROM posts WHERE authorId="' + req.params.id + '"ORDER BY id DESC', (err, result) => {
        if (err) throw err;
        console.log(result);
        return res.status(200).json(result);
    })
};

exports.deleteAPost = (req, res, next) => {
    sql.query('DELETE FROM posts WHERE id="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        console.log('AAAAAAAAAA')
        console.log(req.params);
        console.log(result);
        return res.status(200).json(result);
    })
}

exports.like = (req, res) => {
    console.log('#############')
    console.log(req.params.id);

    // if (userWantsToLike && userCanLike) {
        sql.query('UPDATE posts SET isLiked = isLiked+1 WHERE id="' + req.params.id + '"', (err, result) => {
            if (err) throw err;
            console.log(req.params.id);
            return res.status(200).json(result);
        });
    }
    /*
    if (userWantsToCancel) {
        sql.query('UPDATE posts SET isLiked = isLiked-1 WHERE id="' + req.params.id + '"', (err, result) => {
            if (err) throw err;
            console.log(req.params.id);
            return res.status(200).json(result);
        });
    }*/
// }; 