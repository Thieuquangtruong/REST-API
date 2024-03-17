const router = require("express").Router()

const bookController = require("../controllers/bookController")

// ADD Author
router.post("/", bookController.addABook)
// Get all books
router.get("/", bookController.getAllBooks)
// Get a book
router.get("/:id", bookController.getABook)
// Update a book
router.put("/:id", bookController.updateBook)
// Delete a book
router.delete("/:id", bookController.deleteBook)
module.exports = router