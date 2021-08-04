const pool = require("../Config/Database");

module.exports = class {
	Add = async data => {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, conn) => {
				const Query = "INSERT INTO books(id, author, title) VALUES(?,?,?)";
				const Params = [data.id, data.author, data.title];
				conn.query(Query, Params, (err, results) => {
					conn.release();
					if (err) {
						reject(err.message);
					} else {
						resolve("New Book added!");
					}
				});
			});
		});
	};

	GetAll = () => {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, conn) => {
				const Query = "SELECT * FROM books";
				conn.query(Query, (err, results) => {
					conn.release();
					if (err) {
						reject(err.message);
					} else {
						resolve(results);
					}
				});
			});
		});
	};

	GetOne = book_id => {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, conn) => {
				const Query = "SELECT * FROM books WHERE id = ?";
				conn.query(Query, [book_id], (err, results) => {
					conn.release();
					if (err) {
						reject(err.message);
					} else {
						if (results.length > 0) {
							resolve(results[0]);
						} else {
							reject("Invalid Book ID");
						}
					}
				});
			});
		});
	};

	Update = data => {
		return new Promise((resolve, reject) => {
			pool.getConnection(async (err, conn) => {
				try {
					await this.GetOne(data.book_id);
					const Query = "UPDATE books SET author = ?, title = ? WHERE id = ?";
					const Params = [data.author, data.title, data.id];
					conn.query(Query, Params, (err, results) => {
						conn.release();
						if (err) {
							reject(err.message);
						} else {
							resolve("Book updated successfully!");
						}
					});
				} catch (err) {
					reject(err);
				}
			});
		});
	};

	Delete = book_id => {
		return new Promise((resolve, reject) => {
			pool.getConnection(async (err, conn) => {
				const Query = "DELETE FROM books WHERE id = ?";
				const Params = [book_id];
				try {
					await this.GetOne(book_id);
					conn.query(Query, Params, (err, results) => {
						conn.release();
						if (err) {
							reject(err.message);
						} else {
							resolve("Book deleted successfully!");
						}
					});
				} catch (err) {
					reject(err);
				}
			});
		});
	};
};
