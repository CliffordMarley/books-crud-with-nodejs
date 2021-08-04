const BookController = require("../Controllers/Book.Controller")

module.exports = router=>{

    router.post('/books', new BookController().Register)

    router.get('/books', new BookController().GetAll)

    router.get('/books/:book_id', new BookController().GetOne)

    router.put('/books/:book_id', new BookController().Update)

    router.delete('/books/:book_id', new BookController().Delete)
    
    return router
}