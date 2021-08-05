// const mysql = require("mysql");

// const pool = mysql.createPool({

//   connectionLimit:1000,
//   host    : process.env.DB_HOST,
//   user    : process.env.DB_USER,
//   password: process.env.DB_PASS,
//   port    : process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   multipleStatements: true

// });

// module.exports = pool;
const ConnectionString = process.env.MONGO_URL

const MongoClient = require("mongodb").MongoClient


Connect = ()=>{
  return new Promise((resolve, reject)=>{
    MongoClient.connect(ConnectionString)
    .then(client=>{
      console.log("Database Connection Successful!")
      const db = client.db(process.env.MONGO_DB_NAME)
      resolve(db) 
    }).catch(err=>{
      console.log(err)
      reject(err.message)
    })
  })
}

GetCollection = async(collection_name)=>{
    try{
      let db = await Connect()
      return db.collection(collection_name)
    }catch(err){
      return err.message
    }
}

module.exports = {GetCollection}