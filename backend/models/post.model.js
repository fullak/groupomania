const sql = require('./db');

// ? constructor
const Post = function (post) {
    this.authorId = post.authorId
    this.image = post.image
    this.message = post.message
};

// ? Create a post
Post.create = (newPost, result) => {
    sql.query('INSERT INTO posts SET ?', newPost, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log('Post added to the database');
        result(null, {id: res.id, ...newPost});
    })
};

module.exports = (Post);