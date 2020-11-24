const sql = require('./db');

// ? constructor
const Reaction = function (reaction) {
    this.userId = reaction.userId
    this.postId = reaction.postId
};

// ? Create a post
Reaction.create = (newReaction, result) => {
    sql.query('INSERT INTO reactions SET ?', newReaction, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log('Reaction added to the database');
        result(null, {userId: res.userId, ...newReaction});
    })
};

module.exports = (Reaction);