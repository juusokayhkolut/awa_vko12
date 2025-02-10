import express from 'express'
import Book from '../models/Book'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { name, author, pages } = req.body
        const book = new Book({ name, author, pages })
        await book.save()
        res.status(201).json(book)
    } catch (err) {
        res.status(500).json({ message: 'Error adding book' })
    }
})

router.get('/', async (req, res) => {
    const books = await Book.find()
    res.json(books)
})

export default router
