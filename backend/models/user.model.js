const sql = require('./db');

//constructor
const User = function(user) {
    this.email = user.email
    this.password = user.password
    this.name = user.name
    this.firstname = user.firstname
};

//Create a user
User.create = (newUser, result) => {
	sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		} 
		console.log('User added to the database');
		result(null, { id: res.id, ...newUser});
	})
};

User.getOne = (email, result) => {
	sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}
		result(null, res[0]);
	})
};

module.exports = (User);
