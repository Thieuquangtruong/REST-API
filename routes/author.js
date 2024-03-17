const router = require("express").Router()
const authorController = require("../controllers/authorController")

// ADD Author
router.post("/", authorController.addAuthor)

// get all Author
router.get("/", authorController.getAllAuthors)

// get an Author
router.get("/:id", authorController.getAnAuthor)

//update an Author
router.put("/:id", authorController.updateAuthor)

//delete author
router.delete("/:id", authorController.deleteAuthor)
module.exports = router