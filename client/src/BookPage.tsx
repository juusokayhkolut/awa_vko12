import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function BookPage() {
  const { bookName } = useParams<{ bookName: string }>()
  const [books, setBook] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/book?name=${bookName}`)
      .then(res => res.json())
      .then(data => setBook(data))
  }, [bookName])

  if (!books) return <h1>Loading...</h1>
  console.log(books[0])
  return (
    <div>
      <h1>Books</h1>
      <h2>{books[0].name}</h2>
      <p>{books[0].author}</p>
      <p>{books[0].pages} pages</p>
    </div>
  )
}

export default BookPage
