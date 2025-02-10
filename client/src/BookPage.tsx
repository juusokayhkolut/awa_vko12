import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function BookPage() {
  const { bookName } = useParams<{ bookName: string }>()
  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/book?name=${encodeURIComponent(bookName!)}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setBook(data))
      .finally(() => setLoading(false))
  }, [bookName])

  if (loading) return <h1>Loading...</h1>
  if (!book) return <h1>No book found</h1>

  console.log(book)

  return (
    <div>
      <h1>Books</h1>
      <h2>{book.name}</h2>
      <p>{book.author}</p>
      <p>{book.pages} pages</p>
    </div>
  )
}

export default BookPage