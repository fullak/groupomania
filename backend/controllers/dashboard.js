const sql = require('../models/db');
const fs = require('fs');

// * On users array

exports.getAllUsers = (req, res) => {
    sql.query('SELECT *, DATE_FORMAT(date_of_birth, "%d/%m/%Y") date_of_birth FROM users', (err, result) => {
        if (err) throw err;
        console.log(result);
        return res.status(200).json(result);
    })
};

exports.changeRoleToAdmin = (req, res) => {
    sql.query('UPDATE users SET role = "admin" WHERE id="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        console.log(result);
        return res.status(200).json(result);
    })
};

exports.changeRoleToUser = (req, res) => {
    sql.query('UPDATE users SET role = "user" WHERE id="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        console.log(result);
        return res.status(200).json(result);
    })
};

// * delete a user and profile picture link
exports.deleteAUser = (req, res) => {

    imageToDelete = req.params.currentImage;
    console.log(req.params.currentImage);

    if (imageToDelete != "") { // ? Pas de suppression de fichier si l'utilisateur a encore l'avatar de base
        fs.unlink(`images/profile/${imageToDelete}`, () => {
        })
    }
    sql.query('DELETE users FROM users WHERE id="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        console.log(result);
        return res.status(200).json(result);
    })
};


// * On posts array

exports.getAllPostsByFlag = (req, res) => {
    sql.query("SELECT posts.id, message, users.profile_picture, posts.image, users.firstname, users.name, posts.isFlagged, DATE_FORMAT(date, \"%d/%m/%Y à %T\") date FROM posts INNER JOIN users ON posts.authorId = users.id WHERE posts.isFlagged >= \"1\" ORDER BY posts.isFlagged DESC", (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
};

exports.getAllPostsByDate = (req, res) => {
    sql.query('SELECT posts.id, message, users.profile_picture, posts.image, users.firstname, users.name, posts.isFlagged, DATE_FORMAT(date, "%d/%m/%Y à %T") date FROM posts INNER JOIN users ON posts.authorId = users.id ORDER BY posts.date DESC', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
};

exports.getAllPostsByAuthor = (req, res) => {
    console.log(req.params.id);
    sql.query('SELECT posts.id, message, users.profile_picture, posts.image, users.firstname, users.name, posts.isFlagged, DATE_FORMAT(date, "%d/%m/%Y à %T") date FROM posts INNER JOIN users ON posts.authorId = users.id WHERE posts.authorId="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
}

// * Delete a post and all comments linked

exports.deleteAPost = (req, res) => {
    imageToDelete = req.params.currentImage;

    if (imageToDelete != "") { // ? Pas de suppression de fichier si l'utilisateur a encore l'avatar de base
        fs.unlink(`images/posts/${imageToDelete}`, () => {
        })
    }
    sql.query('DELETE posts, comments FROM posts INNER JOIN comments ON posts.id = comments.postId WHERE postId="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
};


// * On comments array

exports.getAllComments = (req, res) => {
    sql.query('SELECT *, DATE_FORMAT(date, "le %d/%m/%Y à %T") date FROM comments', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
};

exports.getAllCommentsByAuthor = (req, res) => {
    console.log(req.params.id);
    sql.query('SELECT comments.id, message, users.firstname, users.name, comments.isFlagged, comments.postId, DATE_FORMAT(date, "%d/%m/%Y à %T") date FROM comments INNER JOIN users ON comments.authorId = users.id WHERE comments.authorId="' + req.params.id + '"ORDER BY comments.date DESC', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
}

exports.getAllCommentsByPost = (req, res) => {
    console.log(req.params.id);
    sql.query('SELECT comments.id, message, users.firstname, users.name, comments.postId, comments.isFlagged, DATE_FORMAT(date, "%d/%m/%Y à %T") date FROM comments INNER JOIN users ON comments.authorId = users.id WHERE comments.postId="' + req.params.id + '"ORDER BY comments.date DESC', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
}

exports.deleteAComment = (req, res) => {
    console.log(req.params.id);
    sql.query('DELETE comments FROM comments WHERE id="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    })
};
