import express from 'express'
import Book from '../models/Book'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { name, author, pages } = req.body
        const book = new Book({ name, author, pages })
        await book.save()
        res.status(200).send("ok")
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error adding book' })
    }
})

router.get('/', async (req, res) => {
    try {
      const { name } = req.query
  
      if (name) {
        const book = await Book.findOne({ name: name as string })
        if (book) {
            res.json(book)
            return
        } else {
            res.status(404).json({ message: 'Book not found' })
            return
        }
      }
  
      const books = await Book.find()
      res.json(books)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books' })
    }
  })
  

export default router
