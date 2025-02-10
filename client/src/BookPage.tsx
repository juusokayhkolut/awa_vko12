import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function BookPage() {
  const { bookName } = useParams<{ bookName: string }>()
  const [book, setBook] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/book?name=${bookName}`)
      .then(res => res.json())
      .then(data => setBook(data))
  }, [bookName])

  if (!book) return <h1>Loading...</h1>
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
