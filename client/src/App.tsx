import { useState } from 'react'

function App() {
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState<number | ''>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, author, pages })
    })
    console.log(res.status)
    if (res.ok) alert('Book added!')
  }

  return (
    <div>
      <h1>Books</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Book Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
        <input type="number" placeholder="Pages" value={pages} onChange={e => setPages(Number(e.target.value))} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App