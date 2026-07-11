import React from "react";
import { useState } from "react";
import { useEffect } from "react";


function App() {

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const rawData = await fetch('http://localhost:3000/books')
        const data = await rawData.json()
        setBooks(data.books)
        setLoading(false)
      } catch (error) {
        console.log("Error occured")
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {loading == true ?
        <>
          <h1>Loading...</h1>
        </>
        :
        <>
          <ul>
            {books.map((book) =>
              <li key={book.id}>{book.title}</li>
            )}
          </ul>
        </>
      }
    </>
  )

}

export default App