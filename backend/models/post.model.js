const sql = require('./db');

//constructor
const Post = function (user) {
    this.authorId = user.authorId
    this.image = user.image
    this.message = user.message
};

//Create a user
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