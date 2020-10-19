const sql = require('./db');

//constructor
const User = function (user) {
	this.surname = user.surname,
	this.name = user.name,
	this.image = user.image,
	this.email = user.email,
	this.password = user.password
//	this.birthday = user.birthday
};

//Create a user
User.create = (newUser, result) => {
	sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}
		console.log('Utilisateur ajouté à la base de donnée');
		result(null, {id: res.id, ...newUser});
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