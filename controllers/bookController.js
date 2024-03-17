const {Author,Book} = require("../model/model")

const bookController = {
    // add a book
        addABook: async(req,res) => {
            try {
                const newBook = new Book(req.body);
                const savedBook = await newBook.save()
                if(req.body.author)// chỉ tìm _id thui
                {
                    const author = Author.find({_id: req.body.author})
                    // const author = Author.findById(req.body.author)

                    await author.updateOne({ $push: { books: savedBook._id }})
                     // dấu $ trước push là để thêm phần tử vào cập nhật trong MongoDB
                }
                res.status(200).json(savedBook)
            } catch (err) {
                res.status(500).json(err);
            }
        },

        // get all books
        getAllBooks: async(req, res) => {
            try {
                const allBooks = await Book.find()
                res.status(200).json(allBooks)
            } catch (err) {
                res.status(500).json(err);
            }
        },

        // get a book
        getABook: async(req,res) => {
            try {
                const book = await Book.findById(req.params.id).populate("author")
                res.status(200).json(book)
            } catch (err) {
                res.status(500).json(err);
            }
        },
        // update book
        updateBook: async(req,res) => {
            try {
                const book = await Book.findById(req.params.id)
                await book.updateOne({$set: req.body})
                res.status(200).json("Update successfully")
            } catch (err) {
                res.status(500).json(err)
            }
        },
        // Delete Book
        deleteBook: async(req,res) => {
            try {
               await Author.updateMany(
                { books: req.params.id}, // tim id book trong author để xóa lun 
                { $pull: {books : req.params.id}} // sài pull vì books nó là 1 array
               )
               await Book.findByIdAndDelete(req.params.id)
                res.status(200).json("Deleted successfully")
            } catch (err) {
                res.status(500).json(err)
            }
        },
    }
    
    module.exports = bookController