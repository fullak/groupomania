const sql = require('./db');

//constructor
const Comment = function (comment) {
    this.authorId = comment.authorId
    this.message = comment.message
    this.postId = comment.postId
};

//Create a user
Comment.create = (newComment, result) => {
    sql.query('INSERT INTO comments SET ?', newComment, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log('Comment added to the database');
        result(null, {id: res.id, ...newComment});
    })
};

module.exports = (Comment);