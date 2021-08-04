const uuid = require("uuid")
const BookModel = require("../Models/Book.Model")
module.exports = class{

    constructor(){
        this.bookmodel = new BookModel()
    }

    Register = async (req, res)=>{

        const data = req.body
        data.id = uuid.v4()
        console.log(data)
        try{
           const message = await this.bookmodel.Add(data)
           res.json({
               status:'success',
               message
           })
        }catch(err){
            res.status(500).json({
                status:"error",
                message:err
            })
        }
    }

    GetAll  = async (req, res)=>{
        try{
            let data = await this.bookmodel.GetAll()
            res.json({
                status:'success',
                message:`${data.length} Books Found!`,
                data
            })
        }catch(err){
            res.status(500).json({
                status:'error',
                message:err
            })
        }
    }

    GetOne  = async (req, res)=>{
        const book_id = req.params.book_id
        try{
            let data = await this.bookmodel.GetOne(book_id)
            res.json({
                status:'success',
                message:`Book Found!`,
                data
            })
        }catch(err){
            res.status(500).json({
                status:'error',
                message:err
            })
        }
    }

    Update = async(req, res)=>{
        let book_id = req.params.book_id
        const data = req.body
        data.id = book_id

        try{
            let message = await this.bookmodel.Update(data)
            res.json({
                status:'success',
                message
            })
        }catch(err){
            res.status(500).json({
                status:'error',
                message:err
            })
        }
    }

    Delete = async(req, res)=>{
        let book_id = req.params.book_id
        try{
            let message = await this.bookmodel.Delete(book_id)
            res.json({
                status:'success',
                message
            })
        }catch(err){
            res.status(500).json({
                status:'error',
                message:err
            })
        }
    }
    
    
}