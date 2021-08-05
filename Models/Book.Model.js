const {GetCollection} = require("../Config/Database");

module.exports = class {
	constructor(){
		
	}
	Add = async data => {
		console.log(data)
		return new Promise(async (resolve, reject) => {
			try{
				let booksCollection = await GetCollection("Books")
				await booksCollection.insertOne(data)
				resolve("New Book Registered Sucessfully!")
			}catch(err){
				console.log(err)
				reject(err.message)
			}
		});
	};

	GetAll = () => {
		return new Promise(async (resolve, reject) => {
			try{
				let booksCollection = await GetCollection("Books")
				let results = await booksCollection.find().toArray()
				resolve(results)
			}catch(err){
				reject(err.message)
			}
		});
	};

	GetOne = book_id => {
		return new Promise(async (resolve, reject) => {
			console.log(book_id)
			try{
				let booksCollection = await GetCollection("Books")
				let results = await booksCollection.findOne({"id":book_id})
				console.log(results)
				if(results && results != typeof undefined){
					resolve(results)
				}else{
					reject("Invalid Book ID!")
				}
			}catch(err){
				reject(err.message)
			}
		});
	};

	Update = (data, id) => {
		console.log(data, id)
		return new Promise(async (resolve, reject) => {
			try{
				let booksCollection = await GetCollection("Books")
				let results = await booksCollection.findOneAndUpdate({id}, {
					$set:{
						title:data.title,
						author:data.author
					}
				})
				console.log(results)
				if(results && results != typeof undefined){
					resolve("Book Details Updated Successfully!")
				}else{
					reject("Invalid Book ID!")
				}
			}catch(err){
				reject(err.message)
			}
		});
	};

	Delete = book_id => {
		return new Promise(async (resolve, reject) => {
			
			console.log(book_id)
			try{
				let booksCollection = await GetCollection("Books")
				let results = await booksCollection.deleteOne({"id":book_id})
				console.log(results)
				if(results && results != typeof undefined){
					resolve("Book Deleted Successfully!")
				}else{
					reject("Invalid Book ID!")
				}
			}catch(err){
				reject(err.message)
			}
		});
	};
};
